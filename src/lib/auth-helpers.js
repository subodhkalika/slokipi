import { auth } from '@/lib/auth'

export async function getUser() {
  const session = await auth()
  if (!session?.user) throw new Error('Not authenticated')
  return session.user
}

export async function getUserId() {
  const user = await getUser()
  return user.id
}

export async function getOptionalUser() {
  const session = await auth()
  return session?.user || null
}
