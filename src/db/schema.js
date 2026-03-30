import { pgTable, uuid, text, integer, boolean, decimal, timestamp, time, primaryKey } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// ─── Auth.js Tables ──────────────────────────────────────────────
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name'),
  email: text('email').unique().notNull(),
  emailVerified: timestamp('email_verified', { withTimezone: true }),
  image: text('image'),
  password: text('password'), // bcrypt hash — null for OAuth users
  // Profile fields (merged into users table for simplicity)
  slug: text('slug').unique(),
  role: text('role'),
  timezone: text('timezone').default('America/Los_Angeles'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export const accounts = pgTable('accounts', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refresh_token: text('refresh_token'),
  access_token: text('access_token'),
  expires_at: integer('expires_at'),
  token_type: text('token_type'),
  scope: text('scope'),
  id_token: text('id_token'),
  session_state: text('session_state'),
}, (account) => [
  primaryKey({ columns: [account.provider, account.providerAccountId] }),
])

export const sessions = pgTable('sessions', {
  sessionToken: text('session_token').primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
})

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires', { withTimezone: true }).notNull(),
}, (vt) => [
  primaryKey({ columns: [vt.identifier, vt.token] }),
])

// ─── Keep 'profiles' as alias for backward compatibility ─────────
// Server actions and queries reference 'profiles' — alias to users
export const profiles = users

// ─── Event Types ─────────────────────────────────────────────────
export const eventTypes = pgTable('event_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  duration: integer('duration').notNull(),
  color: text('color').default('#4f4dcf'),
  description: text('description'),
  locationType: text('location_type').default('video'),
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
  hostId: uuid('host_id').notNull().references(() => users.id),
  clientName: text('client_name').notNull(),
  clientEmail: text('client_email').notNull(),
  clientPhone: text('client_phone'),
  startTime: timestamp('start_time', { withTimezone: true }).notNull(),
  endTime: timestamp('end_time', { withTimezone: true }).notNull(),
  status: text('status').default('confirmed'),
  notes: text('notes'),
  meetingUrl: text('meeting_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Availability ────────────────────────────────────────────────
export const availability = pgTable('availability', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  dayOfWeek: integer('day_of_week').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
})

// ─── Clients ─────────────────────────────────────────────────────
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  role: text('role'),
  notes: text('notes'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// ─── Relations ───────────────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  eventTypes: many(eventTypes),
  bookings: many(bookings),
  availability: many(availability),
  clients: many(clients),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}))

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}))

export const eventTypesRelations = relations(eventTypes, ({ one, many }) => ({
  user: one(users, { fields: [eventTypes.userId], references: [users.id] }),
  bookings: many(bookings),
}))

export const bookingsRelations = relations(bookings, ({ one }) => ({
  eventType: one(eventTypes, { fields: [bookings.eventTypeId], references: [eventTypes.id] }),
  host: one(users, { fields: [bookings.hostId], references: [users.id] }),
}))

export const availabilityRelations = relations(availability, ({ one }) => ({
  user: one(users, { fields: [availability.userId], references: [users.id] }),
}))

export const clientsRelations = relations(clients, ({ one }) => ({
  user: one(users, { fields: [clients.userId], references: [users.id] }),
}))
