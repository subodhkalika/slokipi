'use client'

import { useState } from 'react'
import Link from 'next/link'
import { requestPasswordReset } from '@/lib/actions/password'
import { PrimaryButton } from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const result = await requestPasswordReset(email)
    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
          <Icon name="mark_email_read" className="text-primary" size="40px" />
        </div>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Check your email</h1>
        <p className="text-on-surface-variant text-sm max-w-sm mx-auto leading-relaxed">
          We've sent a password reset link to <span className="font-semibold text-on-surface">{email}</span>. It may take a minute to arrive.
        </p>
        <button onClick={() => setSent(false)} className="text-primary font-semibold text-sm hover:underline">
          Try a different email
        </button>
        <div className="pt-4">
          <Link href="/login" className="text-sm text-on-surface-variant hover:text-primary transition-colors">
            Back to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center">
      {/* Icon */}
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
        <Icon name="lock" className="text-primary" size="40px" />
      </div>

      <h1 className={`font-headline font-extrabold tracking-tight text-on-surface mb-3 ${isDesktop ? 'text-4xl' : 'text-3xl'}`}>
        Forgot your password?
      </h1>
      <p className="text-on-surface-variant text-sm mb-10 max-w-xs mx-auto leading-relaxed">
        No worries, we'll send you a reset link to get back into your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">
            Email Address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors">
              <Icon name="mail" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full pl-14 pr-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 text-on-surface placeholder:text-outline-variant/60 font-body text-lg outline-none"
            />
          </div>
        </div>

        <PrimaryButton type="submit" icon="send">
          Send Reset Link
        </PrimaryButton>
      </form>

      <div className="mt-8">
        <Link href="/login" className="text-sm text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2">
          <Icon name="arrow_back" className="text-sm" />
          Back to Sign In
        </Link>
      </div>
    </div>
  )
}
