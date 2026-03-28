'use client'

import { useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import Icon from '@/components/ui/Icon'
import Avatar from '@/components/ui/Avatar'
import useMediaQuery from '@/hooks/useMediaQuery'
import { createBooking } from '@/lib/actions/bookings'

export default function BookingForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const { username } = useParams()
  const searchParams = useSearchParams()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const eventTypeId = searchParams.get('eventTypeId')
  const date = searchParams.get('date') || '2023-10-04'
  const time = searchParams.get('time') || '11:30 AM'
  const duration = parseInt(searchParams.get('duration') || '45')

  // Parse time to build start/end timestamps
  const parseTime = (timeStr) => {
    const [rawTime, period] = timeStr.split(' ')
    let [hours, minutes] = rawTime.split(':').map(Number)
    if (period === 'PM' && hours !== 12) hours += 12
    if (period === 'AM' && hours === 12) hours = 0
    return { hours, minutes }
  }

  const { hours, minutes } = parseTime(time)
  const startTime = new Date(`${date}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`)
  const endTime = new Date(startTime.getTime() + duration * 60000)

  const inputClass = "w-full pl-14 pr-6 py-5 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-lg outline-none"
  const darkInput = `${inputClass} bg-[#1a2124] text-[#f7f9fb] placeholder:text-[#acb3b7]/60 focus:bg-[#12181a]`

  const handleSubmit = async () => {
    if (!name || !email) return
    setSubmitting(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.set('eventTypeId', eventTypeId || '')
      formData.set('hostId', '') // Will be resolved server-side from event type
      formData.set('clientName', name)
      formData.set('clientEmail', email)
      formData.set('clientPhone', phone)
      formData.set('startTime', startTime.toISOString())
      formData.set('endTime', endTime.toISOString())
      formData.set('notes', notes)
      await createBooking(formData)
      router.push(`/book/${username}/confirmed`)
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className={isDesktop ? 'grid grid-cols-2 gap-12' : 'space-y-8'}>
      {/* Booking Summary */}
      <div className="space-y-6">
        <div className="rounded-xl p-6" style={{ backgroundColor: '#12181a' }}>
          <div className="flex items-center gap-4 mb-6">
            <Avatar alt="Host" size="lg" className="ring-2 ring-primary/20" />
            <div>
              <h3 className="font-headline font-bold text-base" style={{ color: '#f7f9fb' }}>Alex Reed</h3>
              <p className="text-xs" style={{ color: '#acb3b7' }}>Design Consultant</p>
            </div>
          </div>
          <h2 className="font-headline font-extrabold text-2xl tracking-tight mb-4" style={{ color: '#f7f9fb' }}>Strategy Session</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
              <Icon name="calendar_today" className="text-sm" />
              <span className="text-sm">{new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
              <Icon name="schedule" className="text-sm" />
              <span className="text-sm">{time} · {duration} min</span>
            </div>
            <div className="flex items-center gap-3" style={{ color: '#acb3b7' }}>
              <Icon name="videocam" className="text-sm" />
              <span className="text-sm">Google Meet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <h3 className="font-headline font-bold text-lg" style={{ color: '#f7f9fb' }}>Your Details</h3>

        {error && <div className="bg-error/10 text-error px-4 py-3 rounded-xl text-sm">{error}</div>}

        <div className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none" style={{ color: '#acb3b7' }}><Icon name="person" /></div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required className={darkInput} />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none" style={{ color: '#acb3b7' }}><Icon name="mail" /></div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" required className={darkInput} />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none" style={{ color: '#acb3b7' }}><Icon name="call" /></div>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (optional)" className={darkInput} />
          </div>
          <div>
            <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-semibold mb-2" style={{ color: '#acb3b7' }}>What would you like to discuss?</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Share any context or questions..."
              className="w-full px-6 py-5 border-none rounded-2xl focus:ring-2 focus:ring-primary/20 transition-all text-base outline-none resize-none bg-[#1a2124] text-[#f7f9fb] placeholder:text-[#acb3b7]/60 focus:bg-[#12181a]" />
          </div>
        </div>
      </div>

      {/* Fixed CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 z-40" style={{ background: 'linear-gradient(to top, #0b0f10, #0b0f10, transparent)' }}>
        <button onClick={handleSubmit} disabled={!name || !email || submitting}
          className={`w-full py-5 rounded-xl primary-gradient text-on-primary font-headline font-bold text-base shadow-xl shadow-primary/20 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 max-w-md mx-auto lg:max-w-lg ${(!name || !email || submitting) ? 'opacity-50' : ''}`}>
          {submitting ? 'Booking...' : 'Confirm Booking'}
          {!submitting && <Icon name="arrow_forward" />}
        </button>
      </div>
    </div>
  )
}
