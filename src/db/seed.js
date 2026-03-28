import { config } from 'dotenv'
config({ path: '.env.local' })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { profiles, eventTypes, bookings, availability, clients } from './schema.js'

const client = postgres(process.env.DATABASE_URL, { prepare: false })
const db = drizzle(client)

// We need a real user ID from Supabase Auth — this script uses the first profile
// or creates a demo profile if you pass a user ID as argument
const DEMO_USER_ID = process.argv[2]

async function seed() {
  if (!DEMO_USER_ID) {
    console.log('Usage: node src/db/seed.js <your-supabase-user-id>')
    console.log('')
    console.log('To find your user ID:')
    console.log('1. Sign up/login at your Slokipi app')
    console.log('2. Go to Supabase Dashboard → Authentication → Users')
    console.log('3. Copy the UUID of your user')
    process.exit(1)
  }

  console.log(`Seeding database for user: ${DEMO_USER_ID}\n`)

  // ─── Profile ─────────────────────────────────────────────
  console.log('Creating profile...')
  await db.insert(profiles).values({
    id: DEMO_USER_ID,
    fullName: 'Alex Reed',
    slug: 'alex-reed',
    role: 'Design Consultant',
    timezone: 'America/Los_Angeles',
  }).onConflictDoUpdate({
    target: profiles.id,
    set: { fullName: 'Alex Reed', slug: 'alex-reed', role: 'Design Consultant' },
  })

  // ─── Event Types ─────────────────────────────────────────
  console.log('Creating event types...')
  const [strategyCall] = await db.insert(eventTypes).values({
    userId: DEMO_USER_ID,
    name: '1:1 Strategy Call',
    duration: 30,
    color: '#4f4dcf',
    description: 'A focused session to discuss your product strategy and design system architecture.',
    locationType: 'video',
    price: '0',
    bufferMinutes: 15,
    maxPerDay: 5,
    active: true,
  }).returning()

  const [designReview] = await db.insert(eventTypes).values({
    userId: DEMO_USER_ID,
    name: 'Design Review',
    duration: 45,
    color: '#755478',
    description: 'Deep dive into your design system, component library, and visual direction.',
    locationType: 'video',
    price: '125',
    bufferMinutes: 15,
    maxPerDay: 3,
    active: true,
  }).returning()

  const [coffeeChat] = await db.insert(eventTypes).values({
    userId: DEMO_USER_ID,
    name: 'Coffee Chat',
    duration: 15,
    color: '#526074',
    description: 'Quick informal chat — no agenda required.',
    locationType: 'video',
    price: '0',
    bufferMinutes: 5,
    maxPerDay: 8,
    active: true,
  }).returning()

  const [deepDive] = await db.insert(eventTypes).values({
    userId: DEMO_USER_ID,
    name: 'Product Deep Dive',
    duration: 60,
    color: '#14b8a6',
    description: 'Comprehensive product strategy session covering architecture, scaling, and roadmap.',
    locationType: 'video',
    price: '250',
    bufferMinutes: 30,
    maxPerDay: 2,
    active: true,
  }).returning()

  console.log(`  Created: ${strategyCall.name}, ${designReview.name}, ${coffeeChat.name}, ${deepDive.name}`)

  // ─── Clients ─────────────────────────────────────────────
  console.log('Creating clients...')
  const clientsData = [
    { userId: DEMO_USER_ID, name: 'Sarah Mitchell', email: 'sarah@acmecorp.com', phone: '+1 555-123-4567', company: 'Acme Corp', role: 'Product Designer', notes: 'Interested in design system architecture. Prefers morning slots.' },
    { userId: DEMO_USER_ID, name: 'David Chen', email: 'david@techflow.io', phone: '+1 555-234-5678', company: 'TechFlow', role: 'Engineering Lead', notes: 'Working on calendar integration project.' },
    { userId: DEMO_USER_ID, name: 'Emily Rodriguez', email: 'emily@bloom.co', phone: '+1 555-345-6789', company: 'Bloom Studio', role: 'Startup Founder', notes: 'Regular client. Quarterly strategy reviews.' },
    { userId: DEMO_USER_ID, name: 'James Kim', email: 'james@pixelco.com', phone: '+1 555-456-7890', company: 'Pixel & Co', role: 'Creative Director', notes: 'Referred by Emily. First project together.' },
    { userId: DEMO_USER_ID, name: 'Aisha Patel', email: 'aisha@novatech.com', phone: '+1 555-567-8901', company: 'NovaTech', role: 'Product Manager', notes: 'Needs help with scheduling workflow optimization.' },
  ]
  await db.insert(clients).values(clientsData)
  console.log(`  Created ${clientsData.length} clients`)

  // ─── Bookings ────────────────────────────────────────────
  console.log('Creating bookings...')
  const now = new Date()
  const day = (offset) => {
    const d = new Date(now)
    d.setDate(d.getDate() + offset)
    return d
  }
  const at = (date, hour, min = 0) => {
    const d = new Date(date)
    d.setHours(hour, min, 0, 0)
    return d
  }

  const bookingsData = [
    // Upcoming
    { eventTypeId: strategyCall.id, hostId: DEMO_USER_ID, clientName: 'Sarah Mitchell', clientEmail: 'sarah@acmecorp.com', startTime: at(day(1), 10, 0), endTime: at(day(1), 10, 30), status: 'confirmed', notes: 'Discuss component library roadmap', meetingUrl: 'https://meet.google.com/abc-defg-hij' },
    { eventTypeId: designReview.id, hostId: DEMO_USER_ID, clientName: 'Emily Rodriguez', clientEmail: 'emily@bloom.co', startTime: at(day(1), 14, 0), endTime: at(day(1), 14, 45), status: 'confirmed', notes: 'Q2 design system review', meetingUrl: 'https://meet.google.com/klm-nopq-rst' },
    { eventTypeId: coffeeChat.id, hostId: DEMO_USER_ID, clientName: 'James Kim', clientEmail: 'james@pixelco.com', startTime: at(day(2), 16, 0), endTime: at(day(2), 16, 15), status: 'confirmed', meetingUrl: 'https://meet.google.com/uvw-xyza-bcd' },
    { eventTypeId: deepDive.id, hostId: DEMO_USER_ID, clientName: 'Aisha Patel', clientEmail: 'aisha@novatech.com', startTime: at(day(3), 11, 0), endTime: at(day(3), 12, 0), status: 'confirmed', notes: 'Product architecture and scaling discussion', meetingUrl: 'https://meet.google.com/efg-hijk-lmn' },
    { eventTypeId: strategyCall.id, hostId: DEMO_USER_ID, clientName: 'David Chen', clientEmail: 'david@techflow.io', startTime: at(day(5), 9, 0), endTime: at(day(5), 9, 30), status: 'confirmed', meetingUrl: 'https://meet.google.com/opq-rstu-vwx' },
    // Past (completed)
    { eventTypeId: strategyCall.id, hostId: DEMO_USER_ID, clientName: 'Sarah Mitchell', clientEmail: 'sarah@acmecorp.com', startTime: at(day(-2), 10, 0), endTime: at(day(-2), 10, 30), status: 'completed', notes: 'Reviewed authentication flow' },
    { eventTypeId: designReview.id, hostId: DEMO_USER_ID, clientName: 'David Chen', clientEmail: 'david@techflow.io', startTime: at(day(-4), 13, 0), endTime: at(day(-4), 13, 45), status: 'completed' },
    { eventTypeId: coffeeChat.id, hostId: DEMO_USER_ID, clientName: 'Emily Rodriguez', clientEmail: 'emily@bloom.co', startTime: at(day(-5), 15, 0), endTime: at(day(-5), 15, 15), status: 'completed' },
    { eventTypeId: deepDive.id, hostId: DEMO_USER_ID, clientName: 'Sarah Mitchell', clientEmail: 'sarah@acmecorp.com', startTime: at(day(-7), 11, 0), endTime: at(day(-7), 12, 0), status: 'completed', notes: 'Full architecture review — great session' },
    // Cancelled
    { eventTypeId: strategyCall.id, hostId: DEMO_USER_ID, clientName: 'James Kim', clientEmail: 'james@pixelco.com', startTime: at(day(-1), 9, 0), endTime: at(day(-1), 9, 30), status: 'cancelled' },
  ]
  await db.insert(bookings).values(bookingsData)
  console.log(`  Created ${bookingsData.length} bookings (5 upcoming, 4 completed, 1 cancelled)`)

  // ─── Availability ────────────────────────────────────────
  console.log('Creating availability...')
  const availData = [
    { userId: DEMO_USER_ID, dayOfWeek: 0, startTime: '09:00', endTime: '17:00' }, // Mon
    { userId: DEMO_USER_ID, dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }, // Tue
    { userId: DEMO_USER_ID, dayOfWeek: 2, startTime: '09:00', endTime: '17:00' }, // Wed
    { userId: DEMO_USER_ID, dayOfWeek: 3, startTime: '09:00', endTime: '17:00' }, // Thu
    { userId: DEMO_USER_ID, dayOfWeek: 4, startTime: '09:00', endTime: '13:00' }, // Fri (half day)
  ]
  await db.insert(availability).values(availData)
  console.log(`  Created ${availData.length} availability slots (Mon-Fri)`)

  // ─── Done ────────────────────────────────────────────────
  console.log('\n✓ Seed complete!')
  console.log(`  Profile: Alex Reed (slokipi.com/alex-reed)`)
  console.log(`  Event types: 4`)
  console.log(`  Clients: 5`)
  console.log(`  Bookings: 10 (5 upcoming, 4 completed, 1 cancelled)`)
  console.log(`  Availability: Mon-Fri, 9AM-5PM (Fri half day)`)

  await client.end()
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
