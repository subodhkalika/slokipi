'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function requestPasswordReset(email) {
  const [user] = await db.select({ id: users.id }).from(users).where(eq(users.email, email))
  if (!user) {
    // Don't reveal if email exists or not
    return { success: true }
  }
  // TODO: Send reset email with token via Resend
  // For now, just return success
  return { success: true }
}

export async function resetPassword({ email, password }) {
  const [user] = await db.select({ id: users.id }).from(users).where(eq(users.email, email))
  if (!user) {
    return { error: 'User not found' }
  }
  const hash = await bcrypt.hash(password, 12)
  await db.update(users).set({ password: hash }).where(eq(users.id, user.id))
  return { success: true }
}
