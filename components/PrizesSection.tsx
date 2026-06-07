'use client'

import { useLanguage } from '@/lib/i18n'

const podiumMeta = [
  { key: 'silver' as const, amount: 'RM 800',   icon: '🥈', order: 2,
    gradient: 'linear-gradient(145deg, #9CA3AF, #6B7280)',
    glow: 'rgba(156,163,175,0.3)', height: 'h-10' },
  { key: 'gold' as const,   amount: 'RM 1,000', icon: '🥇', order: 1,
    gradient: 'linear-gradient(145deg, #FBBF24, #D97706)',
    glow: 'rgba(251,191,36,0.45)', height: 'h-20' },
  { key: 'bronze' as const, amount: 'RM 600',   icon: '🥉', order: 3,
    gradient: 'linear-gradient(145deg, #FB923C, #C2410C)',
    glow: 'rgba(251,146,60,0.3)', height: 'h-4' },
]

const specialMeta = [
  { icon: '🏃', glow: 'rgba(168,212,0,0.2)',  border: 'rgba(168,212,0,0.25)' },
  { icon: '📸', glow: 'rgba(168,85,247,0.2)', border: 'rgba(168,85,247,0.25)' },
]

const checklistIcons = ['📱', '👕', '💧', '📍']

export default function PrizesSection() {
  const { t } = useLanguage()
  const { prizes } = t

  return (
    <section
      id="prizes"
      className="py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #050C06 0%, #0D1F0F 100%)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-kitak-gold text-xs font-bold tracking-widest uppercase mb-4">
            {prizes.eyebrow}
          </span>
          <h2 className="font-bebas text-5xl sm:text-7xl text-white mb-4">{prizes.title}</h2>
          <div className="inline-flex items-center gap-2 glass rounded-2xl px-6 py-2">
            <span className="text-kitak-gold font-bold text-xl">RM 2,600</span>
            <span className="text-white/40 text-sm">{prizes.poolLabel}</span>
          </div>
        </div>

        {/* Podium */}
        <div className="mb-12">
          <h3 className="font-bebas text-2xl text-white/35 text-center mb-8 tracking-widest uppercase">
            {prizes.topTeamTitle}
          </h3>
          <div className="flex items-end justify-center gap-3 sm:gap-5">
            {podiumMeta.map((p) => (
              <div key={p.key} className="flex-1 max-w-[220px] flex flex-col">
                {p.order === 1 && (
                  <div className="text-center text-3xl mb-1">👑</div>
                )}
                <div
                  className="rounded-2xl p-5 sm:p-7 text-center hover:scale-[1.04] transition-all duration-300"
                  style={{
                    background: 'rgba(27,77,46,0.35)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: `0 0 36px ${p.glow}`,
                  }}
                >
                  <div className="text-3xl sm:text-4xl mb-2">{p.icon}</div>
                  <div
                    className="font-bebas text-xl sm:text-2xl mb-1"
                    style={{ background: p.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                  >
                    {prizes.podium[p.key]}
                  </div>
                  <div className="font-bold text-white text-lg sm:text-2xl">{p.amount}</div>
                </div>
                <div
                  className={`${p.height} rounded-b-xl mx-4`}
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Special prizes */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {prizes.special.map((s, i) => (
            <div
              key={s.title}
              className="relative overflow-hidden rounded-2xl p-6 sm:p-8 hover:scale-[1.02] transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, rgba(27,77,46,0.45), rgba(13,31,15,0.7))',
                border: `1px solid ${specialMeta[i].border}`,
                boxShadow: `0 0 28px ${specialMeta[i].glow}`,
              }}
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl">{specialMeta[i].icon}</span>
                <div>
                  <h4 className="font-bebas text-2xl text-white tracking-wide">{s.title}</h4>
                  <p className="text-white/50 text-sm mt-0.5">{s.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Remember checklist */}
        <div className="glass rounded-2xl p-6 sm:p-8 border border-white/5">
          <h3 className="font-bebas text-xl text-white/60 tracking-widest mb-5 uppercase">
            {prizes.checklistTitle}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {prizes.checklist.map((text, i) => (
              <div key={text} className="flex flex-col items-center text-center gap-2 p-3">
                <span className="text-2xl">{checklistIcons[i]}</span>
                <span className="text-white/50 text-xs leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
