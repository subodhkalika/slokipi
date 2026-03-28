'use client'

import Icon from '@/components/ui/Icon'

export function PrimaryButton({ children, icon, onClick, className = '', type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-5 primary-gradient text-on-primary font-headline font-bold text-base rounded-xl shadow-lg shadow-primary/20 hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${className}`}
    >
      <span>{children}</span>
      {icon && <Icon name={icon} className="text-xl" />}
    </button>
  )
}

export function SecondaryButton({ children, icon, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 bg-surface-container-high rounded-xl text-on-surface font-semibold hover:bg-surface-variant transition-all ${className}`}
    >
      {icon && <Icon name={icon} className="mr-2" />}
      {children}
    </button>
  )
}

export function GhostButton({ children, icon, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`text-on-surface hover:bg-surface-container-low px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${className}`}
    >
      {icon && <Icon name={icon} />}
      {children}
    </button>
  )
}
