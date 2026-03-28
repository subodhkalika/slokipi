import { pgTable, uuid, text, integer, boolean, decimal, timestamp, time } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ─── Profiles (extends Supabase auth.users) ─────────────────────
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // matches auth.users.id
  fullName: text('full_name'),
  slug: text('slug').unique(), // booking URL: slokipi.com/:slug
  role: text('role'),
  timezone: text('timezone').default('America/Los_Angeles'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Event Types ─────────────────────────────────────────────────
export const eventTypes = pgTable('event_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  duration: integer('duration').notNull(), // minutes
  color: text('color').default('#4f4dcf'),
  description: text('description'),
  locationType: text('location_type').default('video'), // video | in_person | phone
  price: decimal('price', { precision: 10, scale: 2 }).default('0'),
  bufferMinutes: integer('buffer_minutes').default(15),
  maxPerDay: integer('max_per_day'),
  active: boolean('active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Bookings ────────────────────────────────────────────────────
export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventTypeId: uuid('event_type_id').references(() => eventTypes.id),
  hostId: uuid('host_id').notNull().references(() => profiles.id),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  clientPhone: text('client_phone'),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }).notNull(),
  status: text('status').default('confirmed'), // confirmed | completed | cancelled
  notes: text('notes'),
  meetingUrl: text('meeting_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Availability ────────────────────────────────────────────────
export const availability = pgTable('availability', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  dayOfWeek: integer('day_of_week').notNull(), // 0=Mon, 6=Sun
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
})

// ─── Clients (denormalized for quick access) ────────────────────
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  role: text('role'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Relations ───────────────────────────────────────────────────
export const profilesRelations = relations(profiles, ({ many }) => ({
  eventTypes: many(eventTypes),
  bookings: many(bookings),
  availability: many(availability),
  clients: many(clients),
}))

export const eventTypesRelations = relations(eventTypes, ({ one, many }) => ({
  user: one(profiles, { fields: [eventTypes.userId], references: [profiles.id] }),
  bookings: many(bookings),
}))

export const bookingsRelations = relations(bookings, ({ one }) => ({
  eventType: one(eventTypes, { fields: [bookings.eventTypeId], references: [eventTypes.id] }),
  host: one(profiles, { fields: [bookings.hostId], references: [profiles.id] }),
}))

export const availabilityRelations = relations(availability, ({ one }) => ({
  user: one(profiles, { fields: [availability.userId], references: [profiles.id] }),
}))

export const clientsRelations = relations(clients, ({ one }) => ({
  user: one(profiles, { fields: [clients.userId], references: [profiles.id] }),
}))
