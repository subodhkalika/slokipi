import { createServerClient } from '@/lib/supabase/server'
import { getUserEventTypes } from '@/lib/queries'
import EventsView from './events-view'

export const metadata = { title: 'Event Types' }

export default async function EventsPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const events = user ? await getUserEventTypes(user.id) : []

  return <EventsView initialEvents={events} />
}
