import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Run Kitak Run! | i-CATS UC Staff Challenge 2026',
  description:
    'The ultimate team distance challenge for i-CATS UC staff. Run Together. Win Together. 18 July 2026 — Sarawak Botanical Garden, Kuching.',
  keywords: ['Run Kitak Run', 'i-CATS UC', 'Kuching', 'team running', 'Sarawak', 'INSPIRE'],
  openGraph: {
    title: 'Run Kitak Run! | i-CATS UC',
    description:
      'Join the ultimate team distance challenge. 18 July 2026 — Sarawak Botanical Garden, Kuching.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-kitak-dark text-white antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
