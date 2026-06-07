'use client'

import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/lib/i18n'

export default function SiteHeader() {
  const { t } = useLanguage()

  return (
    <header className="sticky top-0 z-30 px-3 sm:px-4 py-2.5 glass border-x-0 border-t-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-2 h-2 rounded-full bg-kitak-lime group-hover:scale-125 transition-transform" />
          <span className="font-bebas text-lg sm:text-xl tracking-wider text-white/90">
            RUN KITAK <span className="text-kitak-lime">RUN!</span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher />
          <Link
            href="/admin"
            className="hidden sm:inline-block bg-kitak-green/40 text-white/45 hover:text-white/70 font-semibold text-xs px-3.5 py-1.5 rounded-full border border-white/5 transition-colors duration-200"
          >
            {t.nav.admin}
          </Link>
          <Link
            href="/register"
            className="hidden sm:inline-block bg-kitak-lime text-kitak-dark font-bold text-sm px-4 py-1.5 rounded-full hover:scale-105 transition-transform duration-200"
          >
            {t.nav.register}
          </Link>
        </div>
      </div>
    </header>
  )
}
