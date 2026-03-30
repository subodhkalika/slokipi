import { auth } from '@/lib/auth'
import { getUserClients } from '@/lib/queries'
import ClientsView from './clients-view'

export const metadata = { title: 'Clients' }

export default async function ClientsPage() {
  const session = await auth()
  const user = session?.user

  const clients = user ? await getUserClients(user.id) : []

  return <ClientsView initialClients={clients} />
}
