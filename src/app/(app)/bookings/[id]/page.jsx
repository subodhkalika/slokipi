import { createServerClient } from '@/lib/supabase/server'
import { getBookingWithEventType } from '@/lib/queries'
import DetailView from './detail-view'

export async function generateMetadata({ params }) {
  const { id } = await params
  const result = await getBookingWithEventType(id)
  return { title: result?.booking?.clientName ? `Booking: ${result.booking.clientName}` : 'Booking Detail' }
}

export default async function BookingDetailPage({ params }) {
  const { id } = await params
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const result = user ? await getBookingWithEventType(id) : null

  return <DetailView booking={result?.booking} eventType={result?.eventType} />
}
