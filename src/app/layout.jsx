import { Manrope, Inter } from 'next/font/google'
import Providers from './providers'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-headline',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Slokipi',
    template: '%s | Slokipi',
  },
  description: 'Premium scheduling with atmospheric precision',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-background text-on-surface">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
