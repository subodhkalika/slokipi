import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center text-center p-6">
      <h1 className="font-headline text-8xl font-extrabold text-primary/20">404</h1>
      <h2 className="font-headline text-2xl font-extrabold tracking-tight text-on-surface mt-4">Page Not Found</h2>
      <p className="text-on-surface-variant text-sm mt-2 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/dashboard"
        className="mt-8 px-6 py-3 primary-gradient text-on-primary rounded-xl font-semibold inline-flex items-center gap-2">
        Go to Dashboard
      </Link>
    </div>
  )
}
