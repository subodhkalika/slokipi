'use client'

export default function ProgressBar({ step, totalSteps }) {
  const progress = (step / totalSteps) * 100
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-surface-container-high h-1 rounded-full overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4">
        <span className="font-label text-[10px] uppercase tracking-[0.1em] text-on-surface-variant font-semibold">
          Step {step} of {totalSteps}
        </span>
      </div>
    </div>
  )
}
