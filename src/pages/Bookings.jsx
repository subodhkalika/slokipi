import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import Avatar from '../components/Avatar'
import useMediaQuery from '../hooks/useMediaQuery'

const BOOKINGS = [
  { id: 1, title: '1:1 Strategy Call', attendee: 'Sarah Mitchell', email: 'sarah@acmecorp.com', date: 'Oct 15, 2023', time: '10:00 AM - 11:30 AM', duration: '90 min', status: 'Confirmed', type: 'upcoming' },
  { id: 2, title: 'Design Review', attendee: 'Emily Rodriguez', email: 'emily@bloom.co', date: 'Oct 16, 2023', time: '2:00 PM - 2:45 PM', duration: '45 min', status: 'Confirmed', type: 'upcoming' },
  { id: 3, title: 'Coffee Chat', attendee: 'James Kim', email: 'james@pixelco.com', date: 'Oct 17, 2023', time: '4:00 PM - 4:15 PM', duration: '15 min', status: 'Confirmed', type: 'upcoming' },
  { id: 4, title: 'Product Deep Dive', attendee: 'Aisha Patel', email: 'aisha@novatech.com', date: 'Oct 18, 2023', time: '11:00 AM - 12:00 PM', duration: '60 min', status: 'Confirmed', type: 'upcoming' },
  { id: 5, title: 'Strategy Call', attendee: 'David Chen', email: 'david@techflow.io', date: 'Oct 12, 2023', time: '10:00 AM - 11:30 AM', duration: '90 min', status: 'Completed', type: 'past' },
  { id: 6, title: 'Design Review', attendee: 'Sarah Mitchell', email: 'sarah@acmecorp.com', date: 'Oct 10, 2023', time: '1:00 PM - 1:45 PM', duration: '45 min', status: 'Completed', type: 'past' },
  { id: 7, title: 'Coffee Chat', attendee: 'Emily Rodriguez', email: 'emily@bloom.co', date: 'Oct 8, 2023', time: '3:00 PM - 3:15 PM', duration: '15 min', status: 'Completed', type: 'past' },
  { id: 8, title: 'Onboarding Call', attendee: 'James Kim', email: 'james@pixelco.com', date: 'Oct 14, 2023', time: '9:00 AM - 10:00 AM', duration: '60 min', status: 'Cancelled', type: 'cancelled' },
  { id: 9, title: 'Strategy Call', attendee: 'Aisha Patel', email: 'aisha@novatech.com', date: 'Oct 6, 2023', time: '2:00 PM - 3:30 PM', duration: '90 min', status: 'Cancelled', type: 'cancelled' },
]

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

export default function Bookings() {
  const [tab, setTab] = useState('Upcoming')
  const [search, setSearch] = useState('')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const filtered = BOOKINGS.filter((b) => {
    const matchesTab = b.type === tab.toLowerCase()
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.attendee.toLowerCase().includes(search.toLowerCase())
    return matchesTab && matchesSearch
  })

  const counts = {
    Upcoming: BOOKINGS.filter((b) => b.type === 'upcoming').length,
    Past: BOOKINGS.filter((b) => b.type === 'past').length,
    Cancelled: BOOKINGS.filter((b) => b.type === 'cancelled').length,
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
              to={`/bookings/${booking.id}`}
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
