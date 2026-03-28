export default function AuthLoading() {
  return (
    <div className="space-y-8 animate-pulse w-full max-w-md">
      <div className="space-y-4 text-center">
        <div className="w-14 h-14 bg-surface-container-high rounded-2xl mx-auto" />
        <div className="h-10 w-48 bg-surface-container-high rounded-xl mx-auto" />
        <div className="h-4 w-36 bg-surface-container-low rounded-full mx-auto" />
      </div>
      <div className="space-y-5">
        <div className="h-16 bg-surface-container-low rounded-2xl" />
        <div className="h-16 bg-surface-container-low rounded-2xl" />
        <div className="h-14 bg-surface-container-high rounded-xl" />
      </div>
    </div>
  )
}
