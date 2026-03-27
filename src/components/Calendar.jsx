import { useState } from 'react'
import Icon from './Icon'

const DAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export default function Calendar({ selectedDates = [], onDateSelect, dark = false }) {
  const [currentMonth] = useState(9) // October (0-indexed)
  const [currentYear] = useState(2023)

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

  const isSelected = (day) => selectedDates.includes(day)

  const textMuted = dark ? 'text-[#acb3b7]/30' : 'text-outline-variant/30'
  const textNormal = dark ? 'text-[#f7f9fb]' : 'text-on-surface'
  const selectedBg = 'bg-primary text-white'
  const hoverBg = dark ? 'hover:bg-[#232b2e]' : 'hover:bg-surface-container-low'

  return (
    <div className={`${dark ? 'bg-[#12181a]' : 'bg-surface-container-lowest'} rounded-xl p-6 ${dark ? 'shadow-2xl' : 'shadow-sm'}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className={`font-headline font-bold text-base ${textNormal}`}>October 2023</h3>
        <div className="flex gap-4">
          <Icon name="chevron_left" className={`${dark ? 'text-[#acb3b7]' : 'text-on-surface-variant'} cursor-pointer`} />
          <Icon name="chevron_right" className={`${textNormal} cursor-pointer`} />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((d) => (
          <div key={d} className={`text-center text-[10px] font-bold ${dark ? 'text-[#acb3b7]' : 'text-outline-variant'} pb-2 uppercase tracking-widest`}>
            {d}
          </div>
        ))}
        {/* Previous month overflow */}
        {Array.from({ length: offset }, (_, i) => (
          <div key={`prev-${i}`} className={`aspect-square flex items-center justify-center ${textMuted} text-sm font-medium`}>
            {daysInPrevMonth - offset + i + 1}
          </div>
        ))}
        {/* Current month */}
        {Array.from({ length: Math.min(daysInMonth, 21) }, (_, i) => {
          const day = i + 1
          const selected = isSelected(day)
          return (
            <button
              key={day}
              onClick={() => onDateSelect?.(day)}
              className={`aspect-square flex items-center justify-center text-sm font-bold rounded-lg transition-colors ${
                selected
                  ? `${selectedBg} shadow-[0_4px_12px_rgba(79,77,207,0.3)]`
                  : `${textNormal} ${hoverBg}`
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
