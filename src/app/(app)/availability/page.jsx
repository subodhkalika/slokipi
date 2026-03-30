import { auth } from '@/lib/auth'
import { getUserAvailability } from '@/lib/queries'
import AvailabilityView from './availability-view'

export const metadata = { title: 'Availability' }

export default async function AvailabilityPage() {
  const session = await auth()
  const user = session?.user

  const slots = user ? await getUserAvailability(user.id) : []

  return <AvailabilityView initialSlots={slots} />
}
