'use client'

import { useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import Avatar from '@/components/ui/Avatar'
import useMediaQuery from '@/hooks/useMediaQuery'

const MOCK_CLIENTS = [
  { id: 1, name: 'Sarah Mitchell', role: 'Product Designer', company: 'Acme Corp', email: 'sarah@acmecorp.com', bookings: 8, lastBooked: 'Oct 12', revenue: '$2,000' },
  { id: 2, name: 'David Chen', role: 'Engineering Lead', company: 'TechFlow', email: 'david@techflow.io', bookings: 5, lastBooked: 'Oct 10', revenue: '$1,250' },
  { id: 3, name: 'Emily Rodriguez', role: 'Startup Founder', company: 'Bloom Studio', email: 'emily@bloom.co', bookings: 12, lastBooked: 'Oct 8', revenue: '$3,000' },
  { id: 4, name: 'James Kim', role: 'Creative Director', company: 'Pixel & Co', email: 'james@pixelco.com', bookings: 3, lastBooked: 'Oct 5', revenue: '$750' },
  { id: 5, name: 'Aisha Patel', role: 'Product Manager', company: 'NovaTech', email: 'aisha@novatech.com', bookings: 6, lastBooked: 'Sep 28', revenue: '$1,500' },
]

const FILTERS = ['All', 'Recent', 'Frequent', 'VIP']

export default function ClientsView({ initialClients = [] }) {
  const CLIENTS = initialClients.length > 0 ? initialClients.map(c => ({
    ...c, bookings: 0, lastBooked: c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-', revenue: '-'
  })) : MOCK_CLIENTS
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const filtered = CLIENTS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {isDesktop && <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold text-primary">Manage</span>}
          <div className="flex items-center gap-3">
            <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>Clients</h1>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">{CLIENTS.length}</span>
          </div>
        </div>
        {isDesktop && (
          <div className="flex gap-3">
            <button className="px-4 py-2.5 bg-surface-container-low rounded-xl text-sm font-medium text-on-surface-variant flex items-center gap-2 hover:bg-surface-container transition-colors">
              <Icon name="download" className="text-sm" /> Export CSV
            </button>
            <button className="px-4 py-2.5 primary-gradient text-white rounded-xl text-sm font-semibold flex items-center gap-2">
              <Icon name="person_add" className="text-sm" /> Add Client
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search clients..."
          className="w-full bg-surface-container-low border-none rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f ? 'primary-gradient text-white shadow-sm' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Client List */}
      <div className={isDesktop ? 'space-y-2' : 'space-y-3'}>
        {filtered.map((client) => (
          <Link key={client.id} href={`/clients/${client.id}`}
            className={`block bg-surface-container-lowest rounded-xl p-4 ${isDesktop ? 'p-5' : ''} hover:bg-surface transition-colors cursor-pointer group`}>
            <div className="flex items-center gap-4">
              <Avatar alt={client.name} size="md" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-on-surface truncate">{client.name}</h3>
                <p className="text-xs text-on-surface-variant truncate">{client.role} at {client.company}</p>
              </div>
              {isDesktop && (
                <>
                  <div className="text-right hidden md:block">
                    <p className="text-xs text-on-surface-variant">{client.email}</p>
                  </div>
                  <div className="text-center hidden lg:block w-20">
                    <span className="text-sm font-bold text-on-surface">{client.bookings}</span>
                    <p className="text-[10px] text-on-surface-variant">bookings</p>
                  </div>
                  <div className="text-center hidden lg:block w-20">
                    <span className="text-sm font-bold text-on-surface">{client.revenue}</span>
                    <p className="text-[10px] text-on-surface-variant">revenue</p>
                  </div>
                </>
              )}
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-label text-on-surface-variant whitespace-nowrap">{client.lastBooked}</span>
                <Icon name="chevron_right" className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p className="text-center text-[11px] font-label text-on-surface-variant">{filtered.length} clients</p>
    </div>
  )
}
