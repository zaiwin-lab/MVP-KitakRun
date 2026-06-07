'use client'

import { useLanguage } from '@/lib/i18n'

export default function Footer() {
  const { t } = useLanguage()
  const { footer } = t

  return (
    <footer
      className="px-4 py-5 border-t border-white/5 text-center"
      style={{ background: '#050C06' }}
    >
      <div className="max-w-2xl mx-auto space-y-1">
        <p className="text-white font-semibold text-sm tracking-wide">{footer.brand}</p>
        <p className="text-white/45 text-xs leading-relaxed">
          Organized by{' '}
          <a
            href="https://icats.edu.my/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/65 hover:text-kitak-lime underline decoration-white/15 underline-offset-2 transition-colors"
          >
            INSPIRE, i-CATS UC
          </a>
          {' '}in collaboration with{' '}
          <a
            href="https://www.kobisberhad.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/65 hover:text-kitak-lime underline decoration-white/15 underline-offset-2 transition-colors"
          >
            KOBIS Berhad
          </a>
        </p>
        <p className="text-white/25 text-[11px]">{footer.rights}</p>
      </div>
    </footer>
  )
}
