'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

export default function Footer() {
  const { t } = useLanguage()
  const { footer } = t

  return (
    <footer
      className="px-4 pt-12 pb-8 border-t border-white/5 text-center"
      style={{ background: '#050C06' }}
    >
      <div className="max-w-2xl mx-auto">
        <h3 className="font-bebas text-2xl text-kitak-lime tracking-wider mb-1.5">
          {footer.brand}
        </h3>
        <p className="text-white/35 text-sm leading-relaxed mb-6">{footer.blurb}</p>

        <div className="pt-6 border-t border-white/5 space-y-2.5">
          <p className="text-white/45 text-xs sm:text-sm leading-relaxed">
            {footer.organisedBy}{' '}
            <a
              href="https://icats.edu.my/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/65 hover:text-kitak-lime underline decoration-white/15 underline-offset-4 transition-colors"
            >
              i-CATS University College
            </a>
            <span className="text-white/20 mx-2">·</span>
            {footer.collabWith}{' '}
            <a
              href="https://www.kobisberhad.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/65 hover:text-kitak-lime underline decoration-white/15 underline-offset-4 transition-colors"
            >
              KOBIS Berhad
            </a>
          </p>

          <p className="text-white/25 text-xs flex items-center justify-center gap-2.5 flex-wrap">
            <span>{footer.rights}</span>
            <span className="text-white/15">·</span>
            <Link
              href="/admin"
              className="text-kitak-lime/80 hover:text-kitak-lime font-bebas text-base tracking-wider transition-colors"
            >
              {footer.admin}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
