import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useMediaQuery from '@/hooks/useMediaQuery'

describe('useMediaQuery', () => {
  let listeners = []

  beforeEach(() => {
    listeners = []
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 1024px)',
      media: query,
      addEventListener: (_, handler) => listeners.push(handler),
      removeEventListener: vi.fn(),
    }))
  })

  it('returns true for desktop query', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(result.current).toBe(true)
  })

  it('returns false for non-matching query', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
    const { result } = renderHook(() => useMediaQuery('(min-width: 2000px)'))
    expect(result.current).toBe(false)
  })

  it('updates when media query changes', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'))
    expect(result.current).toBe(true)

    act(() => {
      listeners.forEach((l) => l({ matches: false }))
    })
    expect(result.current).toBe(false)
  })
})
