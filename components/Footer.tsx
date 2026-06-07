'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

export default function Footer() {
  const { t } = useLanguage()
  const { footer } = t

  return (
    <footer
      className="px-4 pt-16 pb-10 border-t border-white/5"
      style={{ background: '#050C06' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-12 text-center sm:text-left">
          <div>
            <h3 className="font-bebas text-2xl text-kitak-lime tracking-wider mb-2">
              {footer.brand}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed">{footer.blurb}</p>
          </div>

          <div>
            <h4 className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">
              {footer.organisedBy}
            </h4>
            <a
              href="https://icats.edu.my/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white/60 hover:text-kitak-lime text-sm font-medium transition-colors"
            >
              i-CATS University College →
            </a>
          </div>

          <div>
            <h4 className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-3">
              {footer.collabWith}
            </h4>
            <a
              href="https://kobis-berhad.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white/60 hover:text-kitak-lime text-sm font-medium transition-colors"
            >
              KOBIS Berhad →
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-white/25 text-xs">{footer.tagline}</p>
          <p className="text-white/20 text-xs">{footer.rights}</p>
        </div>

        <div className="mt-4 text-center sm:text-left">
          <Link href="/admin" className="text-white/10 hover:text-white/30 text-[11px] transition-colors">
            {footer.admin}
          </Link>
        </div>
      </div>
    </footer>
  )
}
