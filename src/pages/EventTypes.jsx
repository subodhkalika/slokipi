import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import useMediaQuery from '../hooks/useMediaQuery'

const EVENT_TYPES = [
  {
    id: 1,
    name: '1:1 Strategy Call',
    duration: '30 min',
    color: 'bg-primary',
    icon: 'video_call',
    bookings: 24,
    active: true,
  },
  {
    id: 2,
    name: 'Design Review',
    duration: '45 min',
    color: 'bg-tertiary',
    icon: 'brush',
    bookings: 18,
    active: true,
  },
  {
    id: 3,
    name: 'Coffee Chat',
    duration: '15 min',
    color: 'bg-secondary',
    icon: 'coffee',
    bookings: 12,
    active: true,
  },
  {
    id: 4,
    name: 'Product Deep Dive',
    duration: '60 min',
    color: 'bg-primary-container',
    icon: 'psychology',
    bookings: 8,
    active: false,
  },
]

export default function EventTypes() {
  const [events, setEvents] = useState(EVENT_TYPES)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const toggleEvent = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, active: !e.active } : e))
    )
  }

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
        <Link to="/events/new" className="px-4 py-3 primary-gradient text-white rounded-xl font-semibold flex items-center gap-2 text-sm active:scale-95 transition-all">
          <Icon name="add" className="text-sm" />
          <span className="hidden sm:inline">New Event</span>
        </Link>
      </section>

      <div className={`grid ${isDesktop ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {events.map((event) => (
          <div
            key={event.id}
            className={`bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10 transition-all ${
              !event.active ? 'opacity-50' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${event.color}/15 rounded-lg flex items-center justify-center`}>
                  <Icon name={event.icon} className={`${event.color === 'bg-primary' ? 'text-primary' : event.color === 'bg-tertiary' ? 'text-tertiary' : 'text-secondary'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface">{event.name}</h3>
                  <p className="text-xs text-on-surface-variant">{event.duration}</p>
                </div>
              </div>
              <button
                onClick={() => toggleEvent(event.id)}
                className={`w-12 h-7 rounded-full transition-colors relative ${
                  event.active ? 'bg-primary' : 'bg-surface-container-high'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${
                    event.active ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant/10">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <Icon name="groups" className="text-sm" />
                <span className="text-xs font-medium">{event.bookings} bookings this month</span>
              </div>
              <Link to={`/events/${event.id}/edit`} className="text-primary text-xs font-semibold hover:underline">Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
