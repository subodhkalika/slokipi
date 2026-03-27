import { useState } from 'react'
import Icon from '../components/Icon'
import useMediaQuery from '../hooks/useMediaQuery'

const NOTIFICATIONS = [
  { id: 1, type: 'booking', icon: 'event_available', iconBg: 'bg-primary/10', iconColor: 'text-primary', title: 'New booking confirmed', desc: 'Sarah Mitchell booked Strategy Call for Oct 15', time: '2 hours ago', unread: true },
  { id: 2, type: 'cancel', icon: 'event_busy', iconBg: 'bg-error/10', iconColor: 'text-error', title: 'Booking cancelled', desc: 'David Chen cancelled Design Review for Oct 14', time: '5 hours ago', unread: true },
  { id: 3, type: 'payment', icon: 'credit_card', iconBg: 'bg-green-500/10', iconColor: 'text-green-600', title: 'Payment received', desc: '$250 from Emily Rodriguez for Product Deep Dive', time: '1 day ago', unread: true },
  { id: 4, type: 'reschedule', icon: 'update', iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary', title: 'Booking rescheduled', desc: 'James Kim moved Coffee Chat to Oct 16 at 3:00 PM', time: '1 day ago', unread: false },
  { id: 5, type: 'client', icon: 'person_add', iconBg: 'bg-secondary/10', iconColor: 'text-secondary', title: 'New client signed up', desc: 'Aisha Patel created an account via your booking link', time: '2 days ago', unread: false },
  { id: 6, type: 'reminder', icon: 'alarm', iconBg: 'bg-primary/10', iconColor: 'text-primary', title: 'Upcoming meeting reminder', desc: 'Strategy Call with Sarah Mitchell starts in 1 hour', time: '3 days ago', unread: false },
  { id: 7, type: 'booking', icon: 'event_available', iconBg: 'bg-primary/10', iconColor: 'text-primary', title: 'New booking confirmed', desc: 'Emily Rodriguez booked Design Review for Oct 18', time: '3 days ago', unread: false },
  { id: 8, type: 'payment', icon: 'credit_card', iconBg: 'bg-green-500/10', iconColor: 'text-green-600', title: 'Payment received', desc: '$125 from James Kim for Coffee Chat', time: '4 days ago', unread: false },
]

const TABS_DESKTOP = ['All', 'Unread', 'Bookings', 'Payments']
const TABS_MOBILE = ['All', 'Unread']

export default function Notifications() {
  const [tab, setTab] = useState('All')
  const [items, setItems] = useState(NOTIFICATIONS)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const tabs = isDesktop ? TABS_DESKTOP : TABS_MOBILE

  const unreadCount = items.filter((n) => n.unread).length

  const filtered = items.filter((n) => {
    if (tab === 'Unread') return n.unread
    if (tab === 'Bookings') return n.type === 'booking' || n.type === 'reschedule' || n.type === 'cancel'
    if (tab === 'Payments') return n.type === 'payment'
    return true
  })

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className={`font-headline font-extrabold tracking-tight text-on-surface ${isDesktop ? 'text-4xl' : 'text-2xl'}`}>
            Notifications
          </h1>
          {unreadCount > 0 && (
            <span className="px-2.5 py-0.5 primary-gradient text-white text-xs font-bold rounded-full">{unreadCount}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-primary text-xs font-semibold hover:underline">
              Mark all read
            </button>
          )}
          {isDesktop && (
            <button className="p-2 rounded-lg hover:bg-surface-container-low transition-colors">
              <Icon name="settings" className="text-on-surface-variant" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-surface-container-low rounded-xl p-1">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              tab === t ? 'bg-surface-container-lowest shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/10">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <Icon name="notifications_none" className="text-on-surface-variant/30 mx-auto mb-4" size="48px" />
            <p className="text-on-surface-variant text-sm">No notifications</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div key={n.id} className={`p-4 lg:p-5 flex items-start gap-4 hover:bg-surface transition-colors cursor-pointer ${n.unread ? 'bg-primary/[0.02]' : ''}`}>
              <div className={`w-10 h-10 rounded-xl ${n.iconBg} flex items-center justify-center flex-shrink-0`}>
                <Icon name={n.icon} className={`${n.iconColor} text-sm`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm ${n.unread ? 'font-bold text-on-surface' : 'font-medium text-on-surface'}`}>{n.title}</h4>
                <p className="text-xs text-on-surface-variant mt-0.5 truncate">{n.desc}</p>
                <p className="text-[10px] font-label text-on-surface-variant/70 mt-1">{n.time}</p>
              </div>
              {n.unread && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
