import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import BookingCard from '../components/BookingCard'
import Icon from '../components/Icon'
import useMediaQuery from '../hooks/useMediaQuery'

const BOOKINGS = [
  {
    title: '1:1 Strategy Call',
    time: '10:30 AM - 11:00 AM',
    icon: 'video_call',
    iconBg: 'bg-surface-container-low',
    iconColor: 'text-primary',
    participants: [{ name: 'Sarah', avatar: '' }, { name: '+1' }],
    timeSlot: { month: 'OCT', day: '12', start: '10:00 AM', end: '11:30 AM' },
  },
  {
    title: 'Design Review',
    time: '1:15 PM - 2:00 PM',
    icon: 'brush',
    iconBg: 'bg-tertiary-container/30',
    iconColor: 'text-tertiary',
    participants: [{ name: 'Emily' }],
    timeSlot: { month: 'OCT', day: '12', start: '1:00 PM', end: '2:00 PM' },
  },
  {
    title: 'Coffee Chat',
    time: '4:00 PM - 4:15 PM',
    icon: 'coffee',
    iconBg: 'bg-surface-container-low',
    iconColor: 'text-primary',
    participants: [{ name: 'James' }],
    timeSlot: { month: 'OCT', day: '13', start: '09:00 AM', end: '10:00 AM' },
  },
]

export default function Dashboard() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Hero / Greeting (Desktop) */}
      {isDesktop && (
        <section className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div>
            <h1 className="text-5xl font-extrabold tracking-tight text-on-surface font-headline">Good morning, Alex</h1>
            <p className="text-on-surface-variant mt-2 text-lg">You have 4 appointments scheduled for today.</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/availability"
              className="px-6 py-3 bg-surface-container-high rounded-xl text-on-surface font-semibold hover:bg-surface-variant transition-all"
            >
              View Schedule
            </Link>
            <button className="px-6 py-3 primary-gradient text-white rounded-xl font-semibold flex items-center gap-2">
              <Icon name="share" />
              Share Booking Link
            </button>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-2'} gap-4 lg:gap-6`}>
        <StatCard label="Today" value={isDesktop ? 4 : 3} unit={isDesktop ? 'Meetings scheduled' : 'meetings'} icon="today" />
        <StatCard label={isDesktop ? 'Weekly' : 'This Week'} value={isDesktop ? 28 : 12} unit={isDesktop ? 'Total bookings' : 'bookings'} icon="date_range" iconColor="text-tertiary" hoverColor="hover:bg-tertiary/5" />
        {/* Booking Link card (desktop only) */}
        {isDesktop && (
          <div className="bg-primary text-on-primary p-8 rounded-[2rem] relative overflow-hidden flex flex-col justify-between h-48">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div>
              <h3 className="font-bold text-lg leading-tight font-headline">Ready to expand?</h3>
              <p className="text-white/80 text-xs mt-1">Your public link is active and receiving traffic.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 flex items-center justify-between mt-4">
              <span className="text-xs font-mono truncate">slokipi.com/alex-design</span>
              <button className="bg-white text-primary p-1 rounded-lg">
                <Icon name="content_copy" size="18px" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Upcoming Bookings */}
      <section className="space-y-4 lg:space-y-6">
        <div className="flex justify-between items-end mb-2 px-0 lg:px-2">
          <h2 className="font-headline font-extrabold text-xl lg:text-2xl tracking-tight text-on-surface">Upcoming Bookings</h2>
          <span className="font-label text-[10px] lg:text-sm uppercase tracking-[0.05em] font-semibold text-primary cursor-pointer hover:underline">View All</span>
        </div>
        <div className={`space-y-3 ${isDesktop ? 'bg-surface-container-lowest rounded-[2rem] overflow-hidden divide-y-0' : ''}`}>
          {BOOKINGS.map((booking, i) => (
            <BookingCard key={i} {...booking} />
          ))}
        </div>
      </section>

      {/* CTA Section (Mobile) */}
      {!isDesktop && (
        <section className="pt-4">
          <div className="primary-gradient p-6 rounded-xl text-on-primary shadow-lg shadow-primary/20">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h4 className="font-headline font-bold text-lg leading-tight">Share your booking link</h4>
                <p className="font-body text-sm opacity-90">Let others schedule time with you instantly.</p>
              </div>
              <button className="bg-white/20 p-2 rounded-lg backdrop-blur-md active:scale-95 transition-all">
                <Icon name="content_copy" className="text-white" />
              </button>
            </div>
            <div className="mt-4 bg-white/10 rounded-lg px-4 py-2 flex items-center gap-2 overflow-hidden">
              <Icon name="link" className="text-sm opacity-70" />
              <span className="font-body text-xs truncate">slokipi.com/alex-design-strategy</span>
            </div>
          </div>
        </section>
      )}

      {/* Workflow Section (Desktop) */}
      {isDesktop && (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
          <div className="bg-surface-container-low p-10 rounded-[2.5rem] flex flex-col justify-center">
            <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4">The Workflow</span>
            <h2 className="text-3xl font-bold font-headline leading-tight text-on-surface">Precision scheduling without the noise.</h2>
            <p className="text-on-surface-variant mt-4 leading-relaxed">Slokipi intelligently manages your available windows, ensuring that meetings are clustered for maximum deep-work sessions.</p>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center -space-x-1">
                <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-xs font-bold text-white">1</div>
                <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-xs font-bold">2</div>
                <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-xs font-bold">3</div>
              </div>
              <span className="text-sm font-medium">Automatic buffering active</span>
            </div>
          </div>
          <div className="rounded-[2.5rem] overflow-hidden bg-surface-container-low h-80 flex items-center justify-center">
            <Icon name="photo_camera" className="text-outline-variant/30" size="80px" />
          </div>
        </section>
      )}
    </div>
  )
}
