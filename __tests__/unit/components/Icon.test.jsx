import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Icon from '@/components/ui/Icon'

describe('Icon', () => {
  it('renders material symbol with correct name', () => {
    render(<Icon name="calendar_today" />)
    const icon = screen.getByText('calendar_today')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveClass('material-symbols-outlined')
  })

  it('applies filled style when filled prop is true', () => {
    render(<Icon name="home" filled />)
    const icon = screen.getByText('home')
    expect(icon.style.fontVariationSettings).toContain("'FILL' 1")
  })

  it('applies custom className', () => {
    render(<Icon name="settings" className="text-primary" />)
    expect(screen.getByText('settings')).toHaveClass('text-primary')
  })

  it('applies custom size', () => {
    render(<Icon name="star" size="32px" />)
    expect(screen.getByText('star').style.fontSize).toBe('32px')
  })
})
