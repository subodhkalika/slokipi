'use server'

import { db } from '@/db'
import { clients } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

async function getUser() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  return user
}

export async function createClient(formData) {
  const user = await getUser()
  await db.insert(clients).values({
    userId: user.id,
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
  await getUser()
  await db.update(clients).set({ notes }).where(eq(clients.id, id))
  revalidatePath(`/clients/${id}`)
}
