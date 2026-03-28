'use client'

import Icon from '@/components/ui/Icon'

export default function BookingError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-error/20 flex items-center justify-center">
        <Icon name="error" className="text-error" size="40px" />
      </div>
      <h2 className="font-headline text-2xl font-extrabold tracking-tight" style={{ color: '#f7f9fb' }}>
        Booking Unavailable
      </h2>
      <p className="text-sm max-w-sm" style={{ color: '#acb3b7' }}>
        {error?.message || "We couldn't load this booking page. The host may have changed their settings."}
      </p>
      <button onClick={reset}
        className="px-6 py-3 primary-gradient text-on-primary rounded-xl font-semibold active:scale-95 transition-all">
        Try Again
      </button>
    </div>
  )
}
