'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getUserId } from '@/lib/auth-helpers'

export async function updateProfile(formData) {
  const userId = await getUserId()
  await db.update(users).set({
    name: formData.get('fullName'),
    slug: formData.get('slug'),
    role: formData.get('role') || null,
    timezone: formData.get('timezone') || 'America/Los_Angeles',
  }).where(eq(users.id, userId))
  revalidatePath('/settings')
  revalidatePath('/dashboard')
}

export async function completeOnboarding(formData) {
  const userId = await getUserId()
  await db.update(users).set({
    name: formData.get('name'),
    role: formData.get('workType'),
    slug: formData.get('url') || formData.get('name')?.toLowerCase().replace(/\s+/g, '-'),
  }).where(eq(users.id, userId))
  revalidatePath('/dashboard')
}
