'use server'

import { db } from '@/db'
import { profiles } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

async function getUser() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  return user
}

export async function updateProfile(formData) {
  const user = await getUser()
  await db.update(profiles).set({
    fullName: formData.get('fullName'),
    slug: formData.get('slug'),
    role: formData.get('role') || null,
    timezone: formData.get('timezone') || 'America/Los_Angeles',
  }).where(eq(profiles.id, user.id))
  revalidatePath('/settings')
  revalidatePath('/dashboard')
}

export async function completeOnboarding(formData) {
  const user = await getUser()
  await db.update(profiles).set({
    fullName: formData.get('name'),
    role: formData.get('workType'),
    slug: formData.get('url') || formData.get('name')?.toLowerCase().replace(/\s+/g, '-'),
  }).where(eq(profiles.id, user.id))
  revalidatePath('/dashboard')
}
