'use client'

import { useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import Avatar from '@/components/ui/Avatar'
import useMediaQuery from '@/hooks/useMediaQuery'

function formatBookings(raw) {
  const now = new Date()
  return raw.map((b) => {
    const start = new Date(b.startTime)
    const end = new Date(b.endTime)
    const diffMin = Math.round((end - start) / 60000)
    const type = b.status === 'cancelled' ? 'cancelled' : start > now ? 'upcoming' : 'past'
    return {
      id: b.id,
      title: b.clientName || 'Booking',
      attendee: b.clientName,
      email: b.clientEmail,
      date: start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: `${start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} - ${end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`,
      duration: `${diffMin} min`,
      status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
      type,
    }
  })
}

const TABS = ['Upcoming', 'Past', 'Cancelled']

const statusStyles = {
  Confirmed: 'bg-green-500/10 text-green-600',
  Completed: 'bg-surface-container-high text-on-surface-variant',
  Cancelled: 'bg-error/10 text-error',
}

const barColors = {
  Confirmed: 'bg-primary',
  Completed: 'bg-tertiary',
  Cancelled: 'bg-error',
}

export default function BookingsView({ initialBookings = [] }) {
  const [tab, setTab] = useState('Upcoming')
  const [search, setSearch] = useState('')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const allBookings = formatBookings(initialBookings)

  const filtered = allBookings.filter((b) => {
    const matchesTab = b.type === tab.toLowerCase()
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.attendee.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const counts = {
    Upcoming: allBookings.filter((b) => b.type === 'upcoming').length,
    Past: allBookings.filter((b) => b.type === 'past').length,
    Cancelled: allBookings.filter((b) => b.type === 'cancelled').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {isDesktop && <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold text-primary">Manage</span>}
          <div className="flex items-center gap-3">
            <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>Bookings</h1>
            <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full">{BOOKINGS.length}</span>
          </div>
        </div>
        {isDesktop && (
          <button className="px-4 py-2.5 bg-surface-container-low rounded-xl text-sm font-medium text-on-surface-variant flex items-center gap-2 hover:bg-surface-container transition-colors">
            <Icon name="download" className="text-sm" /> Export
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search bookings..."
          className="w-full bg-surface-container-low border-none rounded-full py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-low rounded-xl p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === t ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {t} <span className="text-xs opacity-60">({counts[t]})</span>
          </button>
        ))}
      </div>

      {/* Stats (mobile compact) */}
      {!isDesktop && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {[
            { label: 'Upcoming', value: counts.Upcoming, icon: 'event_available', color: 'text-primary' },
            { label: 'Completed', value: counts.Past, icon: 'check_circle', color: 'text-green-600' },
            { label: 'Cancelled', value: counts.Cancelled, icon: 'cancel', color: 'text-error' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 bg-surface-container-lowest rounded-xl px-4 py-3 min-w-fit">
              <Icon name={s.icon} className={`${s.color} text-sm`} />
              <span className="font-headline font-bold text-on-surface">{s.value}</span>
              <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Stats (desktop) */}
      {isDesktop && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Upcoming', value: counts.Upcoming, icon: 'event_available', color: 'text-primary', bg: 'bg-primary/10' },
            { label: 'Completed', value: counts.Past, icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-500/10' },
            { label: 'Cancelled', value: counts.Cancelled, icon: 'cancel', color: 'text-error', bg: 'bg-error/10' },
          ].map((s) => (
            <div key={s.label} className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <Icon name={s.icon} className={s.color} />
              </div>
              <div>
                <span className="font-headline font-extrabold text-2xl text-on-surface">{s.value}</span>
                <p className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-surface-container-lowest rounded-xl">
          <Icon name="event_busy" className="text-on-surface-variant/30 mx-auto mb-4" size="48px" />
          <p className="text-on-surface-variant text-sm">No {tab.toLowerCase()} bookings found</p>
        </div>
      ) : (
        <div className={`${isDesktop ? 'bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10' : 'space-y-3'}`}>
          {filtered.map((booking) => (
            <Link
              key={booking.id}
              href={`/bookings/${booking.id}`}
              className={`block ${isDesktop ? 'p-5 hover:bg-surface' : 'bg-surface-container-lowest rounded-xl p-4'} transition-colors cursor-pointer group`}
            >
              <div className="flex items-center gap-4">
                {/* Color bar */}
                <div className={`w-1 ${isDesktop ? 'h-14' : 'h-12'} ${barColors[booking.status]} rounded-full flex-shrink-0`} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-on-surface truncate">{booking.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Avatar alt={booking.attendee} size="sm" />
                    <span className="text-xs text-on-surface-variant truncate">{booking.attendee}</span>
                  </div>
                </div>

                {/* Date/Time */}
                <div className="text-right flex-shrink-0 hidden sm:block">
                  <p className="text-sm font-medium text-on-surface">{booking.date}</p>
                  <p className="text-xs text-on-surface-variant">{booking.time}</p>
                </div>

                {/* Duration (desktop) */}
                {isDesktop && (
                  <div className="flex-shrink-0 px-3 py-1 bg-surface-container-low rounded-lg text-xs font-medium text-on-surface-variant">
                    {booking.duration}
                  </div>
                )}

                {/* Actions (desktop hover) */}
                {isDesktop && booking.status === 'Confirmed' && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="p-1.5 rounded-lg hover:bg-surface-container-low text-on-surface-variant"
                      title="Reschedule"
                    >
                      <Icon name="update" className="text-sm" />
                    </button>
                    <button
                      onClick={(e) => e.preventDefault()}
                      className="p-1.5 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error"
                      title="Cancel"
                    >
                      <Icon name="cancel" className="text-sm" />
                    </button>
                  </div>
                )}

                <Icon name="chevron_right" className="text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </div>

              {/* Mobile date row */}
              {!isDesktop && (
                <div className="flex items-center gap-3 mt-2 ml-5 text-xs text-on-surface-variant">
                  <span className="flex items-center gap-1"><Icon name="calendar_today" className="text-xs" /> {booking.date}</span>
                  <span className="flex items-center gap-1"><Icon name="schedule" className="text-xs" /> {booking.duration}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
