import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TimeSlotChip from '@/components/ui/TimeSlotChip'

describe('TimeSlotChip', () => {
  it('renders time text', () => {
    render(<TimeSlotChip time="09:00 AM" />)
    expect(screen.getByText('09:00 AM')).toBeInTheDocument()
  })

  it('applies selected styles when selected', () => {
    render(<TimeSlotChip time="10:30 AM" selected />)
    const chip = screen.getByRole('button')
    expect(chip).toHaveClass('ring-2')
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<TimeSlotChip time="11:00 AM" onClick={onClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies dark mode styles', () => {
    render(<TimeSlotChip time="02:00 PM" dark />)
    const chip = screen.getByRole('button')
    expect(chip).toHaveClass('bg-[#1a2124]')
  })

  it('applies dark selected styles', () => {
    render(<TimeSlotChip time="03:00 PM" dark selected />)
    const chip = screen.getByRole('button')
    expect(chip).toHaveClass('bg-primary-container/10')
  })
})
