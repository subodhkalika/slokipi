import { Outlet } from 'react-router-dom'
import useMediaQuery from '../hooks/useMediaQuery'
import Icon from '../components/Icon'

export default function AuthLayout() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (isDesktop) {
    return (
      <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex">
        {/* Left editorial panel */}
        <div className="w-1/2 bg-surface-container-low relative overflow-hidden flex flex-col justify-center p-16">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-primary/10 to-tertiary/10" />
          <div className="relative z-10 max-w-lg">
            <div className="flex items-center gap-3 mb-12">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-on-primary">
                <Icon name="blur_on" />
              </div>
              <span className="font-headline text-2xl font-extrabold tracking-tighter text-on-surface">Slokipi</span>
            </div>
            <h1 className="font-headline text-6xl font-extrabold tracking-tight leading-none text-on-surface mb-6">
              Atmospheric Precision.
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
              Design your schedule with the frictionless utility of a high-end ritual. Welcome to the future of booking.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-lowest rounded-xl">
                <Icon name="event_available" className="text-primary" />
                <span className="text-sm font-medium">Smart Scheduling</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-surface-container-lowest rounded-xl">
                <Icon name="link" className="text-tertiary" />
                <span className="text-sm font-medium">Instant Booking Links</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="w-1/2 flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    )
  }

  // Mobile
  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex flex-col items-center justify-center p-6 overflow-x-hidden">
      <div className="ambient-blur-primary" />
      <div className="ambient-blur-tertiary" />
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
