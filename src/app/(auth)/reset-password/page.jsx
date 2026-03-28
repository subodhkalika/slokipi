'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PrimaryButton } from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const getStrength = () => {
    if (password.length === 0) return 0
    if (password.length < 6) return 1
    if (password.length < 10) return 2
    return 3
  }
  const strength = getStrength()
  const strengthColors = ['', 'bg-error', 'bg-yellow-400', 'bg-green-500']
  const strengthLabels = ['', 'Weak', 'Medium', 'Strong']

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
          <Icon name="check_circle" className="text-green-500" size="40px" />
        </div>
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface">Password Reset!</h1>
        <p className="text-on-surface-variant text-sm">Your password has been successfully reset. Redirecting to sign in...</p>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8">
        <Icon name="shield" className="text-primary" size="40px" />
      </div>

      <h1 className={`font-headline font-extrabold tracking-tight text-on-surface mb-3 ${isDesktop ? 'text-4xl' : 'text-3xl'}`}>
        Set new password
      </h1>
      <p className="text-on-surface-variant text-sm mb-10 max-w-xs mx-auto">
        Your new password must be at least 8 characters long.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        {/* New Password */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">New Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors">
              <Icon name="lock" />
            </div>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password"
              className="w-full pl-14 pr-14 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 text-on-surface placeholder:text-outline-variant/60 font-body text-lg outline-none" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-5 flex items-center text-outline-variant hover:text-primary transition-colors">
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} />
            </button>
          </div>
          {password.length > 0 && (
            <div className="flex items-center gap-3 px-1 mt-2">
              <div className="flex gap-1 flex-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength] : 'bg-surface-container-high'}`} />
                ))}
              </div>
              <span className="text-[10px] font-label uppercase tracking-wider font-semibold text-on-surface-variant">{strengthLabels[strength]}</span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Confirm Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors">
              <Icon name="lock" />
            </div>
            <input type={showConfirm ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password"
              className="w-full pl-14 pr-14 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 text-on-surface placeholder:text-outline-variant/60 font-body text-lg outline-none" />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute inset-y-0 right-5 flex items-center text-outline-variant hover:text-primary transition-colors">
              <Icon name={showConfirm ? 'visibility_off' : 'visibility'} />
            </button>
          </div>
          {confirm.length > 0 && password !== confirm && (
            <p className="text-[11px] text-error px-1">Passwords do not match</p>
          )}
        </div>

        <PrimaryButton type="submit" icon="check">
          Reset Password
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
