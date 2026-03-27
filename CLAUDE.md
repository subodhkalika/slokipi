# Slokipi

A premium scheduling SaaS application built with React 19, Vite 6, and Tailwind CSS. Designs sourced from Google Stitch using the "Atmospheric Precision" design system.

## Self-Maintenance Rule

**This file must be kept in sync with the codebase.** After any session that adds, removes, or renames pages, components, routes, dependencies, or design tokens, update the relevant sections of this file before ending your response. Specifically:

- **New page/component added** → update Architecture tables and Routing section
- **Route changed** → update Routing section
- **Dependency added/removed** → update Stack section
- **Design token changed** → update Design System section
- **New pattern established** → update Patterns section
- **New hook created** → update Hooks section
- **Key architectural decision made** → update Key Decisions section

If unsure whether a change is significant enough, update anyway — stale docs are worse than verbose docs.

## Stack

- **Framework:** React 19 + Vite 6 (ES modules)
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS 3.4 with extensive custom theme
- **Icons:** Material Symbols Outlined (loaded via Google Fonts CDN)
- **Typography:** Manrope (headlines) + Inter (body/labels) via Google Fonts
- **Build:** Vite with `@vitejs/plugin-react`

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build to dist/
npm run preview   # Preview production build
```

No test runner is configured yet.

## Architecture

### Directory Structure

```
src/
├── main.jsx              # Entry point, mounts BrowserRouter
├── App.jsx               # Route definitions
├── styles/index.css      # Tailwind directives + custom utilities
├── components/           # 9 reusable UI components
├── hooks/                # Custom React hooks
├── layouts/              # 4 layout shells (Auth, App, Booking, Onboarding)
└── pages/                # 23 page components
```

### Layouts

| Layout | Routes | Purpose |
|--------|--------|---------|
| `AuthLayout` | `/login`, `/signup`, `/forgot-password`, `/reset-password` | Split-panel desktop / centered mobile for auth |
| `OnboardingLayout` | `/onboarding` | Editorial sidebar + centered card with progress |
| `AppLayout` | All `/dashboard`, `/calendar`, `/events/*`, etc. | Sidebar + top bar (desktop), bottom nav (mobile) |
| `BookingLayout` | `/book/:username/*` | Dark-themed public booking pages |

### Routing

**Auth:** `/login` `/signup` `/forgot-password` `/reset-password`
**Onboarding:** `/onboarding`
**Public booking:** `/book/:username` `/book/:username/confirm` `/book/:username/confirmed`
**App (authenticated):**
- `/dashboard` `/calendar` `/availability`
- `/events` `/events/new` `/events/:id/edit`
- `/bookings` `/bookings/:id` `/bookings/:id/reschedule`
- `/clients` `/clients/:id`
- `/integrations` `/billing` `/notifications` `/settings`

### Components

| Component | Export | Purpose |
|-----------|--------|---------|
| `Icon` | default | Wraps Material Symbols Outlined, supports `filled` prop |
| `Button` | `PrimaryButton`, `SecondaryButton`, `GhostButton` | Three button variants with gradient/secondary/ghost styles |
| `Input` | default | Form input with icon, label, hint |
| `Avatar` | default | Profile image with initials fallback, sizes: sm/md/lg |
| `Calendar` | default | Interactive month calendar with date selection, supports dark mode |
| `TimeSlotChip` | default | Selectable time slot button, supports dark mode |
| `StatCard` | default | Dashboard metric card with icon and value |
| `BookingCard` | default | Booking list item with participants and time info |
| `ProgressBar` | default | Step progress indicator for onboarding |

### Hooks

- `useMediaQuery(query)` — Returns boolean for responsive breakpoints. Primary breakpoint: `(min-width: 1024px)` for desktop.

## Design System ("Atmospheric Precision")

Sourced from Google Stitch project `projects/10142851581637014681`.

### Core Principles

- **No borders.** Use tonal surface shifts and spacing to define sections.
- **Gradient CTAs.** Primary buttons use `linear-gradient(135deg, #4f4dcf, #7777fa)`.
- **Glassmorphism.** Headers use `backdrop-blur: 20px` with semi-transparent backgrounds.
- **Tonal layering.** Surface hierarchy: `surface` > `surface-container-low` > `surface-container-lowest` for depth.

### Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#4f4dcf` | CTAs, active states, links |
| `primary-container` | `#7777fa` | Gradient endpoint, chips |
| `secondary` | `#526074` | Secondary text, muted elements |
| `tertiary` | `#755478` | Focus time, alternate accents |
| `error` | `#a8364b` | Error states, destructive actions |
| `surface` | `#f7f9fb` | Page background |
| `surface-container-low` | `#f0f4f7` | Sidebars, recessed areas |
| `surface-container-lowest` | `#ffffff` | Elevated cards |
| `on-surface` | `#2c3437` | Primary text (never pure black) |
| `on-surface-variant` | `#596064` | Secondary text |
| `outline-variant` | `#acb3b7` | Ghost borders at 15% opacity |

### Dark Mode (Booking pages)

Applied via inline styles (not Tailwind dark mode class):
- Background: `#0b0f10`
- Surface: `#12181a` / `#1a2124` / `#232b2e`
- Text: `#f7f9fb` (primary), `#acb3b7` (muted)

### Typography

- **Headlines:** `font-headline` (Manrope) — extrabold, tight tracking (-0.02em)
- **Body:** `font-body` (Inter) — regular/medium, 1.5x line-height
- **Labels:** `font-label` (Inter) — uppercase, +0.05em tracking, 10-11px

### Spacing & Radius

- Inputs/cards: `rounded-2xl` (2rem)
- Standard cards: `rounded-xl` (1.5rem)
- Chips: `rounded-lg` (1rem)
- Large containers: `rounded-[2rem]` or `rounded-[2.5rem]`

### Custom CSS Utilities (index.css)

- `.primary-gradient` — CTA gradient background
- `.glass-header` / `.glass-header-dark` — Blur header overlays
- `.glass-card` — Semi-transparent card with blur
- `.ambient-blur-primary` / `.ambient-blur-tertiary` — Decorative background blobs

## Patterns

### Responsive Design

All pages use `useMediaQuery('(min-width: 1024px)')` for desktop detection. Mobile-first approach:
- Mobile: stacked layouts, bottom nav, fixed CTAs
- Desktop: sidebar nav, multi-column grids, inline actions

### Page Structure

Pages follow a consistent pattern:
```jsx
export default function PageName() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  // state management with useState
  return (
    <div className="space-y-8">
      {/* Header section */}
      {/* Content (grid on desktop, stack on mobile) */}
      {/* Fixed bottom CTA on mobile */}
    </div>
  )
}
```

### State Management

All state is local (React `useState`). No global state, context, or external store. Data is hardcoded/mocked — no backend API integration yet.

### Navigation

Desktop sidebar: 10 items (Dashboard, Calendar, Availability, Event Types, Bookings, Clients, Integrations, Billing, Notifications, Settings).
Mobile bottom nav: 4 items (Home, Calendar, Events, Settings).

## Stitch Integration

Designs are managed in Google Stitch project ID `10142851581637014681`. The project contains ~40 screens (mobile + desktop pairs) covering all pages. Design system asset: `assets/970c6067d6404677857b7e039600cf90`.

## Key Decisions

- **No backend yet.** All data is mocked with hardcoded arrays in page components.
- **No auth state.** Navigation between auth/app routes is direct (no guards).
- **Dark mode is page-scoped.** Only `/book/*` routes use dark theme, applied via inline styles rather than Tailwind's `dark:` class.
- **Material Symbols over icon library.** Icons loaded from Google Fonts CDN, wrapped by the `Icon` component using font variation settings.
