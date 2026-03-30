'use server'

import { db } from '@/db'
import { eventTypes } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getUserId } from '@/lib/auth-helpers'

export async function createEvent(formData) {
  const userId = await getUserId()
  await db.insert(eventTypes).values({
    userId,
    name: formData.get('name'),
    duration: parseInt(formData.get('duration')),
    description: formData.get('description') || null,
    color: formData.get('color') || '#4f4dcf',
    locationType: formData.get('location') || 'video',
    price: formData.get('price') || '0',
    bufferMinutes: parseInt(formData.get('buffer') || '15'),
    maxPerDay: formData.get('limit') ? parseInt(formData.get('limit')) : null,
  })
  revalidatePath('/events')
  redirect('/events')
}

export async function updateEvent(id, formData) {
  await getUserId()
  await db.update(eventTypes).set({
    name: formData.get('name'),
    duration: parseInt(formData.get('duration')),
    description: formData.get('description') || null,
    color: formData.get('color') || '#4f4dcf',
    locationType: formData.get('location') || 'video',
    price: formData.get('price') || '0',
    bufferMinutes: parseInt(formData.get('buffer') || '15'),
    maxPerDay: formData.get('limit') ? parseInt(formData.get('limit')) : null,
  }).where(eq(eventTypes.id, id))
  revalidatePath('/events')
  redirect('/events')
}

export async function deleteEvent(id) {
  await getUserId()
  await db.delete(eventTypes).where(eq(eventTypes.id, id))
  revalidatePath('/events')
  redirect('/events')
}

export async function toggleEvent(id, active) {
  await getUserId()
  await db.update(eventTypes).set({ active }).where(eq(eventTypes.id, id))
  revalidatePath('/events')
}
