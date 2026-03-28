'use server'

import { db } from '@/db'
import { bookings, eventTypes, profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { sendBookingConfirmation, sendBookingCancellation } from '@/lib/email'

async function getUser() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  return user
}

export async function createBooking(formData) {
  const eventTypeId = formData.get('eventTypeId')
  let hostId = formData.get('hostId')

  // Resolve hostId and event details from event type
  let eventName = 'Session'
  let duration = 45
  if (eventTypeId) {
    const [event] = await db.select().from(eventTypes).where(eq(eventTypes.id, eventTypeId))
    if (event) {
      hostId = hostId || event.userId
      eventName = event.name
      duration = event.duration
    }
  }
  if (!hostId) throw new Error('Could not determine host')

  // Get host name
  const [host] = await db.select({ fullName: profiles.fullName }).from(profiles).where(eq(profiles.id, hostId))
  const hostName = host?.fullName || 'Host'

  const clientName = formData.get('clientName')
  const clientEmail = formData.get('clientEmail')
  const startTime = new Date(formData.get('startTime'))
  const endTime = new Date(formData.get('endTime'))

  await db.insert(bookings).values({
    eventTypeId,
    hostId,
    clientName,
    clientEmail,
    clientPhone: formData.get('clientPhone') || null,
    startTime,
    endTime,
    notes: formData.get('notes') || null,
    meetingUrl: formData.get('meetingUrl') || null,
  })

  // Send confirmation email (non-blocking)
  sendBookingConfirmation({
    clientEmail,
    clientName,
    hostName,
    eventName,
    date: startTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    time: startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    duration,
  }).catch((err) => console.error('[Email] Failed to send confirmation:', err))

  revalidatePath('/bookings')
}

export async function cancelBooking(id) {
  const user = await getUser()

  // Get booking details for email
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, id))
  if (booking) {
    const [host] = await db.select({ fullName: profiles.fullName }).from(profiles).where(eq(profiles.id, booking.hostId))
    const [event] = booking.eventTypeId
      ? await db.select({ name: eventTypes.name }).from(eventTypes).where(eq(eventTypes.id, booking.eventTypeId))
      : [null]

    await db.update(bookings).set({ status: 'cancelled' }).where(eq(bookings.id, id))

    // Send cancellation email (non-blocking)
    sendBookingCancellation({
      clientEmail: booking.clientEmail,
      clientName: booking.clientName,
      hostName: host?.fullName || 'Host',
      eventName: event?.name || 'Session',
      date: new Date(booking.startTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: new Date(booking.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }).catch((err) => console.error('[Email] Failed to send cancellation:', err))
  } else {
    await db.update(bookings).set({ status: 'cancelled' }).where(eq(bookings.id, id))
  }

  revalidatePath('/bookings')
  revalidatePath(`/bookings/${id}`)
}

export async function rescheduleBooking(id, formData) {
  await getUser()
  await db.update(bookings).set({
    startTime: new Date(formData.get('startTime')),
    endTime: new Date(formData.get('endTime')),
  }).where(eq(bookings.id, id))
  revalidatePath('/bookings')
  revalidatePath(`/bookings/${id}`)
  redirect(`/bookings/${id}`)
}

export async function completeBooking(id) {
  await getUser()
  await db.update(bookings).set({ status: 'completed' }).where(eq(bookings.id, id))
  revalidatePath('/bookings')
}
