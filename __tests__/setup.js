import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    refresh: vi.fn(),
    replace: vi.fn(),
  }),
  usePathname: () => '/dashboard',
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }) => {
    const React = require('react')
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query === '(min-width: 1024px)',
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
