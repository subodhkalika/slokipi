'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Calendar from '@/components/ui/Calendar'
import TimeSlotChip from '@/components/ui/TimeSlotChip'
import Icon from '@/components/ui/Icon'
import Avatar from '@/components/ui/Avatar'
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button'
import useMediaQuery from '@/hooks/useMediaQuery'

const TIME_SLOTS = ['09:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']

export default function Reschedule() {
  const [selectedDate, setSelectedDate] = useState(15)
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM')
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (confirmed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
          <Icon name="event_available" className="text-green-500" size="40px" />
        </div>
        <h2 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Rescheduled!</h2>
        <p className="text-on-surface-variant text-sm max-w-sm leading-relaxed">
          Your 1:1 Strategy Call has been moved to October {selectedDate} at {selectedSlot}. Updated calendar invites have been sent.
        </p>
        <PrimaryButton onClick={() => router.push('/dashboard')} className="w-auto px-8">
          Back to Dashboard
        </PrimaryButton>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        {isDesktop && (
          <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-2">
            <Icon name="arrow_back" className="text-sm" /> Bookings
          </button>
        )}
        <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-3xl' : 'text-2xl'}`}>
          Reschedule Booking
        </h1>
      </div>

      {/* Original Booking Info */}
      <div className="bg-surface-container-lowest rounded-xl p-4 lg:p-5 flex items-center gap-4 border border-outline-variant/10">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Icon name="event" className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-on-surface">1:1 Strategy Call</h3>
          <p className="text-xs text-on-surface-variant">Currently: Oct 12, 2023 · 10:00 AM - 11:30 AM</p>
        </div>
        <div className="flex items-center gap-2">
          <Avatar alt="Sarah" size="sm" />
          <span className="text-xs text-on-surface-variant hidden sm:inline">Sarah Mitchell</span>
        </div>
      </div>

      <div className={isDesktop ? 'grid grid-cols-2 gap-8' : 'space-y-8'}>
        {/* Calendar */}
        <div className="space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">Choose a new date</h2>
          <Calendar selectedDates={[selectedDate]} onDateSelect={setSelectedDate} />
        </div>

        {/* Time Slots */}
        <div className="space-y-4">
          <h2 className="font-headline font-bold text-lg text-on-surface">Select a new time</h2>
          <div className="grid grid-cols-2 gap-3">
            {TIME_SLOTS.map((slot) => (
              <TimeSlotChip
                key={slot}
                time={slot}
                selected={selectedSlot === slot}
                onClick={() => setSelectedSlot(slot)}
              />
            ))}
          </div>

          {/* Timezone */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-on-surface-variant w-fit">
            <Icon name="public" size="16px" />
            <p className="text-[11px] font-medium tracking-wide">
              Pacific Time <span className="text-on-surface">(GMT-7)</span>
            </p>
          </div>

          {/* Actions */}
          <div className={`flex gap-4 pt-4 ${isDesktop ? '' : 'flex-col'}`}>
            <PrimaryButton icon="check" onClick={() => setConfirmed(true)}>
              Confirm Reschedule
            </PrimaryButton>
            {isDesktop && (
              <SecondaryButton onClick={() => router.back()}>
                Keep Original Time
              </SecondaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
