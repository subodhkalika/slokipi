'use client'

import Icon from '@/components/ui/Icon'

export default function AppError({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
        <Icon name="error" className="text-error" size="40px" />
      </div>
      <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Something went wrong</h2>
      <p className="text-on-surface-variant text-sm max-w-sm">
        {error?.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <button onClick={reset}
        className="px-6 py-3 primary-gradient text-on-primary rounded-xl font-semibold active:scale-95 transition-all">
        Try Again
      </button>
    </div>
  )
}
