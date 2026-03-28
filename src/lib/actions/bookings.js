'use server'

import { db } from '@/db'
import { bookings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

async function getUser() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  return user
}

export async function createBooking(formData) {
  const hostId = formData.get('hostId')
  await db.insert(bookings).values({
    eventTypeId: formData.get('eventTypeId'),
    hostId,
    clientName: formData.get('clientName'),
    clientEmail: formData.get('clientEmail'),
    clientPhone: formData.get('clientPhone') || null,
    startTime: new Date(formData.get('startTime')),
    endTime: new Date(formData.get('endTime')),
    notes: formData.get('notes') || null,
    meetingUrl: formData.get('meetingUrl') || null,
  })
  revalidatePath('/bookings')
}

export async function cancelBooking(id) {
  await getUser()
  await db.update(bookings).set({ status: 'cancelled' }).where(eq(bookings.id, id))
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
