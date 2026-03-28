import { db } from '@/db'
import { profiles, eventTypes, bookings, availability, clients } from '@/db/schema'
import { eq, desc, gte, lte, and, sql } from 'drizzle-orm'

// ─── Profile ─────────────────────────────────────────────────────
export async function getProfile(userId) {
  const [profile] = await db.select().from(profiles).where(eq(profiles.id, userId))
  return profile
}

export async function getProfileBySlug(slug) {
  const [profile] = await db.select().from(profiles).where(eq(profiles.slug, slug))
  return profile
}

// ─── Event Types ─────────────────────────────────────────────────
export async function getUserEventTypes(userId) {
  return db.select().from(eventTypes).where(eq(eventTypes.userId, userId)).orderBy(desc(eventTypes.createdAt))
}

export async function getEventType(id) {
  const [event] = await db.select().from(eventTypes).where(eq(eventTypes.id, id))
  return event
}

export async function getActiveEventTypes(userId) {
  return db.select().from(eventTypes).where(and(eq(eventTypes.userId, userId), eq(eventTypes.active, true)))
}

// ─── Bookings ────────────────────────────────────────────────────
export async function getUserBookings(userId, status) {
  const conditions = [eq(bookings.hostId, userId)]
  if (status) conditions.push(eq(bookings.status, status))
  return db.select().from(bookings).where(and(...conditions)).orderBy(desc(bookings.startTime))
}

export async function getUpcomingBookings(userId, limit = 5) {
  return db.select().from(bookings)
    .where(and(
      eq(bookings.hostId, userId),
      eq(bookings.status, 'confirmed'),
      gte(bookings.startTime, new Date())
    ))
    .orderBy(bookings.startTime)
    .limit(limit)
}

export async function getBooking(id) {
  const [booking] = await db.select().from(bookings).where(eq(bookings.id, id))
  return booking
}

export async function getBookingWithEventType(id) {
  const result = await db.select({
    booking: bookings,
    eventType: eventTypes,
  }).from(bookings)
    .leftJoin(eventTypes, eq(bookings.eventTypeId, eventTypes.id))
    .where(eq(bookings.id, id))
  return result[0]
}

export async function getBookingStats(userId) {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfWeek = new Date(startOfDay)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  const [todayCount] = await db.select({ count: sql`count(*)::int` }).from(bookings)
    .where(and(eq(bookings.hostId, userId), gte(bookings.startTime, startOfDay), eq(bookings.status, 'confirmed')))

  const [weekCount] = await db.select({ count: sql`count(*)::int` }).from(bookings)
    .where(and(eq(bookings.hostId, userId), gte(bookings.startTime, startOfWeek), eq(bookings.status, 'confirmed')))

  return { today: todayCount?.count || 0, weekly: weekCount?.count || 0 }
}

// ─── Availability ────────────────────────────────────────────────
export async function getUserAvailability(userId) {
  return db.select().from(availability).where(eq(availability.userId, userId)).orderBy(availability.dayOfWeek)
}

// ─── Clients ─────────────────────────────────────────────────────
export async function getUserClients(userId) {
  return db.select().from(clients).where(eq(clients.userId, userId)).orderBy(desc(clients.createdAt))
}

export async function getClient(id) {
  const [client] = await db.select().from(clients).where(eq(clients.id, id))
  return client
}

export async function getClientBookings(clientEmail, hostId) {
  return db.select().from(bookings)
    .where(and(eq(bookings.clientEmail, clientEmail), eq(bookings.hostId, hostId)))
    .orderBy(desc(bookings.startTime))
}
