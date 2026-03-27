import Icon from './Icon'

export default function Input({ label, id, placeholder, icon, hint, type = 'text', value, onChange }) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={id}
          className="block font-label text-[11px] uppercase tracking-[0.05em] font-bold text-on-surface ml-1"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-outline-variant group-focus-within:text-primary transition-colors">
            <Icon name={icon} />
          </div>
        )}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full ${icon ? 'pl-14' : 'px-6'} pr-6 py-5 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 text-on-surface placeholder:text-outline-variant/60 font-body text-lg outline-none`}
        />
        {!icon && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors">
            <Icon name="person" />
          </div>
        )}
      </div>
      {hint && (
        <p className="text-[10px] text-outline px-1">{hint}</p>
      )}
    </div>
  )
}
