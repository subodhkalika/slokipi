'use client'

import { useState } from 'react'
import Icon from '@/components/ui/Icon'
import useMediaQuery from '@/hooks/useMediaQuery'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DATES = [9, 10, 11, 12, 13, 14, 15]
const HOURS = Array.from({ length: 11 }, (_, i) => i + 8) // 8 AM to 6 PM

const MOCK_EVENTS = [
  { title: 'Strategy Call', day: 2, startHour: 10, duration: 1.5, color: 'bg-primary/10', borderColor: 'border-primary', textColor: 'text-primary' },
  { title: 'Client Onboarding', day: 2, startHour: 13, duration: 1, color: 'bg-primary/15', borderColor: 'border-primary', textColor: 'text-primary' },
  { title: 'Design Review', day: 3, startHour: 9, duration: 1, color: 'bg-tertiary/10', borderColor: 'border-tertiary', textColor: 'text-tertiary' },
  { title: 'Coffee Chat', day: 4, startHour: 16, duration: 0.25, color: 'bg-secondary/10', borderColor: 'border-secondary', textColor: 'text-secondary' },
]

export default function CalendarView({ initialEvents = [] }) {
  const EVENTS = initialEvents.length > 0 ? initialEvents : MOCK_EVENTS
  const [selectedDay, setSelectedDay] = useState(2) // Wednesday
  const [view, setView] = useState('week')
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const today = 2 // Wednesday index

  // Mobile: day view
  if (!isDesktop) {
    const dayEvents = EVENTS.filter((e) => e.day === selectedDay)

    return (
      <div className="space-y-6 -mt-2">
        {/* Date strip */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
          {DAYS.map((day, i) => (
            <button
              key={day}
              onClick={() => setSelectedDay(i)}
              className={`flex flex-col items-center px-4 py-3 rounded-2xl min-w-[56px] transition-all ${
                selectedDay === i
                  ? 'primary-gradient text-on-primary shadow-lg shadow-primary/20'
                  : i === today
                    ? 'bg-primary/10 text-primary'
                    : 'bg-surface-container-lowest text-on-surface-variant'
              }`}
            >
              <span className="text-[10px] font-label uppercase tracking-wider font-semibold">{day}</span>
              <span className="text-lg font-headline font-bold mt-1">{DATES[i]}</span>
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative">
          {HOURS.map((hour) => {
            const event = dayEvents.find((e) => Math.floor(e.startHour) === hour)
            return (
              <div key={hour} className="flex gap-4 min-h-[60px]">
                <div className="w-14 flex-shrink-0 text-right">
                  <span className="text-[10px] font-label text-on-surface-variant font-medium">
                    {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                  </span>
                </div>
                <div className={`flex-1 relative ${hour % 2 === 0 ? 'bg-surface-container-low/50' : ''} rounded-lg min-h-[60px]`}>
                  {event && (
                    <div className={`absolute inset-x-0 top-0 ${event.color} border-l-4 ${event.borderColor} rounded-lg p-3 z-10`}
                      style={{ height: `${event.duration * 60}px` }}>
                      <h4 className={`text-sm font-semibold ${event.textColor}`}>{event.title}</h4>
                      <p className="text-[10px] text-on-surface-variant mt-0.5">
                        {event.startHour > 12 ? event.startHour - 12 : event.startHour}:00 {event.startHour >= 12 ? 'PM' : 'AM'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* FAB */}
        <button className="fixed bottom-28 right-6 w-14 h-14 primary-gradient rounded-full shadow-xl shadow-primary/30 flex items-center justify-center z-40">
          <Icon name="add" className="text-white" size="28px" />
        </button>
      </div>
    )
  }

  // Desktop: full week view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Calendar</h1>
          <p className="text-on-surface-variant mt-1">October 2023</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-surface-container-low rounded-xl overflow-hidden">
            {['Day', 'Week', 'Month'].map((v) => (
              <button key={v} onClick={() => setView(v.toLowerCase())}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  view === v.toLowerCase() ? 'primary-gradient text-white' : 'text-on-surface-variant hover:text-on-surface'
                }`}>
                {v}
              </button>
            ))}
          </div>
          <button className="px-4 py-2 bg-surface-container-lowest rounded-xl text-sm font-medium text-on-surface border border-outline-variant/10">
            Today
          </button>
          <div className="flex gap-1">
            <button className="p-2 rounded-lg hover:bg-surface-container-low"><Icon name="chevron_left" className="text-on-surface-variant" /></button>
            <button className="p-2 rounded-lg hover:bg-surface-container-low"><Icon name="chevron_right" className="text-on-surface-variant" /></button>
          </div>
        </div>
      </div>

      {/* Week Grid */}
      <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/10">
        {/* Day headers */}
        <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-outline-variant/10">
          <div className="p-3" />
          {DAYS.map((day, i) => (
            <div key={day} className={`p-3 text-center ${i === today ? 'bg-primary/5' : ''}`}>
              <span className="text-[10px] font-label uppercase tracking-wider text-on-surface-variant">{day}</span>
              <div className={`text-lg font-headline font-bold mt-1 ${i === today ? 'text-primary' : 'text-on-surface'}`}>
                {DATES[i]}
              </div>
            </div>
          ))}
        </div>

        {/* Time grid */}
        <div className="grid grid-cols-[80px_repeat(7,1fr)] relative">
          {HOURS.map((hour) => (
            <div key={hour} className="contents">
              <div className="p-2 text-right pr-4 h-16 flex items-start justify-end">
                <span className="text-[10px] font-label text-on-surface-variant font-medium -mt-2">
                  {hour > 12 ? hour - 12 : hour} {hour >= 12 ? 'PM' : 'AM'}
                </span>
              </div>
              {DAYS.map((_, dayIdx) => {
                const event = EVENTS.find((e) => e.day === dayIdx && Math.floor(e.startHour) === hour)
                return (
                  <div key={dayIdx} className={`relative h-16 ${hour % 2 === 0 ? 'bg-surface-container-low/30' : ''} ${dayIdx === today ? 'bg-primary/[0.02]' : ''}`}>
                    {event && (
                      <div className={`absolute inset-x-1 top-0 ${event.color} border-l-4 ${event.borderColor} rounded-lg p-2 z-10 cursor-pointer hover:shadow-md transition-shadow`}
                        style={{ height: `${event.duration * 64}px` }}>
                        <h4 className={`text-xs font-semibold ${event.textColor} truncate`}>{event.title}</h4>
                        <p className="text-[10px] text-on-surface-variant mt-0.5">
                          {event.startHour > 12 ? event.startHour - 12 : event.startHour}:00 {event.startHour >= 12 ? 'PM' : 'AM'}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}

          {/* Current time indicator */}
          <div className="absolute left-[80px] right-0 z-20 pointer-events-none" style={{ top: `${((10.5 - 8) / 11) * 100}%` }}>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-error rounded-full -ml-1" />
              <div className="flex-1 h-[2px] bg-error" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
