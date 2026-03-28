'use client'

import Link from 'next/link'
import Icon from '@/components/ui/Icon'

export default function AuthError({ error, reset }) {
  return (
    <div className="text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto">
        <Icon name="error" className="text-error" size="40px" />
      </div>
      <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface">Authentication Error</h2>
      <p className="text-on-surface-variant text-sm max-w-sm mx-auto">
        {error?.message || 'Something went wrong with authentication.'}
      </p>
      <div className="flex gap-4 justify-center">
        <button onClick={reset} className="px-6 py-3 primary-gradient text-on-primary rounded-xl font-semibold">
          Try Again
        </button>
        <Link href="/login" className="px-6 py-3 bg-surface-container-high text-on-surface rounded-xl font-semibold">
          Back to Login
        </Link>
      </div>
    </div>
  )
}
