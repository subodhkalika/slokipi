import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import AuthLayout from './layouts/AuthLayout'
import OnboardingLayout from './layouts/OnboardingLayout'
import BookingLayout from './layouts/BookingLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import CalendarView from './pages/CalendarView'
import Availability from './pages/Availability'
import Booking from './pages/Booking'
import BookingForm from './pages/BookingForm'
import BookingDetail from './pages/BookingDetail'
import BookingConfirmation from './pages/BookingConfirmation'
import Reschedule from './pages/Reschedule'
import EventTypes from './pages/EventTypes'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
import Clients from './pages/Clients'
import ClientProfile from './pages/ClientProfile'
import Integrations from './pages/Integrations'
import Billing from './pages/Billing'
import Bookings from './pages/Bookings'
import Notifications from './pages/Notifications'
import Settings from './pages/Settings'

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Onboarding */}
      <Route path="/onboarding" element={<OnboardingLayout />}>
        <Route index element={<Onboarding />} />
      </Route>

      {/* Public booking */}
      <Route path="/book/:username" element={<BookingLayout />}>
        <Route index element={<Booking />} />
        <Route path="confirm" element={<BookingForm />} />
        <Route path="confirmed" element={<BookingConfirmation />} />
      </Route>

      {/* App (authenticated) */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<CalendarView />} />
        <Route path="availability" element={<Availability />} />
        <Route path="events" element={<EventTypes />} />
        <Route path="events/new" element={<CreateEvent />} />
        <Route path="events/:id/edit" element={<EditEvent />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="bookings/:id" element={<BookingDetail />} />
        <Route path="bookings/:id/reschedule" element={<Reschedule />} />
        <Route path="clients" element={<Clients />} />
        <Route path="clients/:id" element={<ClientProfile />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="billing" element={<Billing />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
