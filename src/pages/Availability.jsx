import { useState } from 'react'
import Calendar from '../components/Calendar'
import Icon from '../components/Icon'
import { PrimaryButton } from '../components/Button'
import useMediaQuery from '../hooks/useMediaQuery'

const INITIAL_SELECTED = [5, 6, 7, 11, 12, 13, 17, 18, 19]

export default function Availability() {
  const [selectedDates, setSelectedDates] = useState(INITIAL_SELECTED)
  const [startTime] = useState('09:00 AM')
  const [endTime] = useState('05:00 PM')
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const toggleDate = (day) => {
    setSelectedDates((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  return (
    <div className="space-y-8">
      {/* Desktop hero */}
      {isDesktop && (
        <section className="flex justify-between items-end gap-8">
          <div>
            <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold text-primary">Schedule</span>
            <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface font-headline">Your Availability</h1>
            <p className="text-on-surface-variant mt-2">Define when clients can book time with you.</p>
          </div>
          <PrimaryButton icon="check" className="w-auto px-8">
            Save Availability
          </PrimaryButton>
        </section>
      )}

      <div className={isDesktop ? 'grid grid-cols-2 gap-8' : 'space-y-8'}>
        {/* Calendar Section */}
        <section className="space-y-4">
          {!isDesktop && (
            <div className="flex justify-between items-end">
              <div>
                <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold text-primary">Schedule</span>
                <h2 className="text-2xl font-extrabold tracking-tighter text-on-surface">Select active days</h2>
              </div>
              <div className="flex gap-2 text-on-surface-variant font-medium text-sm">
                <span>October</span>
                <Icon name="expand_more" className="text-sm" />
              </div>
            </div>
          )}
          <Calendar selectedDates={selectedDates} onDateSelect={toggleDate} />
        </section>

        {/* Time Slots & Config */}
        <div className="space-y-6">
          {/* Time block section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-on-surface font-headline">
                {isDesktop ? 'Working Hours' : 'Time blocks for Oct 4'}
              </h3>
              <button className="text-primary font-semibold text-sm flex items-center gap-1">
                <Icon name="add_circle" className="text-lg" />
                Add block
              </button>
            </div>

            {/* Time Block Card */}
            <div className="bg-surface-container-lowest rounded-xl p-5 space-y-6 relative overflow-hidden border border-outline-variant/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="font-label text-[10px] uppercase text-outline-variant">Start Time</span>
                    <span className="text-xl font-headline font-bold">{startTime}</span>
                  </div>
                  <div className="h-8 w-[1px] bg-surface-container-high" />
                  <div className="flex flex-col">
                    <span className="font-label text-[10px] uppercase text-outline-variant">End Time</span>
                    <span className="text-xl font-headline font-bold">{endTime}</span>
                  </div>
                </div>
                <button className="text-error/60 hover:text-error transition-colors">
                  <Icon name="delete" />
                </button>
              </div>

              {/* Slider */}
              <div className="relative h-12 flex items-center">
                <div className="absolute inset-0 h-2 my-auto bg-surface-container rounded-full" />
                <div className="absolute left-[10%] right-[20%] h-2 my-auto bg-primary rounded-full" />
                <div className="absolute left-[10%] -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-lg cursor-grab" />
                <div className="absolute right-[20%] translate-x-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full shadow-lg cursor-grab" />
              </div>
            </div>
          </section>

          {/* Smart Suggestion */}
          <div className="bg-tertiary-container/40 rounded-xl p-4 flex items-start gap-3 border border-tertiary/10">
            <Icon name="lightbulb" className="text-tertiary mt-0.5" />
            <p className="text-sm font-medium text-on-tertiary-container leading-relaxed">
              You seem free in the afternoons — want to suggest these slots for your clients?
            </p>
          </div>

          {/* Advanced Settings (Desktop) */}
          {isDesktop && (
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-on-surface font-headline">Advanced Scheduling</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon name="timer" className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface text-sm">Buffer Time</h4>
                      <p className="text-xs text-on-surface-variant">Between meetings</p>
                    </div>
                  </div>
                  <select className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>45 minutes</option>
                  </select>
                </div>
                <div className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center">
                      <Icon name="do_not_disturb_on" className="text-tertiary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-on-surface text-sm">Focus Blocks</h4>
                      <p className="text-xs text-on-surface-variant">Protected deep work</p>
                    </div>
                  </div>
                  <select className="w-full bg-surface-container-low border-none rounded-lg py-3 px-4 text-sm text-on-surface outline-none focus:ring-2 focus:ring-primary/20">
                    <option>Morning (9-12)</option>
                    <option>Afternoon (1-5)</option>
                    <option>None</option>
                  </select>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Fixed Save Button (Mobile) */}
      {!isDesktop && (
        <div className="fixed bottom-20 left-0 w-full p-6 bg-white/90 backdrop-blur-2xl z-40">
          <PrimaryButton>Save Availability</PrimaryButton>
        </div>
      )}
    </div>
  )
}
