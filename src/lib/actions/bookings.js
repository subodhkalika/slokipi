'use server'

import { db } from '@/db'
import { bookings, eventTypes, users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUserId } from '@/lib/auth-helpers'
import { sendBookingConfirmation, sendBookingCancellation } from '@/lib/email'

export async function createBooking(formData) {
  const eventTypeId = formData.get('eventTypeId')
  let hostId = formData.get('hostId')

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

  const [host] = await db.select({ name: users.name }).from(users).where(eq(users.id, hostId))
  const hostName = host?.name || 'Host'
  const clientName = formData.get('clientName')
  const clientEmail = formData.get('clientEmail')
  const startTime = new Date(formData.get('startTime'))
  const endTime = new Date(formData.get('endTime'))

  await db.insert(bookings).values({
    eventTypeId, hostId, clientName, clientEmail,
    clientPhone: formData.get('clientPhone') || null,
    startTime, endTime,
    notes: formData.get('notes') || null,
    meetingUrl: formData.get('meetingUrl') || null,
  })

  sendBookingConfirmation({
    clientEmail, clientName, hostName, eventName,
    date: startTime.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    time: startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    duration,
  }).catch((err) => console.error('[Email] Confirmation failed:', err))

  revalidatePath('/bookings')
}

export async function cancelBooking(id) {
  await getUserId()
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, id))
  if (booking) {
    const [host] = await db.select({ name: users.name }).from(users).where(eq(users.id, booking.hostId))
    const [event] = booking.eventTypeId
      ? await db.select({ name: eventTypes.name }).from(eventTypes).where(eq(eventTypes.id, booking.eventTypeId))
      : [null]

    await db.update(bookings).set({ status: 'cancelled' }).where(eq(bookings.id, id))

    sendBookingCancellation({
      clientEmail: booking.clientEmail, clientName: booking.clientName,
      hostName: host?.name || 'Host', eventName: event?.name || 'Session',
      date: new Date(booking.startTime).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      time: new Date(booking.startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    }).catch((err) => console.error('[Email] Cancellation failed:', err))
  } else {
    await db.update(bookings).set({ status: 'cancelled' }).where(eq(bookings.id, id))
  }
  revalidatePath('/bookings')
  revalidatePath(`/bookings/${id}`)
}

export async function rescheduleBooking(id, formData) {
  await getUserId()
  await db.update(bookings).set({
    startTime: new Date(formData.get('startTime')),
    endTime: new Date(formData.get('endTime')),
  }).where(eq(bookings.id, id))
  revalidatePath('/bookings')
  redirect(`/bookings/${id}`)
}

export async function completeBooking(id) {
  await getUserId()
  await db.update(bookings).set({ status: 'completed' }).where(eq(bookings.id, id))
  revalidatePath('/bookings')
}
