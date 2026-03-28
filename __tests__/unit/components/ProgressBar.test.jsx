import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ProgressBar from '@/components/ui/ProgressBar'

describe('ProgressBar', () => {
  it('shows correct step text', () => {
    render(<ProgressBar step={2} totalSteps={4} />)
    expect(screen.getByText('Step 2 of 4')).toBeInTheDocument()
  })

  it('sets correct width for progress', () => {
    const { container } = render(<ProgressBar step={1} totalSteps={3} />)
    const bar = container.querySelector('.bg-primary')
    expect(bar.style.width).toContain('33.33')
  })

  it('shows 100% at last step', () => {
    const { container } = render(<ProgressBar step={3} totalSteps={3} />)
    const bar = container.querySelector('.bg-primary')
    expect(bar.style.width).toBe('100%')
  })
})
