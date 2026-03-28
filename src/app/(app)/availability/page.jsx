import { createServerClient } from '@/lib/supabase/server'
import { getUserAvailability } from '@/lib/queries'
import AvailabilityView from './availability-view'

export const metadata = { title: 'Availability' }

export default async function AvailabilityPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const slots = user ? await getUserAvailability(user.id) : []

  return <AvailabilityView initialSlots={slots} />
}
