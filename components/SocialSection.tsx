'use client'

import Link from 'next/link'

const CAPTION = `🏃‍♂️ Proud to be part of #RunKitakRun — the ultimate team distance challenge at i-CATS UC!

Running with my squad on 18 July at Sarawak Botanical Garden, Kuching. Every step counts! 💪

#INSPIREiCATSUC #RunKitakRun #iCATSUC #TeamSpirit #Kuching #Sarawak`

export default function SocialSection() {
  return (
    <section
      id="social"
      className="py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #0D1F0F 0%, #050C06 100%)' }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-kitak-lime text-xs font-bold tracking-widest uppercase mb-4">
          Community
        </span>
        <h2 className="font-bebas text-5xl sm:text-6xl text-white mb-4">Join The Movement</h2>
        <p className="text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
          Share your training, your team, your race-day energy. Tag us and inspire the whole campus.
          <span className="text-kitak-lime font-semibold">
            {' '}One University. One Community. One Pride.
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
              Sample caption — copy &amp; post!
            </span>
            <button
              onClick={() => navigator.clipboard.writeText(CAPTION)}
              className="text-xs text-kitak-lime border border-kitak-lime/30 rounded-lg px-3 py-1.5 hover:bg-kitak-lime/10 transition-colors"
            >
              Copy
            </button>
          </div>
          <pre className="text-white/65 text-sm leading-relaxed whitespace-pre-wrap font-sans">{CAPTION}</pre>
        </div>

        {/* Final CTA */}
        <Link
          href="/register"
          className="inline-block bg-kitak-lime text-kitak-dark font-bebas text-2xl tracking-wider px-12 py-5 rounded-2xl hover:scale-105 transition-all duration-300 lime-glow"
        >
          REGISTER YOUR TEAM NOW
        </Link>
        <p className="text-white/25 text-xs mt-3">Free to join · Limited slots · Don’t miss out!</p>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-white/5 text-center space-y-1">
        <p className="text-white/20 text-xs">
          © 2026 i-CATS UC · INSPIRE Programme · Run Kitak Run! · Kuching, Sarawak
        </p>
        <p className="text-white/10 text-xs">One University. One Community. One Pride.</p>
      </div>
    </section>
  )
}
