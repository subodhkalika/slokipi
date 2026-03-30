'use server'

import { db } from '@/db'
import { clients } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getUserId } from '@/lib/auth-helpers'

export async function createClient(formData) {
  const userId = await getUserId()
  await db.insert(clients).values({
    userId,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone') || null,
    company: formData.get('company') || null,
    role: formData.get('role') || null,
    notes: formData.get('notes') || null,
  })
  revalidatePath('/clients')
}

export async function updateClientNotes(id, notes) {
  await getUserId()
  await db.update(clients).set({ notes }).where(eq(clients.id, id))
  revalidatePath(`/clients/${id}`)
}
