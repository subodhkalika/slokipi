import Icon from './Icon'
import Avatar from './Avatar'

export default function BookingCard({ title, time, icon, iconBg, iconColor, participants = [], timeSlot }) {
  return (
    <div className="bg-surface-container-lowest p-4 lg:p-6 rounded-xl flex items-center justify-between group hover:bg-surface transition-colors cursor-pointer">
      <div className="flex items-center gap-4 lg:gap-6 flex-1 min-w-0">
        {/* Date block (desktop) */}
        {timeSlot && (
          <div className="hidden lg:flex flex-shrink-0 w-14 h-14 bg-surface-container-low rounded-2xl flex-col items-center justify-center text-on-surface-variant">
            <span className="text-[10px] font-bold uppercase tracking-tighter">{timeSlot.month}</span>
            <span className="text-xl font-extrabold leading-none text-on-surface">{timeSlot.day}</span>
          </div>
        )}
        {/* Icon (mobile) */}
        <div className={`lg:hidden w-12 h-12 rounded-lg ${iconBg || 'bg-surface-container-low'} flex items-center justify-center flex-shrink-0`}>
          <Icon name={icon || 'event'} className={iconColor || 'text-primary'} />
        </div>
        <div className="min-w-0">
          <h3 className="font-body font-semibold text-on-surface lg:text-lg truncate">{title}</h3>
          <p className="font-body text-xs text-on-surface-variant mt-0.5">{time}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 lg:gap-12 flex-shrink-0">
        {/* Time slot chips (desktop) */}
        {timeSlot?.start && (
          <div className="hidden lg:block">
            <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant opacity-60 font-label mb-1">Time Slot</div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-sm font-medium rounded-lg">{timeSlot.start}</div>
              <span className="text-on-surface-variant opacity-40">&mdash;</span>
              <div className="px-3 py-1 bg-surface-container-low text-on-surface-variant text-sm font-medium rounded-lg">{timeSlot.end}</div>
            </div>
          </div>
        )}
        {/* Participants */}
        <div className="flex -space-x-2">
          {participants.map((p, i) => (
            <Avatar key={i} src={p.avatar} alt={p.name} size="sm" className="border-2 border-white" />
          ))}
          {participants.length > 2 && (
            <div className="w-6 h-6 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold text-on-surface-variant">
              +{participants.length - 2}
            </div>
          )}
        </div>
        {/* Chevron (desktop) */}
        <button className="hidden lg:flex w-10 h-10 items-center justify-center rounded-full text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity hover:bg-surface-container-high">
          <Icon name="chevron_right" />
        </button>
      </div>
    </div>
  )
}
