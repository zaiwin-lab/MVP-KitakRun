'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calc(): TimeLeft {
  // 18 July 2026 07:00 MYT (UTC+8)
  const target = new Date('2026-07-18T07:00:00+08:00').getTime()
  const diff   = Math.max(0, target - Date.now())
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  }
}

export default function CountdownTimer() {
  const { t } = useLanguage()
  const [time, setTime]       = useState<TimeLeft>(calc)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])

  if (!mounted) return null

  const units = [
    { label: t.hero.days, value: time.days },
    { label: t.hero.hrs,  value: time.hours },
    { label: t.hero.mins, value: time.minutes },
    { label: t.hero.secs, value: time.seconds },
  ]

  return (
    <div className="flex gap-3 sm:gap-4 justify-center">
      {units.map(({ label, value }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="glass-green rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center lime-glow">
            <span className="font-bebas text-3xl sm:text-4xl text-kitak-lime countdown-pulse">
              {String(value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs text-white/40 mt-1.5 font-semibold tracking-widest">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
