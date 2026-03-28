'use client'

import useMediaQuery from '@/hooks/useMediaQuery'

export default function OnboardingLayout({ children }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  if (isDesktop) {
    return (
      <div className="bg-surface font-body text-on-surface antialiased min-h-screen relative flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0 bg-surface-container-low opacity-50" />
        <header className="flex justify-between items-center w-full px-12 py-8 z-20 sticky top-0">
          <span className="font-headline text-2xl font-extrabold tracking-tighter text-on-surface">Slokipi</span>
          <div className="flex items-center gap-6">
            <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant font-medium">Step 01 of 04</span>
            <div className="h-1 w-48 bg-surface-container-high rounded-full overflow-hidden">
              <div className="h-full bg-primary-container w-1/4 rounded-full" />
            </div>
          </div>
        </header>
        <main className="flex-grow flex items-center justify-center z-10 px-6 relative">
          <div className="absolute left-16 top-1/2 -translate-y-1/2 hidden xl:block max-w-sm">
            <h2 className="font-headline text-6xl font-extrabold tracking-tight leading-none text-on-surface mb-6">Atmospheric Precision.</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed">Design your schedule with the frictionless utility of a high-end ritual.</p>
          </div>
          {children}
        </main>
        <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none z-0" />
      </div>
    )
  }

  return (
    <div className="bg-background text-on-surface font-body min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 overflow-x-hidden">
      <div className="ambient-blur-primary" />
      <div className="ambient-blur-tertiary" />
      {children}
    </div>
  )
}
