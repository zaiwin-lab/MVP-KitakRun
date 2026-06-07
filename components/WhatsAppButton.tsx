'use client'

import { useLanguage } from '@/lib/i18n'

const PHONE = '60192411090'

export default function WhatsAppButton() {
  const { t } = useLanguage()
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(t.whatsapp.message)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed z-40 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
      style={{
        right: 'max(1.25rem, env(safe-area-inset-right))',
        bottom: 'max(1.25rem, env(safe-area-inset-bottom))',
        background: '#25D366',
        boxShadow: '0 8px 28px rgba(37, 211, 102, 0.45)',
      }}
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8" fill="white" aria-hidden>
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.39.703 4.612 1.912 6.479L4 29l7.73-1.873A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3zm0 21.818a9.77 9.77 0 0 1-4.98-1.363l-.357-.213-4.587 1.111 1.227-4.474-.232-.366A9.78 9.78 0 0 1 5.273 15c0-5.92 4.81-10.727 10.731-10.727S26.727 9.08 26.727 15 21.925 24.818 16.004 24.818zm5.46-7.66c-.298-.15-1.764-.872-2.038-.972-.273-.1-.472-.15-.671.15-.198.298-.769.971-.943 1.17-.174.199-.347.224-.645.075-.298-.15-1.258-.464-2.396-1.48-.886-.79-1.484-1.766-1.658-2.064-.174-.298-.019-.46.131-.609.134-.134.298-.349.447-.523.15-.174.199-.298.298-.497.1-.199.05-.373-.025-.523-.075-.15-.671-1.617-.92-2.215-.242-.583-.488-.504-.671-.513-.174-.008-.373-.01-.572-.01-.199 0-.522.075-.795.373-.273.298-1.043 1.02-1.043 2.488 0 1.467 1.068 2.885 1.217 3.083.149.199 2.102 3.21 5.092 4.502.712.307 1.267.49 1.7.627.714.227 1.364.195 1.878.118.573-.085 1.764-.72 2.013-1.416.249-.696.249-1.292.174-1.416-.075-.124-.273-.199-.571-.348z"/>
      </svg>
    </a>
  )
}
