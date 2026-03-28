'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import Avatar from '@/components/ui/Avatar'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function BookingForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const inputClass = "w-full pl-14 pr-6 py-5 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-lg outline-none"
  const darkInput = `${inputClass} bg-[#1a2124] text-[#f7f9fb] placeholder:text-[#acb3b7]/60 focus:bg-[#12181a]`

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
          Your Strategy Session with Alex Reed is confirmed for October 4 at 11:30 AM.
          You'll receive a calendar invite at <span style={{ color: '#f7f9fb' }}>{email}</span>.
        </p>
        <div className="flex gap-3">
          <button className="px-5 py-3 rounded-xl text-sm font-medium flex items-center gap-2" style={{ backgroundColor: '#1a2124', color: '#f7f9fb' }}>
            <Icon name="calendar_add_on" className="text-sm" />
            Add to Calendar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={isDesktop ? 'grid grid-cols-2 gap-12' : 'space-y-8'}>
      {/* Left: Booking Summary */}
      <div className="space-y-6">
        <div className="rounded-xl p-6" style={{ backgroundColor: '#12181a' }}>
          <div className="flex items-center gap-4 mb-6">
            <Avatar alt="Alex Reed" size="lg" className="ring-2 ring-primary/20" />
            <div>
              <h3 className="font-headline font-bold text-base" style={{ color: '#f7f9fb' }}>Alex Reed</h3>
              <p className="text-xs" style={{ color: '#acb3b7' }}>Design Consultant</p>
            </div>
          </div>

          <h2 className="font-headline font-extrabold text-2xl tracking-tight mb-4" style={{ color: '#f7f9fb' }}>
            Strategy Session
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
              <Icon name="calendar_today" className="text-sm" />
              <span className="text-sm">October 4, 2023</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
              <Icon name="schedule" className="text-sm" />
              <span className="text-sm">11:30 AM · 45 min</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
              <Icon name="public" className="text-sm" />
              <span className="text-sm">Pacific Time (GMT-7)</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
              <Icon name="videocam" className="text-sm" />
              <span className="text-sm">Google Meet</span>
            </div>
          </div>
        </div>

        {isDesktop && (
          <div className="rounded-xl p-5" style={{ backgroundColor: '#12181a' }}>
            <div className="flex items-center gap-3 mb-2">
              <Icon name="verified" className="text-primary" />
              <span className="text-sm font-medium" style={{ color: '#f7f9fb' }}>Trusted by 2,400+ clients</span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: '#acb3b7' }}>
              "Alex's strategy sessions are incredibly valuable. The design system insights alone saved us months of work." — Design Lead, TechCorp
            </p>
          </div>
        )}
      </div>

      {/* Right: Form */}
      <div className="space-y-6">
        <h3 className="font-headline font-bold text-lg" style={{ color: '#f7f9fb' }}>Your Details</h3>

        <div className="space-y-5">
          {/* Name */}
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none" style={{ color: '#acb3b7' }}>
              <Icon name="person" />
            </div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className={darkInput} />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none" style={{ color: '#acb3b7' }}>
              <Icon name="mail" />
            </div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className={darkInput} />
          </div>

          {/* Phone */}
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none" style={{ color: '#acb3b7' }}>
              <Icon name="call" />
            </div>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className={darkInput} />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-label uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: '#232b2e', color: '#acb3b7' }}>
              Optional
            </span>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-semibold mb-2" style={{ color: '#acb3b7' }}>
              What would you like to discuss?
            </label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Share any context or questions..."
              className="w-full px-6 py-5 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-base outline-none resize-none bg-[#1a2124] text-[#f7f9fb] placeholder:text-[#acb3b7]/60 focus:bg-[#12181a]" />
          </div>
        </div>

        <p className="text-[11px] leading-relaxed" style={{ color: '#acb3b7' }}>
          By confirming, you agree to the <a href="#" className="underline text-primary/80">cancellation policy</a> and{' '}
          <a href="#" className="underline text-primary/80">terms of service</a>.
        </p>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 z-40" style={{ background: 'linear-gradient(to top, #0b0f10, #0b0f10, transparent)' }}>
        <button
          onClick={() => setConfirmed(true)}
          className="w-full py-5 rounded-xl primary-gradient text-on-primary font-headline font-bold text-base shadow-xl shadow-primary/20 active:scale-95 transition-transform duration-300 flex items-center justify-center gap-3 max-w-md mx-auto lg:max-w-lg"
        >
          Confirm Booking
          <Icon name="arrow_forward" />
        </button>
      </div>
    </div>
  )
}
