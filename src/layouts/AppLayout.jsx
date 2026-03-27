import { Outlet, NavLink, useLocation } from 'react-router-dom'
import Icon from '../components/Icon'
import Avatar from '../components/Avatar'
import useMediaQuery from '../hooks/useMediaQuery'

const NAV_ITEMS = [
  { to: '/dashboard', icon: 'home', activeIcon: 'home', label: 'Home' },
  { to: '/calendar', icon: 'calendar_today', activeIcon: 'calendar_today', label: 'Calendar' },
  { to: '/events', icon: 'event_note', activeIcon: 'event_note', label: 'Events' },
  { to: '/settings', icon: 'settings', activeIcon: 'settings', label: 'Settings' },
]

const DESKTOP_NAV = [
  { to: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { to: '/calendar', icon: 'calendar_today', label: 'Calendar' },
  { to: '/availability', icon: 'tune', label: 'Availability' },
  { to: '/events', icon: 'event_available', label: 'Event Types' },
  { to: '/bookings', icon: 'book_online', label: 'Bookings' },
  { to: '/clients', icon: 'group', label: 'Clients' },
  { to: '/integrations', icon: 'extension', label: 'Integrations' },
  { to: '/billing', icon: 'credit_card', label: 'Billing' },
  { to: '/notifications', icon: 'notifications', label: 'Notifications' },
  { to: '/settings', icon: 'settings', label: 'Settings' },
]

export default function AppLayout() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const location = useLocation()

  if (isDesktop) {
    return (
      <div className="flex min-h-screen bg-surface text-on-surface">
        {/* Sidebar */}
        <aside className="h-screen w-64 bg-surface-container-low flex flex-col py-8 px-4 sticky top-0 shrink-0">
          <div className="mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary">
                <Icon name="blur_on" />
              </div>
              <div>
                <div className="text-xl font-bold text-on-surface tracking-tighter font-headline">Slokipi</div>
                <div className="text-[10px] uppercase tracking-[0.1em] text-on-surface-variant font-label opacity-60">Atmospheric Precision</div>
              </div>
            </div>
          </div>
          <nav className="flex-1 space-y-1">
            {DESKTOP_NAV.map((item) => {
              const isActive = location.pathname === item.to
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-lowest'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest'
                  }`}
                >
                  <Icon name={item.icon} filled={isActive} />
                  <span className="text-sm font-medium tracking-tight">{item.label}</span>
                </NavLink>
              )
            })}
          </nav>
          <div className="px-2">
            <button className="w-full primary-gradient text-white py-3 rounded-xl font-semibold shadow-sm flex items-center justify-center gap-2 active:scale-95 duration-150">
              <Icon name="add" className="text-sm" />
              <span className="text-sm">New Appointment</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 bg-surface flex flex-col">
          {/* Top bar */}
          <header className="flex justify-between items-center w-full px-8 h-16 sticky top-0 z-40 glass-header">
            <div className="flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" />
                <input
                  className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Search appointments..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-on-surface-variant">
                <button className="hover:text-primary transition-colors"><Icon name="notifications" /></button>
                <button className="hover:text-primary transition-colors"><Icon name="help_outline" /></button>
              </div>
              <Avatar alt="Alex" size="md" className="ring-2 ring-primary/10" />
            </div>
          </header>
          <div className="p-8 lg:p-12 max-w-7xl w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    )
  }

  // Mobile layout
  return (
    <div className="min-h-screen bg-surface text-on-surface pb-32">
      {/* Mobile top bar */}
      <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 glass-header z-50">
        <div className="flex items-center gap-3">
          <Avatar alt="Alex" size="md" className="ring-2 ring-primary/10" />
          <h1 className="font-headline tracking-tight font-bold text-lg text-on-surface">
            {location.pathname === '/dashboard' && 'Good morning, Alex'}
            {location.pathname === '/calendar' && 'Calendar'}
            {location.pathname === '/availability' && 'Your Availability'}
            {location.pathname === '/events' && 'Event Types'}
            {location.pathname === '/bookings' && 'Bookings'}
            {location.pathname === '/clients' && 'Clients'}
            {location.pathname === '/integrations' && 'Integrations'}
            {location.pathname === '/billing' && 'Billing'}
            {location.pathname === '/notifications' && 'Notifications'}
            {location.pathname === '/settings' && 'Settings'}
          </h1>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <Icon name="notifications" className="text-primary" />
        </button>
      </header>

      <main className="mt-24 px-6">
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/90 backdrop-blur-2xl rounded-t-[2rem] shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-on-surface-variant/50 hover:text-primary'
              }`}
            >
              <Icon name={item.icon} filled={isActive} />
              <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold mt-1">{item.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
