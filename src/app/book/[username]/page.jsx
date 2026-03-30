import { getProfileBySlug, getActiveEventTypes } from '@/lib/queries'
import BookingView from './booking-view'

// ISR: revalidate every 60 seconds for cost optimization
export const revalidate = 60

export async function generateMetadata({ params }) {
  const { username } = await params
  const profile = await getProfileBySlug(username)
  return {
    title: profile ? `Book with ${profile.name}` : 'Book a Session',
    description: profile ? `Schedule a session with ${profile.name}` : 'Book a scheduling session',
  }
}

export default async function BookingPage({ params }) {
  const { username } = await params
  const profile = await getProfileBySlug(username)
  const eventTypes = profile ? await getActiveEventTypes(profile.id) : []

  return <BookingView profile={profile} eventTypes={eventTypes} />
}
