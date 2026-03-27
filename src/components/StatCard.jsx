import Icon from './Icon'

export default function StatCard({ label, value, unit, icon, iconColor = 'text-primary', hoverColor = 'hover:bg-primary/5' }) {
  return (
    <div className={`bg-surface-container-lowest p-5 lg:p-8 rounded-xl lg:rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col gap-1 lg:justify-between lg:h-48 group ${hoverColor} transition-colors`}>
      <div className="flex justify-between items-start">
        <div className="hidden lg:block p-3 bg-primary/10 rounded-2xl">
          <Icon name={icon || 'today'} className={iconColor} />
        </div>
        <span className="font-label text-[10px] uppercase tracking-[0.05em] font-semibold text-outline">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-headline font-extrabold text-2xl lg:text-4xl text-on-surface">{value}</span>
        <span className="font-body text-sm text-on-surface-variant">{unit}</span>
      </div>
    </div>
  )
}
