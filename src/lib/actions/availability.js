'use server'

import { db } from '@/db'
import { availability } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { createServerClient } from '@/lib/supabase/server'

async function getUser() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  return user
}

export async function saveAvailability(slots) {
  const user = await getUser()
  // Delete existing and replace
  await db.delete(availability).where(eq(availability.userId, user.id))
  if (slots.length > 0) {
    await db.insert(availability).values(
      slots.map((slot) => ({
        userId: user.id,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }))
    )
  }
  revalidatePath('/availability')
}
