'use client'

import Link from 'next/link'
import RegistrationForm from '@/components/RegistrationForm'
import WhatsAppButton from '@/components/WhatsAppButton'
import SiteHeader from '@/components/SiteHeader'
import { useLanguage } from '@/lib/i18n'

export default function RegisterPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-kitak-dark">
      <SiteHeader />
      <div className="px-4 py-12">
        <div className="max-w-3xl mx-auto mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/40 hover:text-kitak-lime transition-colors text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.nav.backToEvent}
          </Link>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block glass rounded-full px-4 py-1.5 mb-6">
            <span className="text-kitak-lime text-xs font-bold tracking-widest uppercase">
              INSPIRE · i-CATS UC · 18 July 2026
            </span>
          </div>
          <h1 className="font-bebas text-5xl sm:text-7xl text-white mb-3">
            {t.registration.heading.prefix}{' '}
            <span className="gradient-text">{t.registration.heading.highlight}</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg">
            Run Kitak Run! · {t.hero.venue}
          </p>
        </div>

        <RegistrationForm />

        <div className="max-w-3xl mx-auto mt-10 text-center">
          <div className="glass rounded-xl p-4 border border-white/5">
            <p className="text-white/40 text-sm">
              <span className="text-kitak-lime font-semibold">{t.registration.step1.noteHighlight}</span>{' '}
              {t.registration.step1.note} 🤝
            </p>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </main>
  )
}
