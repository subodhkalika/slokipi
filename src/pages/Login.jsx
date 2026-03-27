import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PrimaryButton } from '../components/Button'
import Icon from '../components/Icon'
import useMediaQuery from '../hooks/useMediaQuery'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className={isDesktop ? '' : 'space-y-8'}>
      {/* Mobile brand */}
      {!isDesktop && (
        <div className="text-center space-y-4 mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-on-primary mx-auto">
            <Icon name="blur_on" size="28px" />
          </div>
          <h1 className="font-headline text-[2.5rem] font-extrabold text-on-surface leading-[1.1] tracking-tighter">
            Welcome <span className="text-primary">back.</span>
          </h1>
          <p className="font-body text-on-surface-variant text-base">Sign in to your Slokipi account</p>
        </div>
      )}

      {/* Desktop heading */}
      {isDesktop && (
        <div className="mb-10">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">Welcome back</h1>
          <p className="text-on-surface-variant">Sign in to continue to your dashboard.</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
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

        {/* Password */}
        <div className="space-y-2">
          <label className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface-variant ml-1">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors">
              <Icon name="lock" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-14 pr-14 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 text-on-surface placeholder:text-outline-variant/60 font-body text-lg outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-5 flex items-center text-outline-variant hover:text-primary transition-colors"
            >
              <Icon name={showPassword ? 'visibility_off' : 'visibility'} />
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-primary font-medium hover:underline">
            Forgot password?
          </Link>
        </div>

        <PrimaryButton type="submit" icon="arrow_forward">
          Sign In
        </PrimaryButton>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px flex-grow bg-surface-container-high" />
        <span className="text-[10px] font-label uppercase tracking-widest text-outline">or continue with</span>
        <div className="h-px flex-grow bg-surface-container-high" />
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm font-medium text-on-surface-variant">
          <Icon name="mail" />
          Google
        </button>
        <button className="flex items-center justify-center gap-3 py-4 px-4 rounded-2xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm font-medium text-on-surface-variant">
          <Icon name="window" />
          Microsoft
        </button>
      </div>

      {/* Footer */}
      <p className="text-center mt-8 text-sm text-on-surface-variant">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary font-semibold hover:underline">Sign up</Link>
      </p>
    </div>
  )
}
