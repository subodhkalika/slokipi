export default function TimeSlotChip({ time, selected, onClick, dark = false }) {
  const base = dark
    ? selected
      ? 'bg-primary-container/10 border-primary/40 text-primary-container ring-2 ring-primary/20 font-semibold'
      : 'bg-[#1a2124] hover:bg-[#232b2e] border-transparent hover:border-[rgba(172,179,183,0.15)] text-[#f7f9fb]'
    : selected
      ? 'bg-primary/10 border-primary/40 text-primary ring-2 ring-primary/20 font-semibold'
      : 'bg-surface-container-low hover:bg-surface-container border-transparent hover:border-outline-variant text-on-surface'

  return (
    <button
      onClick={onClick}
      className={`py-4 px-2 rounded-lg transition-all text-sm font-medium border text-center active:scale-95 duration-200 ${base}`}
    >
      {time}
    </button>
  )
}
