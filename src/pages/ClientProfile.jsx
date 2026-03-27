import { useNavigate } from 'react-router-dom'
import Icon from '../components/Icon'
import Avatar from '../components/Avatar'
import { PrimaryButton, SecondaryButton } from '../components/Button'
import useMediaQuery from '../hooks/useMediaQuery'

const STATS = [
  { label: 'Bookings', value: '8', icon: 'event' },
  { label: 'Revenue', value: '$2,000', icon: 'payments' },
  { label: 'Rating', value: '4.9', icon: 'star' },
  { label: 'No-shows', value: '0%', icon: 'event_busy' },
]

const HISTORY = [
  { title: 'Strategy Call', date: 'Oct 12, 2023', time: '10:00 AM', duration: '90 min', status: 'Completed' },
  { title: 'Design Review', date: 'Sep 28, 2023', time: '2:00 PM', duration: '45 min', status: 'Completed' },
  { title: 'Coffee Chat', date: 'Sep 15, 2023', time: '4:00 PM', duration: '15 min', status: 'Completed' },
  { title: 'Product Deep Dive', date: 'Aug 30, 2023', time: '11:00 AM', duration: '60 min', status: 'Cancelled' },
]

export default function ClientProfile() {
  const navigate = useNavigate()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="space-y-8">
      {/* Header */}
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-primary">
        <Icon name="arrow_back" className="text-sm" /> Clients
      </button>

      <div className={isDesktop ? 'grid grid-cols-3 gap-8' : 'space-y-6'}>
        {/* Profile Card */}
        <div className={`${isDesktop ? 'col-span-1' : ''} space-y-6`}>
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 text-center">
            <Avatar alt="Sarah Mitchell" size="lg" className="w-20 h-20 mx-auto mb-4" />
            <h2 className="font-headline font-bold text-xl text-on-surface">Sarah Mitchell</h2>
            <p className="text-sm text-on-surface-variant mt-1">Product Designer at Acme Corp</p>

            <div className="mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Icon name="mail" className="text-sm flex-shrink-0" />
                <span className="truncate">sarah@acmecorp.com</span>
                <button className="ml-auto"><Icon name="content_copy" className="text-xs text-outline-variant hover:text-primary" /></button>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Icon name="call" className="text-sm flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
                <button className="ml-auto"><Icon name="content_copy" className="text-xs text-outline-variant hover:text-primary" /></button>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Icon name="business" className="text-sm flex-shrink-0" />
                <span>Acme Corp</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                <Icon name="calendar_today" className="text-sm flex-shrink-0" />
                <span>Client since Aug 2023</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10 space-y-3">
            <h3 className="font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant">Notes</h3>
            <textarea rows={4} defaultValue="Interested in design system architecture. Prefers morning slots. Follow up on component library proposal."
              className="w-full px-4 py-3 bg-surface-container-low border-none rounded-lg text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <PrimaryButton icon="calendar_add_on">Schedule with Sarah</PrimaryButton>
            <SecondaryButton className="w-full justify-center">
              <Icon name="mail" className="mr-2" /> Send Message
            </SecondaryButton>
          </div>
        </div>

        {/* Right: Stats + History */}
        <div className={`${isDesktop ? 'col-span-2' : ''} space-y-6`}>
          {/* Stats */}
          <div className={`grid ${isDesktop ? 'grid-cols-4' : 'grid-cols-2'} gap-4`}>
            {STATS.map((s) => (
              <div key={s.label} className="bg-surface-container-lowest rounded-xl p-4 lg:p-5 border border-outline-variant/10">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={s.icon} className="text-primary text-sm" />
                  <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold text-on-surface-variant">{s.label}</span>
                </div>
                <span className="font-headline font-extrabold text-2xl text-on-surface">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Booking History */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline font-bold text-lg text-on-surface">Booking History</h3>
              {isDesktop && (
                <button className="text-primary text-sm font-semibold hover:underline">Schedule New</button>
              )}
            </div>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10">
              {HISTORY.map((booking, i) => (
                <div key={i} className={`p-4 lg:p-5 flex items-center gap-4 hover:bg-surface transition-colors ${i > 0 ? '' : ''}`}>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="event" className="text-primary text-sm" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-on-surface text-sm">{booking.title}</h4>
                    <p className="text-xs text-on-surface-variant">{booking.date} · {booking.time} · {booking.duration}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    booking.status === 'Completed' ? 'bg-green-500/10 text-green-600' : 'bg-error/10 text-error'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
