'use client'

import Link from 'next/link'
import StatCard from '@/components/ui/StatCard'
import BookingCard from '@/components/ui/BookingCard'
import Icon from '@/components/ui/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'

const MOCK_BOOKINGS = [
  { title: '1:1 Strategy Call', time: '10:30 AM - 11:00 AM', icon: 'video_call', iconBg: 'bg-surface-container-low', iconColor: 'text-primary', participants: [{ name: 'Sarah' }], timeSlot: { month: 'OCT', day: '12', start: '10:00 AM', end: '11:30 AM' } },
  { title: 'Design Review', time: '1:15 PM - 2:00 PM', icon: 'brush', iconBg: 'bg-tertiary-container/30', iconColor: 'text-tertiary', participants: [{ name: 'Emily' }], timeSlot: { month: 'OCT', day: '12', start: '1:00 PM', end: '2:00 PM' } },
  { title: 'Coffee Chat', time: '4:00 PM - 4:15 PM', icon: 'coffee', iconBg: 'bg-surface-container-low', iconColor: 'text-primary', participants: [{ name: 'James' }], timeSlot: { month: 'OCT', day: '13', start: '09:00 AM', end: '10:00 AM' } },
]

export default function DashboardView({ bookings, stats }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const displayBookings = bookings.length > 0 ? bookings : MOCK_BOOKINGS
  const displayStats = stats.today > 0 ? stats : { today: 3, weekly: 12 }

  return (
    <div className="space-y-8 lg:space-y-12">
      {isDesktop && (
        <section className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-on-surface font-headline">Good morning, Alex</h1>
            <p className="text-on-surface-variant mt-2 text-lg">You have {displayStats.today} appointments scheduled for today.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/availability" className="px-6 py-3 bg-surface-container-high rounded-xl text-on-surface font-semibold hover:bg-surface-variant transition-all">View Schedule</Link>
            <button className="px-6 py-3 primary-gradient text-white rounded-xl font-semibold flex items-center gap-2">
              <Icon name="share" /> Share Booking Link
            </button>
          </div>
        </section>
      )}

      <section className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'} gap-4 lg:gap-6`}>
        <StatCard label="Today" value={displayStats.today} unit="meetings" icon="today" />
        <StatCard label="This Week" value={displayStats.weekly} unit="bookings" icon="date_range" iconColor="text-tertiary" hoverColor="hover:bg-tertiary/5" />
        {isDesktop && (
          <div className="bg-primary text-on-primary p-8 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-48">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div>
              <h3 className="font-bold text-lg leading-tight font-headline">Ready to expand?</h3>
              <p className="text-white/80 text-xs mt-1">Your public link is active.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center justify-between mt-4">
              <span className="text-xs font-mono truncate">slokipi.com/alex-design</span>
              <button className="bg-white text-primary p-1 rounded-lg"><Icon name="content_copy" size="18px" /></button>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4 lg:space-y-6">
        <div className="flex justify-between items-end mb-2">
          <h2 className="font-headline font-extrabold text-xl lg:text-2xl tracking-tight text-on-surface">Upcoming Bookings</h2>
          <Link href="/bookings" className="font-label text-[10px] lg:text-sm uppercase tracking-[0.05em] font-semibold text-primary hover:underline">View All</Link>
        </div>
        <div className={`space-y-3 ${isDesktop ? 'bg-surface-container-lowest rounded-[2rem] overflow-hidden' : ''}`}>
          {displayBookings.map((booking, i) => (
            <BookingCard key={i} {...booking} />
          ))}
        </div>
      </section>

      {!isDesktop && (
        <section className="pt-4">
          <div className="primary-gradient p-6 rounded-xl text-on-primary shadow-lg shadow-primary/20">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-headline font-bold text-lg leading-tight">Share your booking link</h4>
                <p className="font-body text-sm opacity-90">Let others schedule time with you instantly.</p>
              </div>
              <button className="bg-white/20 p-2 rounded-lg backdrop-blur-md"><Icon name="content_copy" className="text-white" /></button>
            </div>
            <div className="mt-4 bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2 overflow-hidden">
              <Icon name="link" className="text-sm opacity-70" />
              <span className="font-body text-xs truncate">slokipi.com/alex-design-strategy</span>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
