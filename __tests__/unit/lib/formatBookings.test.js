import { describe, it, expect } from 'vitest'

// Extract and test the formatBookings logic from bookings-view
function formatBookings(raw) {
  const now = new Date()
  return raw.map((b) => {
    const start = new Date(b.startTime)
    const end = new Date(b.endTime)
    const diffMin = Math.round((end - start) / 60000)
    const type = b.status === 'cancelled' ? 'cancelled' : start > now ? 'upcoming' : 'past'
    return {
      id: b.id,
      title: b.clientName || 'Booking',
      attendee: b.clientName,
      email: b.clientEmail,
      duration: `${diffMin} min`,
      status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
      type,
    }
  })
}

describe('formatBookings', () => {
  const futureDate = new Date(Date.now() + 86400000).toISOString()
  const pastDate = new Date(Date.now() - 86400000).toISOString()

  it('classifies future confirmed bookings as upcoming', () => {
    const result = formatBookings([{
      id: '1', clientName: 'Sarah', clientEmail: 'sarah@test.com',
      startTime: futureDate, endTime: new Date(Date.now() + 90000000).toISOString(),
      status: 'confirmed',
    }])
    expect(result[0].type).toBe('upcoming')
    expect(result[0].status).toBe('Confirmed')
  })

  it('classifies past confirmed bookings as past', () => {
    const result = formatBookings([{
      id: '2', clientName: 'David', clientEmail: 'david@test.com',
      startTime: pastDate, endTime: new Date(Date.now() - 82800000).toISOString(),
      status: 'confirmed',
    }])
    expect(result[0].type).toBe('past')
  })

  it('classifies cancelled bookings as cancelled regardless of date', () => {
    const result = formatBookings([{
      id: '3', clientName: 'Emily', clientEmail: 'emily@test.com',
      startTime: futureDate, endTime: new Date(Date.now() + 90000000).toISOString(),
      status: 'cancelled',
    }])
    expect(result[0].type).toBe('cancelled')
    expect(result[0].status).toBe('Cancelled')
  })

  it('calculates duration correctly', () => {
    const start = new Date('2026-01-01T10:00:00Z')
    const end = new Date('2026-01-01T10:45:00Z')
    const result = formatBookings([{
      id: '4', clientName: 'Test', clientEmail: 'test@test.com',
      startTime: start.toISOString(), endTime: end.toISOString(),
      status: 'confirmed',
    }])
    expect(result[0].duration).toBe('45 min')
  })

  it('uses clientName as title', () => {
    const result = formatBookings([{
      id: '5', clientName: 'Aisha Patel', clientEmail: 'aisha@test.com',
      startTime: futureDate, endTime: new Date(Date.now() + 90000000).toISOString(),
      status: 'confirmed',
    }])
    expect(result[0].title).toBe('Aisha Patel')
    expect(result[0].attendee).toBe('Aisha Patel')
  })

  it('handles empty array', () => {
    expect(formatBookings([])).toEqual([])
  })
})
