'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n'

const CAPTION = `🏃‍♂️ Proud to be part of #RunKitakRun — the ultimate team distance challenge at i-CATS UC!

Running with my squad on 18 July at Sarawak Botanical Garden, Kuching. Every step counts! 💪

#INSPIREiCATSUC #RunKitakRun #iCATSUC #TeamSpirit #Kuching #Sarawak`

export default function SocialSection() {
  const { t } = useLanguage()
  const { social } = t

  return (
    <section
      id="social"
      className="relative overflow-hidden py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #0D1F0F 0%, #1B4D2E 100%)' }}
    >
      {/* Premium signature: occasional tiny leaf drift — very subtle, motion-safe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {[
          { left: '18%', delay: '4s',  dur: '30s' },
          { left: '74%', delay: '21s', dur: '27s' },
        ].map((leaf, i) => (
          <span
            key={i}
            className="leaf-drift"
            style={{ left: leaf.left, top: '-20px', animationDelay: leaf.delay, animationDuration: leaf.dur }}
          >
            🍃
          </span>
        ))}
      </div>

      <div className="max-w-3xl mx-auto text-center relative">
        <span className="inline-block text-kitak-lime text-xs font-bold tracking-widest uppercase mb-4">
          {social.eyebrow}
        </span>
        <h2 className="font-bebas text-5xl sm:text-6xl text-white mb-4">{social.title}</h2>
        <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          {social.description}
          <span className="text-kitak-lime font-semibold">
            {' '}{social.descriptionHighlight}
          </span>
        </p>

        {/* Hashtags */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {['#RunKitakRun', '#INSPIREiCATSUC', '#TeamSpirit', '#RunTogether', '#iCATSUC'].map((tag) => (
            <span
              key={tag}
              className="glass-green rounded-full px-4 py-1.5 text-kitak-lime font-semibold text-sm border border-kitak-lime/15 hover:border-kitak-lime/40 hover:bg-kitak-lime/8 transition-all duration-200 cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Copy-paste caption */}
        <div className="glass-green rounded-2xl p-6 sm:p-8 border border-kitak-lime/10 text-left mb-10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/40 text-xs uppercase tracking-widest font-semibold">
              {social.captionLabel}
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(CAPTION)}
              className="text-xs text-kitak-lime border border-kitak-lime/30 rounded-lg px-3 py-1.5 hover:bg-kitak-lime/10 transition-colors"
            >
              {social.copy}
            </button>
          </div>
          <pre className="text-white/65 text-sm leading-relaxed whitespace-pre-wrap font-sans">{CAPTION}</pre>
        </div>

        {/* Final CTA */}
        <Link
          href="/register"
          className="btn-shimmer inline-block bg-kitak-lime text-kitak-dark font-bebas text-2xl tracking-wider px-12 py-5 rounded-2xl hover:scale-105 transition-all duration-300 lime-glow"
        >
          {social.ctaRegister}
        </Link>
        <p className="text-white/25 text-xs mt-3">{social.ctaNote}</p>
      </div>
    </section>
  )
}
