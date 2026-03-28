'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PrimaryButton } from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ProgressBar from '@/components/ui/ProgressBar'
import Icon from '@/components/ui/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({ name: '', workType: '', url: '' })
  const router = useRouter()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push('/dashboard')
    }
  }

  if (isDesktop) {
    return (
      <section className="max-w-xl w-full">
        <div className="bg-surface-container-lowest p-12 rounded-xl border border-outline-variant/15 shadow-2xl shadow-on-surface/5">
          <div className="mb-10 text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">
              {step === 1 && 'Welcome to Slokipi'}
              {step === 2 && 'Your Work Type'}
              {step === 3 && 'Your Booking URL'}
            </h1>
            <p className="text-on-surface-variant">
              {step === 1 && "Let's start with the basics to personalize your workspace."}
              {step === 2 && 'Help us tailor your scheduling experience.'}
              {step === 3 && 'Choose a custom URL for your booking page.'}
            </p>
          </div>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {step === 1 && (
              <Input
                label="Full Name"
                id="full-name"
                placeholder="E.g. Alexander Pierce"
                icon="person"
                hint="This is how you'll appear to your clients and team."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            )}
            {step === 2 && (
              <div className="space-y-4">
                <label className="block text-xs font-label uppercase tracking-widest text-on-surface-variant font-semibold px-1">
                  Select your role
                </label>
                {['Designer', 'Developer', 'Consultant', 'Manager', 'Other'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setFormData({ ...formData, workType: role })}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all ${
                      formData.workType === role
                        ? 'bg-primary/10 ring-2 ring-primary/20 text-primary font-semibold'
                        : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
            {step === 3 && (
              <Input
                label="Booking URL"
                id="booking-url"
                placeholder="slokipi.com/your-name"
                icon="link"
                hint="Share this link with clients so they can book time with you."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            )}
            <div className="pt-4">
              <PrimaryButton icon="arrow_forward" onClick={handleNext}>
                {step < 3 ? 'Next' : 'Launch Slokipi'}
              </PrimaryButton>
            </div>
          </form>
          {step === 1 && (
            <div className="mt-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-grow bg-surface-container-high" />
                <span className="text-[10px] font-label uppercase tracking-widest text-outline">Quick Setup</span>
                <div className="h-px flex-grow bg-surface-container-high" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm font-medium text-on-surface-variant">
                  <Icon name="mail" />
                  Google
                </button>
                <button className="flex items-center justify-center gap-3 py-3 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors text-sm font-medium text-on-surface-variant">
                  <Icon name="mail" />
                  Work Email
                </button>
              </div>
            </div>
          )}
          <footer className="mt-8 flex justify-between items-center px-2">
            <span className="text-[10px] font-label uppercase tracking-widest text-outline">v2.4.0 — Stable Build</span>
            <div className="flex gap-6">
              <a className="text-[10px] font-label uppercase tracking-widest text-outline hover:text-primary transition-colors" href="#">Privacy Policy</a>
              <a className="text-[10px] font-label uppercase tracking-widest text-outline hover:text-primary transition-colors" href="#">Terms of Flow</a>
            </div>
          </footer>
        </div>
      </section>
    )
  }

  // Mobile layout
  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-12 left-0 right-0 px-8 flex flex-col items-center z-50">
        <ProgressBar step={step} totalSteps={3} />
      </div>

      <main className="w-full max-w-md flex flex-col items-center space-y-12">
        {/* Brand & Headline */}
        <header className="text-center space-y-4">
          <h1 className="font-headline text-[3rem] font-extrabold text-on-surface leading-[1.1] tracking-tighter">
            {step === 1 && <>Welcome to <span className="text-primary">Slokipi.</span></>}
            {step === 2 && <>What do you <span className="text-primary">do?</span></>}
            {step === 3 && <>Your booking <span className="text-primary">link.</span></>}
          </h1>
          <p className="font-body text-on-surface-variant text-base leading-relaxed max-w-[280px] mx-auto">
            {step === 1 && "Let's set up your frictionless scheduling experience in just a few taps."}
            {step === 2 && 'Select your primary work type to customize your experience.'}
            {step === 3 && 'Choose a URL that clients will use to book time with you.'}
          </p>
        </header>

        {/* Visual Anchor (Step 1 only) */}
        {step === 1 && (
          <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden relative bg-surface-container-low shadow-sm group">
            <div className="w-full h-full bg-gradient-to-br from-surface-container-low to-surface-container flex items-center justify-center">
              <Icon name="calendar_today" className="text-primary/30" size="120px" />
            </div>
            <div className="absolute bottom-6 right-6 glass-card p-4 rounded-2xl shadow-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="event_available" />
              </div>
              <div>
                <div className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant opacity-60">Status</div>
                <div className="font-body text-sm font-semibold text-on-surface">System Ready</div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <section className="w-full space-y-8">
          {step === 1 && (
            <Input
              label="Full Name"
              id="full-name"
              placeholder="How should we call you?"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          )}
          {step === 2 && (
            <div className="space-y-3">
              {['Designer', 'Developer', 'Consultant', 'Manager', 'Other'].map((role) => (
                <button
                  key={role}
                  onClick={() => setFormData({ ...formData, workType: role })}
                  className={`w-full text-left px-6 py-5 rounded-2xl transition-all font-body text-lg ${
                    formData.workType === role
                      ? 'bg-primary/10 ring-2 ring-primary/20 text-primary font-semibold'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
          {step === 3 && (
            <Input
              label="Booking URL"
              id="booking-url"
              placeholder="slokipi.com/your-name"
              icon="link"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            />
          )}

          <div className="pt-4">
            <PrimaryButton icon="arrow_forward" onClick={handleNext}>
              {step === 1 && 'Next: My Work Type'}
              {step === 2 && 'Next: Booking Link'}
              {step === 3 && 'Launch Slokipi'}
            </PrimaryButton>
            <p className="text-center mt-6 font-label text-[11px] text-on-surface-variant/60 tracking-wide">
              By continuing, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a>.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
