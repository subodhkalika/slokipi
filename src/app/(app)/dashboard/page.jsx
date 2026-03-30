import { auth } from '@/lib/auth'
import { getUpcomingBookings, getBookingStats, getProfile } from '@/lib/queries'
import DashboardView from './dashboard-view'

export const metadata = { title: 'Dashboard' }

export default async function DashboardPage() {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return <DashboardView bookings={[]} stats={{ today: 0, weekly: 0 }} />
  }

  const [upcomingBookings, stats, profile] = await Promise.all([
    getUpcomingBookings(user.id),
    getBookingStats(user.id),
    getProfile(user.id),
  ])

  return (
    <DashboardView
      bookings={upcomingBookings}
      stats={stats}
      profile={profile}
    />
  )
}
