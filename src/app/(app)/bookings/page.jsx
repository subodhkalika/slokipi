import { createServerClient } from '@/lib/supabase/server'
import { getUserBookings } from '@/lib/queries'
import BookingsView from './bookings-view'

export const metadata = { title: 'Bookings' }

export default async function BookingsPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const bookings = user ? await getUserBookings(user.id) : []

  return <BookingsView initialBookings={bookings} />
}
