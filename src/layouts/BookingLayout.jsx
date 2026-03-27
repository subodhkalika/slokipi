import { Outlet } from 'react-router-dom'
import Icon from '../components/Icon'
import Avatar from '../components/Avatar'

export default function BookingLayout() {
  return (
    <div className="min-h-screen font-body selection:bg-primary/30" style={{ backgroundColor: '#0b0f10', color: '#f7f9fb' }}>
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-header-dark px-6 py-5 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar alt="Alex Reed" size="md" className="ring-2 ring-primary/20" />
          <div>
            <h1 className="font-headline font-bold tracking-tight text-sm" style={{ color: '#f7f9fb' }}>Alex Reed</h1>
            <p className="text-xs font-medium" style={{ color: '#acb3b7' }}>Design Consultant</p>
          </div>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full" style={{ backgroundColor: '#1a2124', color: '#acb3b7' }}>
          <Icon name="close" />
        </button>
      </header>

      <main className="pt-24 pb-32 px-6 max-w-md mx-auto lg:max-w-4xl min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
