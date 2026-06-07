'use client'

import { useLanguage } from '@/lib/i18n'

const teamFormatIcons = ['👥', '⚡', '🏢', '🎂']
const stepIcons = ['01', '02', '03', '04']
const checklistIcons = ['🚩', '🏛️', '🌳']

export default function EventInfo() {
  const { t } = useLanguage()
  const { eventInfo } = t

  return (
    <section
      id="event-info"
      className="relative overflow-hidden py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #0D1F0F 0%, #050C06 100%)' }}
    >
      {/* Premium signature: occasional tiny leaf drift — very subtle, motion-safe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {[
          { left: '8%',  delay: '0s',  dur: '26s' },
          { left: '52%', delay: '9s',  dur: '32s' },
          { left: '88%', delay: '17s', dur: '28s' },
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

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-kitak-lime text-xs font-bold tracking-widest uppercase mb-4">
            {eventInfo.eyebrow}
          </span>
          <h2 className="font-bebas text-5xl sm:text-7xl text-white mb-4">{eventInfo.title}</h2>
          <p className="text-white/55 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {eventInfo.description.replace(eventInfo.descriptionHighlight, '')}{' '}
            <span className="text-kitak-lime font-semibold">{eventInfo.descriptionHighlight}</span>
          </p>
        </div>

        {/* Team format cards */}
        <div className="mb-16">
          <h3 className="font-bebas text-3xl text-white/40 text-center mb-6 tracking-widest">
            {eventInfo.teamFormatTitle}
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {eventInfo.teamFormat.map((item, i) => (
              <div
                key={item.title}
                className="glass-green rounded-2xl p-6 text-center hover:border-kitak-lime/30 hover:scale-[1.03] transition-all duration-300"
              >
                <div className="text-3xl mb-3">{teamFormatIcons[i]}</div>
                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 glass rounded-xl p-3 text-center border border-kitak-lime/8">
            <span className="text-white/40 text-sm">{eventInfo.noTeamPrefix}</span>
            <span className="text-kitak-lime font-semibold text-sm">{eventInfo.noTeamHighlight}</span>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h3 className="font-bebas text-3xl text-white/40 text-center mb-6 tracking-widest">
            {eventInfo.howItWorksTitle}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {eventInfo.steps.map((s, i) => (
              <div key={s.title} className="relative">
                {i < eventInfo.steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-[calc(100%+10px)] w-[calc(100%-20px)] h-px"
                    style={{ background: 'linear-gradient(90deg, rgba(168,212,0,0.4), transparent)' }}
                  />
                )}
                <div className="glass-green rounded-2xl p-6 hover:border-kitak-lime/30 transition-all duration-300 h-full">
                  <div className="font-bebas text-5xl leading-none mb-2" style={{ color: 'rgba(168,212,0,0.18)' }}>
                    {stepIcons[i]}
                  </div>
                  <h4 className="font-bold text-white text-sm mb-2">{s.title}</h4>
                  <p className="text-white/45 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategy banner */}
        <div
          className="rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1B4D2E 0%, #0D3520 100%)' }}
        >
          <div className="absolute inset-0 opacity-[0.06] select-none pointer-events-none text-6xl flex flex-wrap gap-8 p-6" aria-hidden>
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i}>🏃</span>
            ))}
          </div>
          <p className="relative font-bebas text-3xl sm:text-5xl text-white tracking-wider">
            {eventInfo.strategyTitle}
            <span className="text-kitak-lime">{eventInfo.strategyWin}</span>
          </p>
          <p className="relative text-white/45 mt-3 text-sm sm:text-base">
            {eventInfo.strategySub}
          </p>
        </div>

        {/* Venue + Route & Checkpoints (official CP1/CP2/CP3) */}
        <div className="mt-12 grid lg:grid-cols-5 gap-5">
          <div className="lg:col-span-2">
            <h3 className="font-bebas text-3xl text-white/40 text-center lg:text-left mb-5 tracking-widest">
              {eventInfo.venueTitle}
            </h3>
            <a
              href="https://maps.google.com/?q=Sarawak+Botanical+Garden+Kuching+Sarawak+Malaysia"
              target="_blank"
              rel="noopener noreferrer"
              className="block glass-green rounded-2xl p-6 border border-white/5 hover:border-kitak-lime/30 hover:scale-[1.01] transition-all duration-300 group h-full"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-kitak-lime/10 flex items-center justify-center text-2xl flex-shrink-0">
                  📍
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-white">{eventInfo.venueName}</p>
                  <p className="text-white/45 text-sm">{eventInfo.venueLocation}</p>
                </div>
                <svg
                  className="w-5 h-5 text-kitak-lime/40 group-hover:text-kitak-lime transition-colors flex-shrink-0"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </a>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-bebas text-3xl text-white/40 text-center lg:text-left mb-5 tracking-widest">
              {eventInfo.routeTitle}
            </h3>
            <div className="glass-green rounded-2xl p-6 border border-white/5 h-full">
              <p className="text-white/40 text-sm mb-5 leading-relaxed">{eventInfo.routeNote}</p>
              <div className="space-y-3">
                {eventInfo.checkpoints.map((cp, i) => (
                  <div
                    key={cp.code}
                    className="flex items-center gap-4 rounded-xl p-3 border border-kitak-lime/10 bg-black/15"
                  >
                    <div className="w-11 h-11 rounded-xl bg-kitak-lime/15 flex items-center justify-center flex-shrink-0 text-xl">
                      {checklistIcons[i]}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-white text-sm">
                        <span className="text-kitak-lime">{cp.code}</span> · {cp.name}
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">{cp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
