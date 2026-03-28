'use client'

import Link from 'next/link'
import Icon from '@/components/ui/Icon'
import Avatar from '@/components/ui/Avatar'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function BookingConfirmation() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 px-4">
      {/* Check icon */}
      <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center animate-bounce">
        <Icon name="check_circle" className="text-primary" size="56px" />
      </div>

      <h1 className="font-headline text-4xl font-extrabold tracking-tight" style={{ color: '#f7f9fb' }}>
        You're all set!
      </h1>

      {/* Booking summary card */}
      <div className="w-full max-w-md rounded-xl p-6 space-y-4" style={{ backgroundColor: '#12181a' }}>
        <div className="flex items-center gap-4 pb-4" style={{ borderBottom: '1px solid rgba(172,179,183,0.1)' }}>
          <Avatar alt="Alex Reed" size="lg" className="ring-2 ring-primary/20" />
          <div className="text-left">
            <h3 className="font-headline font-bold" style={{ color: '#f7f9fb' }}>Strategy Session</h3>
            <p className="text-xs" style={{ color: '#acb3b7' }}>with Alex Reed</p>
          </div>
        </div>

        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
            <Icon name="calendar_today" className="text-sm" />
            <span className="text-sm">October 4, 2023</span>
          </div>
          <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
            <Icon name="schedule" className="text-sm" />
            <span className="text-sm">11:30 AM · 45 min</span>
          </div>
          <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
            <Icon name="videocam" className="text-sm" />
            <span className="text-sm">Google Meet</span>
          </div>
          <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
            <Icon name="public" className="text-sm" />
            <span className="text-sm">Pacific Time (GMT-7)</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className={`flex gap-3 w-full max-w-md ${isDesktop ? '' : 'flex-col'}`}>
        <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-medium transition-colors" style={{ backgroundColor: '#1a2124', color: '#f7f9fb' }}>
          <Icon name="calendar_add_on" className="text-sm" />
          Google Calendar
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-medium transition-colors" style={{ backgroundColor: '#1a2124', color: '#f7f9fb' }}>
          <Icon name="phone_iphone" className="text-sm" />
          Apple Calendar
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-medium transition-colors" style={{ backgroundColor: '#1a2124', color: '#f7f9fb' }}>
          <Icon name="content_copy" className="text-sm" />
          Copy Details
        </button>
      </div>

      {/* Email note */}
      <div className="flex items-center gap-2" style={{ color: '#acb3b7' }}>
        <Icon name="mark_email_read" className="text-sm text-primary" />
        <p className="text-xs">A confirmation has been sent to <span style={{ color: '#f7f9fb' }}>sarah@example.com</span></p>
      </div>

      {/* Footer links */}
      <div className="pt-4 space-y-2">
        <p className="text-xs" style={{ color: '#acb3b7' }}>Need to make changes?</p>
        <div className="flex items-center justify-center gap-4">
          <button className="text-sm text-primary font-medium hover:underline">Reschedule</button>
          <span style={{ color: '#acb3b7' }}>·</span>
          <button className="text-sm font-medium hover:underline" style={{ color: '#acb3b7' }}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
