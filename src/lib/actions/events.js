'use server'

import { db } from '@/db'
import { eventTypes } from '@/db/schema'
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

export async function createEvent(formData) {
  const user = await getUser()
  await db.insert(eventTypes).values({
    userId: user.id,
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
  const user = await getUser()
  await db.update(eventTypes)
    .set({
      name: formData.get('name'),
      duration: parseInt(formData.get('duration')),
      description: formData.get('description') || null,
      color: formData.get('color') || '#4f4dcf',
      locationType: formData.get('location') || 'video',
      price: formData.get('price') || '0',
      bufferMinutes: parseInt(formData.get('buffer') || '15'),
      maxPerDay: formData.get('limit') ? parseInt(formData.get('limit')) : null,
    })
    .where(eq(eventTypes.id, id))
  revalidatePath('/events')
  redirect('/events')
}

export async function deleteEvent(id) {
  await getUser()
  await db.delete(eventTypes).where(eq(eventTypes.id, id))
  revalidatePath('/events')
  redirect('/events')
}

export async function toggleEvent(id, active) {
  await getUser()
  await db.update(eventTypes).set({ active }).where(eq(eventTypes.id, id))
  revalidatePath('/events')
}
