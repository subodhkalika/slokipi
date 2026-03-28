import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PrimaryButton, SecondaryButton, GhostButton } from '@/components/ui/Button'

describe('PrimaryButton', () => {
  it('renders children text', () => {
    render(<PrimaryButton>Sign In</PrimaryButton>)
    expect(screen.getByText('Sign In')).toBeInTheDocument()
  })

  it('has gradient class', () => {
    render(<PrimaryButton>Click</PrimaryButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('primary-gradient')
  })

  it('renders icon when provided', () => {
    render(<PrimaryButton icon="arrow_forward">Next</PrimaryButton>)
    expect(screen.getByText('arrow_forward')).toBeInTheDocument()
  })

  it('calls onClick handler', () => {
    const handleClick = vi.fn()
    render(<PrimaryButton onClick={handleClick}>Click</PrimaryButton>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('supports submit type', () => {
    render(<PrimaryButton type="submit">Submit</PrimaryButton>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })
})

describe('SecondaryButton', () => {
  it('renders with secondary styling', () => {
    render(<SecondaryButton>Cancel</SecondaryButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('bg-surface-container-high')
  })
})

describe('GhostButton', () => {
  it('renders with ghost styling', () => {
    render(<GhostButton>Skip</GhostButton>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('hover:bg-surface-container-low')
  })
})
