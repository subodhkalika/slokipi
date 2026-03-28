'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { PrimaryButton } from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()
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

  const handleSignup = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }
    if (data.user) {
      await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
      })
    }
    router.push('/onboarding')
    router.refresh()
  }

  const handleGoogleSignup = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${location.origin}/api/auth/callback?next=/onboarding` },
    })
  }

  return (
    <div>
      {!isDesktop && (
        <div className="text-center space-y-4 mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-on-primary mx-auto">
            <Icon name="blur_on" size="28px" />
          </div>
          <h1 className="font-headline text-[2.5rem] font-extrabold text-on-surface leading-[1.1] tracking-tighter">
            Create your <span className="text-primary">account.</span>
          </h1>
          <p className="font-body text-on-surface-variant text-base">Start scheduling in under 2 minutes</p>
        </div>
      )}
      {isDesktop && (
        <div className="mb-10">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">Create your account</h1>
          <p className="text-on-surface-variant">Start scheduling in under 2 minutes.</p>
        </div>
      )}
      {error && <div className="bg-error/10 text-error px-4 py-3 rounded-xl text-sm mb-6">{error}</div>}
      <form onSubmit={handleSignup} className="space-y-6">
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Full Name</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors"><Icon name="person" /></div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alexander Pierce" required
              className="w-full pl-14 pr-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 text-on-surface placeholder:text-outline-variant/60 font-body text-lg outline-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors"><Icon name="mail" /></div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required
              className="w-full pl-14 pr-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 text-on-surface placeholder:text-outline-variant/60 font-body text-lg outline-none" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors"><Icon name="lock" /></div>
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={6}
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
        <PrimaryButton type="submit" icon={loading ? undefined : 'arrow_forward'}>
          {loading ? 'Creating account...' : 'Create Account'}
        </PrimaryButton>
      </form>
      <div className="flex items-center gap-4 my-8">
        <div className="h-px flex-grow bg-surface-container-high" />
        <span className="text-[10px] font-label uppercase tracking-widest text-outline">or sign up with</span>
        <div className="h-px flex-grow bg-surface-container-high" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button onClick={handleGoogleSignup} className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm font-medium text-on-surface-variant">
          <Icon name="mail" /> Google
        </button>
        <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm font-medium text-on-surface-variant">
          <Icon name="window" /> Microsoft
        </button>
      </div>
      <p className="text-center mt-8 text-sm text-on-surface-variant">
        Already have an account?{' '}<Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
      </p>
    </div>
  )
}
