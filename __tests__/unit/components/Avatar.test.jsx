import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Avatar from '@/components/ui/Avatar'

describe('Avatar', () => {
  it('renders image when src provided', () => {
    render(<Avatar src="https://example.com/photo.jpg" alt="Alex" />)
    const img = screen.getByAltText('Alex')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg')
  })

  it('renders initial fallback when no src', () => {
    render(<Avatar alt="Sarah" />)
    expect(screen.getByText('S')).toBeInTheDocument()
  })

  it('renders ? when no alt and no src', () => {
    render(<Avatar />)
    expect(screen.getByText('?')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { container } = render(<Avatar alt="A" size="sm" />)
    expect(container.firstChild).toHaveClass('w-6', 'h-6')
  })

  it('applies lg size', () => {
    const { container } = render(<Avatar alt="A" size="lg" />)
    expect(container.firstChild).toHaveClass('w-14', 'h-14')
  })
})
