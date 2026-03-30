import { describe, it, expect } from 'vitest'
import { users, accounts, sessions, eventTypes, bookings, availability, clients, profiles } from '@/db/schema'

describe('Drizzle Schema', () => {
  it('users table has required columns', () => {
    const cols = Object.keys(users)
    expect(cols).toContain('id')
    expect(cols).toContain('name')
    expect(cols).toContain('email')
    expect(cols).toContain('password')
    expect(cols).toContain('slug')
    expect(cols).toContain('role')
    expect(cols).toContain('timezone')
  })

  it('profiles is an alias for users', () => {
    expect(profiles).toBe(users)
  })

  it('accounts table has required columns', () => {
    const cols = Object.keys(accounts)
    expect(cols).toContain('userId')
    expect(cols).toContain('provider')
    expect(cols).toContain('providerAccountId')
    expect(cols).toContain('type')
  })

  it('eventTypes table has required columns', () => {
    const cols = Object.keys(eventTypes)
    expect(cols).toContain('id')
    expect(cols).toContain('userId')
    expect(cols).toContain('name')
    expect(cols).toContain('duration')
    expect(cols).toContain('color')
    expect(cols).toContain('price')
    expect(cols).toContain('active')
  })

  it('bookings table has required columns', () => {
    const cols = Object.keys(bookings)
    expect(cols).toContain('id')
    expect(cols).toContain('eventTypeId')
    expect(cols).toContain('hostId')
    expect(cols).toContain('clientName')
    expect(cols).toContain('clientEmail')
    expect(cols).toContain('startTime')
    expect(cols).toContain('endTime')
    expect(cols).toContain('status')
  })

  it('availability table has required columns', () => {
    const cols = Object.keys(availability)
    expect(cols).toContain('userId')
    expect(cols).toContain('dayOfWeek')
    expect(cols).toContain('startTime')
    expect(cols).toContain('endTime')
  })

  it('clients table has required columns', () => {
    const cols = Object.keys(clients)
    expect(cols).toContain('userId')
    expect(cols).toContain('name')
    expect(cols).toContain('email')
    expect(cols).toContain('company')
  })
})
