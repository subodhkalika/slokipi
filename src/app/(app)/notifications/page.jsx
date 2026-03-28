import { createServerClient } from '@/lib/supabase/server'
import { getUserBookings } from '@/lib/queries'
import NotificationsView from './notifications-view'

export const metadata = { title: 'Notifications' }

export default async function NotificationsPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const bookings = user ? await getUserBookings(user.id) : []

  // Generate notifications from recent bookings
  const notifications = bookings.slice(0, 10).map((b) => {
    const created = new Date(b.createdAt)
    const now = new Date()
    const diffHours = Math.round((now - created) / 3600000)
    const timeAgo = diffHours < 1 ? 'Just now' : diffHours < 24 ? `${diffHours} hours ago` : `${Math.round(diffHours / 24)} days ago`

    if (b.status === 'cancelled') {
      return {
        id: b.id, type: 'cancel', icon: 'event_busy', iconBg: 'bg-error/10', iconColor: 'text-error',
        title: 'Booking cancelled', desc: `${b.clientName} cancelled their booking`, time: timeAgo, unread: diffHours < 24,
      }
    }
    if (b.status === 'completed') {
      return {
        id: b.id, type: 'booking', icon: 'check_circle', iconBg: 'bg-green-500/10', iconColor: 'text-green-600',
        title: 'Booking completed', desc: `Session with ${b.clientName} completed`, time: timeAgo, unread: false,
      }
    }
    return {
      id: b.id, type: 'booking', icon: 'event_available', iconBg: 'bg-primary/10', iconColor: 'text-primary',
      title: 'New booking confirmed', desc: `${b.clientName} booked a session`, time: timeAgo, unread: diffHours < 48,
    }
  })

  return <NotificationsView initialNotifications={notifications} />
}
