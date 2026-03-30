'use server'

import { db } from '@/db'
import { availability } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { getUserId } from '@/lib/auth-helpers'

export async function saveAvailability(slots) {
  const userId = await getUserId()
  await db.delete(availability).where(eq(availability.userId, userId))
  if (slots.length > 0) {
    await db.insert(availability).values(
      slots.map((slot) => ({
        userId,
        dayOfWeek: slot.dayOfWeek,
        startTime: slot.startTime,
        endTime: slot.endTime,
      }))
    )
  }
  revalidatePath('/availability')
}
