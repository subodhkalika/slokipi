export default function BookingLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-3">
        <div className="h-8 w-72 rounded-xl" style={{ backgroundColor: '#1a2124' }} />
        <div className="h-4 w-56 rounded-full" style={{ backgroundColor: '#12181a' }} />
      </div>
      <div className="rounded-xl p-6" style={{ backgroundColor: '#12181a' }}>
        <div className="h-6 w-32 rounded-full mb-4" style={{ backgroundColor: '#1a2124' }} />
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 21 }, (_, i) => (
            <div key={i} className="aspect-square rounded-lg" style={{ backgroundColor: '#1a2124' }} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-14 rounded-lg" style={{ backgroundColor: '#1a2124' }} />
        ))}
      </div>
    </div>
  )
}
