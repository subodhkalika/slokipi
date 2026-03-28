import { createServerClient } from '@/lib/supabase/server'
import { getUserClients } from '@/lib/queries'
import ClientsView from './clients-view'

export const metadata = { title: 'Clients' }

export default async function ClientsPage() {
  const supabase = await createServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  const clients = user ? await getUserClients(user.id) : []

  return <ClientsView initialClients={clients} />
}
