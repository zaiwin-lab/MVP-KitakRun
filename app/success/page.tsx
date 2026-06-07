'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import WhatsAppButton from '@/components/WhatsAppButton'
import SiteHeader from '@/components/SiteHeader'

function SuccessContent() {
  const params   = useSearchParams()
  const teamName = params.get('team') ?? 'Your Team'

  const shareText = `🏃 Just registered for #RunKitakRun with team ${teamName}! See you at Sarawak Botanical Garden on 18 July 2026! 💪 #INSPIREiCATSUC #RunTogether`

  return (
    <main className="min-h-screen bg-kitak-dark flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Animated badge */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div className="absolute inset-0 bg-kitak-lime/20 rounded-full animate-ping" />
          <div className="relative w-28 h-28 bg-gradient-to-br from-kitak-lime to-green-500 rounded-full flex items-center justify-center text-5xl lime-glow">
            🏃
          </div>
        </div>

        <h1 className="font-bebas text-6xl text-white mb-1">YOU’RE IN!</h1>
        <p className="font-bebas text-2xl sm:text-3xl gradient-text mb-8">{teamName}</p>

        <div className="glass-green rounded-2xl p-6 sm:p-8 mb-6 border border-kitak-lime/20 text-left">
          <p className="text-white/70 text-sm leading-relaxed mb-4">
            Your team registration is confirmed! 🎉 Check your email for details. Download STRAVA, lace
            up your shoes, and be ready at:
          </p>
          <div className="bg-black/30 rounded-xl p-4 text-center">
            <p className="font-bebas text-2xl text-kitak-lime">18 JULY 2026 · 7:00 AM</p>
            <p className="text-white/50 text-sm mt-1">Sarawak Botanical Garden, Kuching</p>
          </div>
        </div>

        {/* Share card */}
        <div className="glass rounded-2xl p-5 mb-8 border border-white/5 text-left">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-3">Share your registration</p>
          <p className="text-white/70 text-sm leading-relaxed mb-3">{shareText}</p>
          <button
            onClick={() => navigator.clipboard.writeText(shareText)}
            className="text-xs text-kitak-lime border border-kitak-lime/30 rounded-lg px-4 py-1.5 hover:bg-kitak-lime/10 transition-colors"
          >
            Copy Caption
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="glass border border-white/10 text-white font-semibold px-8 py-3 rounded-xl hover:border-white/20 transition-all duration-200 text-center"
          >
            ← Back to Event
          </Link>
          <a
            href="https://www.strava.com/mobile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#FC4C02] text-white font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-200 text-center"
          >
            Get STRAVA 📱
          </a>
        </div>

        <p className="text-white/20 text-xs mt-10">
          Run Kitak Run! · i-CATS UC · INSPIRE Programme · Inspiring Minds, Shaping Future
        </p>
      </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-kitak-dark flex items-center justify-center">
          <p className="text-white/30">Loading…</p>
        </div>
      }
    >
      <SuccessContent />
      <WhatsAppButton />
    </Suspense>
  )
}
