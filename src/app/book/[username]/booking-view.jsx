'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Calendar from '@/components/ui/Calendar'
import TimeSlotChip from '@/components/ui/TimeSlotChip'
import Icon from '@/components/ui/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']

export default function BookingView({ profile, eventTypes = [] }) {
  const [selectedDate, setSelectedDate] = useState(4)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(eventTypes[0]?.id || null)
  const router = useRouter()
  const { username } = useParams()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const activeEvent = eventTypes.find((e) => e.id === selectedEvent) || eventTypes[0]
  const hostName = profile?.fullName || 'Host'
  const hostRole = profile?.role || 'Consultant'

  const handleConfirm = () => {
    if (!selectedSlot || !activeEvent) return
    const params = new URLSearchParams({
      eventTypeId: activeEvent.id,
      date: `2023-10-${String(selectedDate).padStart(2, '0')}`,
      time: selectedSlot,
      duration: String(activeEvent.duration),
    })
    router.push(`/book/${username}/confirm?${params.toString()}`)
  }

  return (
    <div className={isDesktop ? 'grid grid-cols-2 gap-12' : 'space-y-8'}>
      <div className="space-y-8">
        {/* Event selector (if multiple) */}
        {eventTypes.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {eventTypes.map((et) => (
              <button key={et.id} onClick={() => setSelectedEvent(et.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedEvent === et.id ? 'primary-gradient text-white' : 'text-[#acb3b7]'
                }`} style={selectedEvent !== et.id ? { backgroundColor: '#1a2124' } : {}}>
                {et.name}
              </button>
            ))}
          </div>
        )}

        <section className={isDesktop ? 'mb-4' : 'mb-2'}>
          <h2 className="font-headline font-extrabold text-3xl tracking-tight mb-3 leading-tight" style={{ color: '#f7f9fb' }}>
            Choose a time for{' '}<span style={{ color: '#7777fa' }}>{activeEvent?.name || 'a Session'}</span>
          </h2>
          <p style={{ color: '#acb3b7' }} className="text-sm leading-relaxed">
            {activeEvent?.description || `A session with ${hostName}.`}
          </p>
          {isDesktop && activeEvent && (
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#1a2124' }}>
                <Icon name="schedule" size="14px" style={{ color: '#755478' }} />
                <span className="text-[11px] font-semibold uppercase tracking-tighter" style={{ color: '#acb3b7' }}>{activeEvent.duration} Min</span>
              </div>
              {parseFloat(activeEvent.price) > 0 && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#1a2124' }}>
                  <Icon name="payments" size="14px" style={{ color: '#755478' }} />
                  <span className="text-[11px] font-semibold uppercase tracking-tighter" style={{ color: '#acb3b7' }}>${activeEvent.price}</span>
                </div>
              )}
            </div>
          )}
        </section>

        <Calendar selectedDates={[selectedDate]} onDateSelect={setSelectedDate} dark />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-headline font-bold text-sm tracking-tight" style={{ color: '#f7f9fb' }}>Available Slots</h4>
          {activeEvent && (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: '#232b2e' }}>
              <Icon name="schedule" size="14px" className="text-tertiary" />
              <span className="text-[11px] font-semibold uppercase tracking-tighter" style={{ color: '#acb3b7' }}>{activeEvent.duration} Min</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {TIME_SLOTS.map((slot) => (
            <TimeSlotChip key={slot} time={slot} selected={selectedSlot === slot} onClick={() => setSelectedSlot(slot)} dark />
          ))}
        </div>

        <div className="mt-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(18, 24, 26, 0.5)', color: '#acb3b7' }}>
            <Icon name="public" size="16px" />
            <p className="text-[11px] font-medium tracking-wide">
              Slots shown in <span style={{ color: '#f7f9fb' }}>{profile?.timezone || 'Pacific Time (GMT-7)'}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-6 z-40" style={{ background: 'linear-gradient(to top, #0b0f10, #0b0f10, transparent)' }}>
        <button onClick={handleConfirm} disabled={!selectedSlot}
          className={`w-full py-5 rounded-xl primary-gradient text-on-primary font-headline font-bold text-base shadow-xl shadow-primary/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 max-w-md mx-auto lg:max-w-lg ${!selectedSlot ? 'opacity-50 cursor-not-allowed' : ''}`}>
          Continue to Book
          <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  )
}
