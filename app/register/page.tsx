import Link from 'next/link'
import RegistrationForm from '@/components/RegistrationForm'

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-kitak-dark px-4 py-12">
      <div className="max-w-3xl mx-auto mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-kitak-lime transition-colors text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Event
        </Link>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="inline-block glass rounded-full px-4 py-1.5 mb-6">
          <span className="text-kitak-lime text-xs font-bold tracking-widest uppercase">
            INSPIRE · i-CATS UC · 18 July 2026
          </span>
        </div>
        <h1 className="font-bebas text-5xl sm:text-7xl text-white mb-3">
          Register{' '}
          <span className="gradient-text">Your Team</span>
        </h1>
        <p className="text-white/50 text-base sm:text-lg">
          Run Kitak Run! · Sarawak Botanical Garden, Kuching
        </p>
      </div>

      <RegistrationForm />

      <div className="max-w-3xl mx-auto mt-10 text-center">
        <div className="glass rounded-xl p-4 border border-white/5">
          <p className="text-white/40 text-sm">
            Don’t have a complete team? Register anyway — we’ll match you with others! 🤝
          </p>
        </div>
      </div>
    </main>
  )
}
