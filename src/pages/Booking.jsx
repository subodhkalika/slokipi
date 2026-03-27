import { useState } from 'react'
import Calendar from '../components/Calendar'
import TimeSlotChip from '../components/TimeSlotChip'
import Icon from '../components/Icon'
import useMediaQuery from '../hooks/useMediaQuery'

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState(4)
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM')
  const [confirmed, setConfirmed] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleDateSelect = (day) => setSelectedDate(day)

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
          <Icon name="check_circle" className="text-primary" size="48px" />
        </div>
        <h2 className="font-headline text-3xl font-extrabold tracking-tight" style={{ color: '#f7f9fb' }}>
          Booking Confirmed!
        </h2>
        <p style={{ color: '#acb3b7' }} className="text-sm max-w-sm leading-relaxed">
          Your Strategy Session with Alex Reed is confirmed for October {selectedDate} at {selectedSlot}. You'll receive a calendar invite shortly.
        </p>
        <button
          onClick={() => setConfirmed(false)}
          className="mt-4 px-6 py-3 rounded-xl primary-gradient text-on-primary font-headline font-bold"
        >
          Book Another Session
        </button>
      </div>
    )
  }

  return (
    <div className={isDesktop ? 'grid grid-cols-2 gap-12' : 'space-y-8'}>
      {/* Left / Top: Info + Calendar */}
      <div className="space-y-8">
        {/* Intro */}
        <section className={isDesktop ? 'mb-4' : 'mb-2'}>
          <h2 className="font-headline font-extrabold text-3xl tracking-tight mb-3 leading-tight" style={{ color: '#f7f9fb' }}>
            Choose a time for our <span style={{ color: '#7777fa' }}>Strategy Session</span>
          </h2>
          <p style={{ color: '#acb3b7' }} className="text-sm leading-relaxed">
            A 45-minute deep dive into your product architecture and design system scaling challenges.
          </p>
          {isDesktop && (
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#1a2124' }}>
                <Icon name="schedule" size="14px" style={{ color: '#755478' }} />
                <span className="text-[11px] font-semibold uppercase tracking-tighter" style={{ color: '#acb3b7' }}>45 Min</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: '#1a2124' }}>
                <Icon name="payments" size="14px" style={{ color: '#755478' }} />
                <span className="text-[11px] font-semibold uppercase tracking-tighter" style={{ color: '#acb3b7' }}>$250 / hr</span>
              </div>
            </div>
          )}
        </section>

        {/* Calendar */}
        <Calendar
          selectedDates={[selectedDate]}
          onDateSelect={handleDateSelect}
          dark
        />
      </div>

      {/* Right / Bottom: Time Slots */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h4 className="font-headline font-bold text-sm tracking-tight" style={{ color: '#f7f9fb' }}>Available Slots</h4>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ backgroundColor: '#232b2e' }}>
            <Icon name="schedule" size="14px" className="text-tertiary" />
            <span className="text-[11px] font-semibold uppercase tracking-tighter" style={{ color: '#acb3b7' }}>45 Min</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {TIME_SLOTS.map((slot) => (
            <TimeSlotChip
              key={slot}
              time={slot}
              selected={selectedSlot === slot}
              onClick={() => setSelectedSlot(slot)}
              dark
            />
          ))}
        </div>

        {/* Timezone */}
        <div className="mt-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(18, 24, 26, 0.5)', color: '#acb3b7' }}>
            <Icon name="public" size="16px" />
            <p className="text-[11px] font-medium tracking-wide">
              Slots shown in <span style={{ color: '#f7f9fb' }}>Pacific Time (GMT-7)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 z-40" style={{ background: 'linear-gradient(to top, #0b0f10, #0b0f10, transparent)' }}>
        <button
          onClick={() => setConfirmed(true)}
          className="w-full py-5 rounded-xl primary-gradient text-on-primary font-headline font-bold text-base shadow-xl shadow-primary/20 active:scale-95 transition-transform duration-300 flex items-center justify-center gap-3 max-w-md mx-auto lg:max-w-lg"
        >
          Confirm Meeting
          <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  )
}
