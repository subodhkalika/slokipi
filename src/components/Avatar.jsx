export default function Avatar({ src, alt, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }
  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden bg-surface-container-high flex-shrink-0 ${className}`}>
      {src ? (
        <img src={src} alt={alt || ''} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-xs font-bold">
          {alt?.charAt(0) || '?'}
        </div>
      )}
    </div>
  )
}
