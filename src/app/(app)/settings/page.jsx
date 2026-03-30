import { auth } from '@/lib/auth'
import { getProfile } from '@/lib/queries'
import SettingsView from './settings-view'

export const metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const session = await auth()
  const user = session?.user

  const profile = user ? await getProfile(user.id) : null

  return <SettingsView profile={profile} email={user?.email} />
}
