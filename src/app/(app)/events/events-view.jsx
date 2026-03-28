'use client'

import { useState, useOptimistic } from 'react'
import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'
import { toggleEvent } from '@/lib/actions/events'

const ICON_MAP = { video: 'videocam', in_person: 'location_on', phone: 'call' }

export default function EventsView({ initialEvents = [] }) {
  const [events, setEvents] = useState(initialEvents)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleToggle = async (id, currentActive) => {
    // Optimistic update
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, active: !currentActive } : e)))
    await toggleEvent(id, !currentActive)
  }

  const empty = events.length === 0

  return (
    <div className="space-y-8">
      <section className="flex justify-between items-end">
        <div>
          {isDesktop && <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold text-primary">Manage</span>}
          <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>
            Event Types
          </h1>
          {isDesktop && <p className="text-on-surface-variant mt-2">Configure the types of meetings people can book with you.</p>}
        </div>
        <Link href="/events/new" className="px-4 py-3 primary-gradient text-white rounded-xl font-semibold flex items-center gap-2 text-sm active:scale-95 transition-all">
          <Icon name="add" className="text-sm" />
          <span className="hidden sm:inline">New Event</span>
        </Link>
      </section>

      {empty ? (
        <div className="text-center py-20">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Icon name="event_note" className="text-primary" size="40px" />
          </div>
          <h2 className="font-headline font-bold text-xl text-on-surface mb-2">No event types yet</h2>
          <p className="text-on-surface-variant text-sm mb-6">Create your first event type so clients can book with you.</p>
          <Link href="/events/new" className="inline-flex px-6 py-3 primary-gradient text-white rounded-xl font-semibold items-center gap-2">
            <Icon name="add" className="text-sm" /> Create Event Type
          </Link>
        </div>
      ) : (
        <div className={`grid ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
          {events.map((event) => (
            <div key={event.id}
              className={`bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10 transition-all ${!event.active ? 'opacity-50' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${event.color}20` }}>
                    <Icon name={ICON_MAP[event.locationType] || 'event'} style={{ color: event.color }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-on-surface">{event.name}</h3>
                    <p className="text-xs text-on-surface-variant">{event.duration} min</p>
                  </div>
                </div>
                <button onClick={() => handleToggle(event.id, event.active)}
                  className={`w-12 h-7 rounded-full transition-colors relative ${event.active ? 'bg-primary' : 'bg-surface-container-high'}`}>
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${event.active ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Icon name="attach_money" className="text-sm" />
                  <span className="text-xs font-medium">{parseFloat(event.price) > 0 ? `$${event.price}` : 'Free'}</span>
                </div>
                <Link href={`/events/${event.id}/edit`} className="text-primary text-xs font-semibold hover:underline">Edit</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
