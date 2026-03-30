import { auth } from '@/lib/auth'
import { getUserEventTypes } from '@/lib/queries'
import EventsView from './events-view'

export const metadata = { title: 'Event Types' }

export default async function EventsPage() {
  const session = await auth()
  const user = session?.user

  const events = user ? await getUserEventTypes(user.id) : []

  return <EventsView initialEvents={events} />
}
