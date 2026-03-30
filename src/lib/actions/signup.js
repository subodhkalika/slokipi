'use server'

import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function signup({ name, email, password }) {
  // Check if user already exists
  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email))
  if (existing) {
    return { error: 'An account with this email already exists' }
  }

  // Hash password and create user
  const hash = await bcrypt.hash(password, 12)
  const [user] = await db.insert(users).values({
    name,
    email,
    password: hash,
    slug: name.toLowerCase().replace(/\s+/g, '-'),
  }).returning()

  return { success: true, userId: user.id }
}
