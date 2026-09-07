import { Providers } from './providers'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CodeMentor AI',
  description: 'AI-powered DSA learning platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
