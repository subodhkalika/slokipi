'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Icon from '@/components/ui/Icon'
import Avatar from '@/components/ui/Avatar'
import useMediaQuery from '@/hooks/useMediaQuery'

const NAV_ITEMS = [
  { href: '/dashboard', icon: 'home', label: 'Home' },
  { href: '/calendar', icon: 'calendar_today', label: 'Calendar' },
  { href: '/events', icon: 'event_note', label: 'Events' },
  { href: '/settings', icon: 'settings', label: 'Settings' },
]

const DESKTOP_NAV = [
  { href: '/dashboard', icon: 'dashboard', label: 'Dashboard' },
  { href: '/calendar', icon: 'calendar_today', label: 'Calendar' },
  { href: '/availability', icon: 'tune', label: 'Availability' },
  { href: '/events', icon: 'event_available', label: 'Event Types' },
  { href: '/bookings', icon: 'book_online', label: 'Bookings' },
  { href: '/clients', icon: 'group', label: 'Clients' },
  { href: '/integrations', icon: 'extension', label: 'Integrations' },
  { href: '/billing', icon: 'credit_card', label: 'Billing' },
  { href: '/notifications', icon: 'notifications', label: 'Notifications' },
  { href: '/settings', icon: 'settings', label: 'Settings' },
]

const TITLES = {
  '/dashboard': 'Good morning, Alex',
  '/calendar': 'Calendar',
  '/availability': 'Your Availability',
  '/events': 'Event Types',
  '/bookings': 'Bookings',
  '/clients': 'Clients',
  '/integrations': 'Integrations',
  '/billing': 'Billing',
  '/notifications': 'Notifications',
  '/settings': 'Settings',
}

export default function AppLayout({ children }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const pathname = usePathname()
  const router = useRouter()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const menuRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowProfileMenu(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  if (isDesktop) {
    return (
      <div className="flex min-h-screen bg-surface text-on-surface">
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
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'text-primary font-bold border-r-2 border-primary bg-surface-container-lowest'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest'
                  }`}>
                  <Icon name={item.icon} filled={isActive} />
                  <span className="text-sm font-medium tracking-tight">{item.label}</span>
                </Link>
              )
            })}
          </nav>
          <div className="px-2">
            <Link href="/events/new" className="w-full primary-gradient text-white py-3 rounded-xl font-semibold shadow-sm flex items-center justify-center gap-2 active:scale-95 duration-150">
              <Icon name="add" className="text-sm" />
              <span className="text-sm">New Appointment</span>
            </Link>
          </div>
        </aside>
        <main className="flex-1 min-w-0 bg-surface flex flex-col">
          <header className="flex justify-between items-center w-full px-8 h-16 sticky top-0 z-40 glass-header">
            <div className="flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-50" />
                <input className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Search appointments..." type="text" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-on-surface-variant">
                <button className="hover:text-primary transition-colors"><Icon name="notifications" /></button>
                <button className="hover:text-primary transition-colors"><Icon name="help_outline" /></button>
              </div>
              <div className="relative" ref={menuRef}>
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <Avatar alt="Alex" size="md" className="ring-2 ring-primary/10" />
                  <Icon name="expand_more" className="text-on-surface-variant text-sm" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 top-14 w-56 bg-surface-container-lowest rounded-xl shadow-2xl shadow-on-surface/10 border border-outline-variant/10 py-2 z-50">
                    <Link href="/settings" onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-on-surface hover:bg-surface-container-low transition-colors">
                      <Icon name="person" className="text-on-surface-variant text-sm" /> Profile & Settings
                    </Link>
                    <Link href="/billing" onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-on-surface hover:bg-surface-container-low transition-colors">
                      <Icon name="credit_card" className="text-on-surface-variant text-sm" /> Billing
                    </Link>
                    <div className="my-1 h-px bg-surface-container-high" />
                    <button onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/5 transition-colors w-full text-left">
                      <Icon name="logout" className="text-sm" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
          <div className="p-8 lg:p-12 max-w-7xl w-full mx-auto">{children}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface pb-32">
      <header className="fixed top-0 w-full flex justify-between items-center px-6 py-4 glass-header z-50">
        <div className="flex items-center gap-3">
          <div className="relative" ref={menuRef}>
            <button onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <Avatar alt="Alex" size="md" className="ring-2 ring-primary/10" />
            </button>
            {showProfileMenu && (
              <div className="absolute left-0 top-14 w-56 bg-surface-container-lowest rounded-xl shadow-2xl shadow-on-surface/10 border border-outline-variant/10 py-2 z-50">
                <Link href="/settings" onClick={() => setShowProfileMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-on-surface hover:bg-surface-container-low transition-colors">
                  <Icon name="person" className="text-on-surface-variant text-sm" /> Settings
                </Link>
                <div className="my-1 h-px bg-surface-container-high" />
                <button onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/5 transition-colors w-full text-left">
                  <Icon name="logout" className="text-sm" /> Sign Out
                </button>
              </div>
            )}
          </div>
          <h1 className="font-headline tracking-tight font-bold text-lg text-on-surface">
            {TITLES[pathname] || 'Slokipi'}
          </h1>
        </div>
        <button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
          <Icon name="notifications" className="text-primary" />
        </button>
      </header>
      <main className="mt-24 px-6">{children}</main>
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-3 bg-white/90 backdrop-blur-2xl rounded-t-[2rem] shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href}
              className={`flex flex-col items-center justify-center px-5 py-2 rounded-2xl transition-all ${
                isActive ? 'bg-primary/10 text-primary' : 'text-on-surface-variant/50 hover:text-primary'
              }`}>
              <Icon name={item.icon} filled={isActive} />
              <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold mt-1">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
