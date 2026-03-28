'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import Avatar from '@/components/ui/Avatar'
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button'
import useMediaQuery from '@/hooks/useMediaQuery'
import { cancelBooking } from '@/lib/actions/bookings'

export default function DetailView({ booking, eventType }) {
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [cancelling, setCancelling] = useState(false)

  const handleCancel = async () => {
    if (!booking) return
    setCancelling(true)
    await cancelBooking(booking.id)
    router.push('/bookings')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {isDesktop && (
            <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary mb-2">
              <Icon name="arrow_back" className="text-sm" /> Bookings
            </button>
          )}
          <div className="flex items-center gap-3">
            <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-3xl' : 'text-2xl'}`}>
              1:1 Strategy Call
            </h1>
            <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-semibold rounded-full">Confirmed</span>
          </div>
        </div>
      </div>

      <div className={isDesktop ? 'grid grid-cols-3 gap-8' : 'space-y-6'}>
        {/* Main info (2 cols desktop) */}
        <div className={`${isDesktop ? 'col-span-2' : ''} space-y-6`}>
          {/* Date & Time Card */}
          <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="calendar_today" className="text-primary" size="24px" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-on-surface text-lg">October 12, 2023</h3>
                <p className="text-on-surface-variant text-sm mt-1">10:00 AM - 11:30 AM · Pacific Time (GMT-7)</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10 space-y-3">
            <h3 className="font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Description</h3>
            <p className="text-on-surface text-sm leading-relaxed">
              A 90-minute deep dive into your product strategy and design system architecture. We'll cover component structures,
              design tokens, and a roadmap for scaling your scheduling platform.
            </p>
          </div>

          {/* Notes */}
          <div className="bg-surface-container-low rounded-xl p-5 lg:p-6 space-y-3">
            <h3 className="font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Notes from Attendee</h3>
            <p className="text-on-surface text-sm leading-relaxed italic">
              "I'd love to focus on the calendar component and how we can make time selection feel more intuitive. Also interested in discussing
              your approach to responsive layouts."
            </p>
          </div>

          {/* Location */}
          <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="videocam" className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-on-surface">Google Meet</h3>
                  <p className="text-xs text-on-surface-variant">meet.google.com/abc-defg-hij</p>
                </div>
              </div>
              <PrimaryButton className="w-auto px-6 py-3 text-sm" icon="open_in_new">
                Join Meeting
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Attendee Card */}
          <div className="bg-surface-container-lowest rounded-xl p-5 lg:p-6 border border-outline-variant/10 space-y-4">
            <h3 className="font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Attendee</h3>
            <div className="flex items-center gap-3">
              <Avatar alt="Sarah Mitchell" size="lg" />
              <div>
                <h4 className="font-semibold text-on-surface">Sarah Mitchell</h4>
                <p className="text-xs text-on-surface-variant">Product Designer</p>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Icon name="mail" className="text-sm" />
                <span>sarah@acmecorp.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Icon name="call" className="text-sm" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Icon name="business" className="text-sm" />
                <span>Acme Corp</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <SecondaryButton onClick={() => {}} className="w-full justify-center">
              <Icon name="schedule" className="mr-2" />
              Reschedule
            </SecondaryButton>
            {isDesktop && (
              <button className="w-full px-4 py-3 bg-surface-container-low text-on-surface-variant rounded-xl font-medium text-sm hover:bg-surface-container transition-colors flex items-center justify-center gap-2">
                <Icon name="send" className="text-sm" />
                Send Reminder
              </button>
            )}
            <button onClick={handleCancel} className="w-full px-4 py-3 bg-error/10 text-error rounded-xl font-medium text-sm hover:bg-error/20 transition-colors flex items-center justify-center gap-2">
              <Icon name="cancel" className="text-sm" />
              {cancelling ? 'Cancelling...' : 'Cancel Booking'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
