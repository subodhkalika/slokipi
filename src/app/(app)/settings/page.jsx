import { createServerClient } from '@/lib/supabase/server'
import { getProfile } from '@/lib/queries'
import SettingsView from './settings-view'

export const metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const profile = user ? await getProfile(user.id) : null

  return <SettingsView profile={profile} email={user?.email} />
}
