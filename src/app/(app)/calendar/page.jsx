import { auth } from '@/lib/auth'
import { getUserBookings } from '@/lib/queries'
import CalendarView from './calendar-view'

export const metadata = { title: 'Calendar' }

export default async function CalendarPage() {
  const session = await auth()
  const user = session?.user

  const bookings = user ? await getUserBookings(user.id) : []

  // Transform DB bookings into calendar events
  const events = bookings
    .filter((b) => b.status === 'confirmed' || b.status === 'completed')
    .map((b) => {
      const start = new Date(b.startTime)
      const end = new Date(b.endTime)
      const dayOfWeek = (start.getDay() + 6) % 7 // Mon=0
      const duration = (end - start) / 3600000 // hours
      return {
        title: b.clientName || 'Booking',
        day: dayOfWeek,
        startHour: start.getHours() + start.getMinutes() / 60,
        duration,
        color: 'bg-primary/10',
        borderColor: 'border-primary',
        textColor: 'text-primary',
      }
    })

  return <CalendarView initialEvents={events} />
}
