import { auth } from '@/lib/auth'
import { getUserBookings } from '@/lib/queries'
import BookingsView from './bookings-view'

export const metadata = { title: 'Bookings' }

export default async function BookingsPage() {
  const session = await auth()
  const user = session?.user

  const bookings = user ? await getUserBookings(user.id) : []

  return <BookingsView initialBookings={bookings} />
}
