'use client'

import { LANGUAGES, useLanguage } from '@/lib/i18n'

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language selector"
      className={`inline-flex items-center gap-0.5 glass rounded-full p-1 ${className}`}
    >
      {LANGUAGES.map(({ code, label, name }) => (
        <button
          key={code}
          type="button"
          title={name}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-200 ${
            lang === code
              ? 'bg-kitak-lime text-kitak-dark'
              : 'text-white/50 hover:text-white/85'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
