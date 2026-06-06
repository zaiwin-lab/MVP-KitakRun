import Link from 'next/link'
import CountdownTimer from './CountdownTimer'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{
        background:
          'radial-gradient(ellipse at 20% 20%, #1B4D2E 0%, #0D1F0F 55%, #080F09 100%)',
      }}
    >
      {/* Atmospheric orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-kitak-green/25 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 -right-40 w-[400px] h-[400px] bg-kitak-lime/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1.2s' }}
        />
        {/* Subtle horizontal track lines */}
        {[18, 32, 46, 60, 74].map((top) => (
          <div
            key={top}
            className="absolute h-px w-full"
            style={{
              top: `${top}%`,
              background: 'linear-gradient(90deg, transparent, rgba(168,212,0,0.12), transparent)',
            }}
          />
        ))}
      </div>

      {/* INSPIRE badge */}
      <div className="relative z-10 mb-6">
        <div className="glass rounded-full px-5 py-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-kitak-lime animate-pulse" />
          <span className="text-xs font-bold tracking-widest text-white/70 uppercase">
            INSPIRE · i-CATS UC
          </span>
        </div>
      </div>

      {/* Main wordmark */}
      <div className="relative z-10 text-center mb-5">
        <h1
          className="font-bebas leading-none"
          style={{ fontSize: 'clamp(72px, 18vw, 180px)' }}
        >
          <span className="text-white drop-shadow-2xl">RUN </span>
          <span className="gradient-text">KITAK</span>
          <br />
          <span className="text-white drop-shadow-2xl">RUN!</span>
        </h1>
        <p className="text-kitak-lime/80 text-sm sm:text-base font-semibold tracking-[0.3em] uppercase mt-2">
          Run Together · Win Together
        </p>
      </div>

      {/* Event details pill */}
      <div className="relative z-10 glass rounded-2xl px-5 py-3 mb-8 flex flex-wrap gap-3 sm:gap-6 justify-center items-center">
        {[
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            ),
            text: '18 JULY 2026 · SAT',
          },
          {
            icon: (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
            text: '7:00 AM',
          },
          {
            icon: (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </>
            ),
            text: 'Sarawak Botanical Garden, Kuching',
          },
        ].map(({ icon, text }, i) => (
          <div key={i} className="flex items-center gap-2 text-white/80">
            <svg className="w-4 h-4 text-kitak-lime flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {icon}
            </svg>
            <span className="font-semibold text-sm">{text}</span>
          </div>
        ))}
      </div>

      {/* Countdown */}
      <div className="relative z-10 mb-10">
        <p className="text-center text-[10px] text-white/30 uppercase tracking-widest mb-3 font-semibold">
          Event starts in
        </p>
        <CountdownTimer />
      </div>

      {/* CTAs */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4">
        <Link
          href="/register"
          className="group relative overflow-hidden bg-kitak-lime text-kitak-dark font-bebas text-2xl tracking-wider px-10 py-4 rounded-2xl hover:scale-105 transition-all duration-300 lime-glow text-center"
        >
          <span className="relative z-10">REGISTER YOUR TEAM NOW</span>
          <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
        <a
          href="#event-info"
          className="glass border border-white/10 text-white font-semibold text-base px-8 py-4 rounded-2xl hover:border-kitak-lime/30 hover:bg-kitak-lime/5 transition-all duration-300 text-center"
        >
          Learn More ↓
        </a>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce" aria-hidden>
        <div className="w-px h-8 bg-gradient-to-b from-kitak-lime/50 to-transparent" />
        <div className="w-1.5 h-1.5 rounded-full bg-kitak-lime/50" />
      </div>
    </section>
  )
}
