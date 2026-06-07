'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/lib/i18n'

const DEPARTMENTS = [
  'Academic',
  'Administration',
  'Finance',
  'Human Resource',
  'ICT',
  'Library',
  'Marketing',
  'Registry',
  'Research & Innovation',
  'Student Affairs',
  'Other',
]

interface Member {
  name: string
  staffId: string
  department: string
  phone: string
  email: string
}

const blank = (): Member => ({ name: '', staffId: '', department: '', phone: '', email: '' })

export default function RegistrationForm() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)
  const { t } = useLanguage()
  const r = t.registration

  const [step,       setStep]       = useState(0)
  const [teamName,   setTeamName]   = useState('')
  const [members,    setMembers]    = useState<Member[]>([blank(), blank(), blank(), blank()])
  const [logoFile,   setLogoFile]   = useState<File | null>(null)
  const [logoPreview,setLogoPreview]= useState<string | null>(null)
  const [dragOver,   setDragOver]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errors,     setErrors]     = useState<Record<string, string>>({})

  /* ─ helpers ─ */
  const updateMember = (idx: number, field: keyof Member, val: string) =>
    setMembers(prev => { const next = [...prev]; next[idx] = { ...next[idx], [field]: val }; return next })

  const setLogo = (file: File | null) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { alert('Please upload an image (PNG, JPG, SVG)'); return }
    if (file.size > 5_242_880)           { alert('Max file size is 5 MB'); return }
    setLogoFile(file)
    const rd = new FileReader()
    rd.onloadend = () => setLogoPreview(rd.result as string)
    rd.readAsDataURL(file)
  }

  /* Only the Team Captain (member 1) is mandatory — incomplete teams are welcome.
     A "filled in" runner is judged by whether they typed a name; if they did,
     their other required fields must be completed too. */
  const isFilled    = (m: Member) => m.name.trim().length > 0
  const isComplete  = (m: Member) => isFilled(m) && m.staffId.trim() && m.department

  const ok0 = teamName.trim().length > 0
  const ok1 = isComplete(members[0]) && members.slice(1).every(m => !isFilled(m) || isComplete(m))

  const validate1 = (): boolean => {
    const e: Record<string, string> = {}
    members.forEach((m, i) => {
      if (i === 0 || isFilled(m)) {
        if (!m.name.trim())    e[`${i}-name`]   = r.step1.required_field
        if (!m.staffId.trim()) e[`${i}-staffId`] = r.step1.required_field
        if (!m.department)     e[`${i}-dept`]    = r.step1.required_field
      }
    })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ok0 || !ok1) return
    setSubmitting(true)

    const fd = new FormData()
    fd.append('form-name', 'team-registration')
    fd.append('team-name', teamName)
    fd.append('team-size', String(members.filter(isFilled).length))
    members.forEach((m, i) => {
      fd.append(`member-${i + 1}-name`,  m.name)
      fd.append(`member-${i + 1}-id`,    m.staffId)
      fd.append(`member-${i + 1}-dept`,  m.department)
      fd.append(`member-${i + 1}-phone`, m.phone)
      fd.append(`member-${i + 1}-email`, m.email)
    })
    if (logoFile) fd.append('team-logo', logoFile)

    try {
      await fetch('/', { method: 'POST', body: fd })

      // Mirror the submission locally so the Admin Dashboard can list it
      // (Netlify Forms has no public read API without a server-side token).
      try {
        const stored = JSON.parse(localStorage.getItem('rkr-registrations') ?? '[]')
        stored.unshift({
          teamName,
          members: members.filter(isFilled),
          teamSize: members.filter(isFilled).length,
          logoName: logoFile?.name ?? null,
          submittedAt: new Date().toISOString(),
        })
        localStorage.setItem('rkr-registrations', JSON.stringify(stored.slice(0, 200)))
      } catch { /* localStorage unavailable — safe to ignore */ }

      router.push(`/success/?team=${encodeURIComponent(teamName)}`)
    } catch {
      setSubmitting(false)
    }
  }

  /* ─ step bar ─ */
  const StepBar = () => (
    <div className="flex items-center justify-center gap-0 mb-10">
      {r.steps.map((label, i) => (
        <div key={label} className="flex items-center">
          <button
            type="button"
            onClick={() => {
              if (i === 0)                              setStep(0)
              if (i === 1 && ok0)                      setStep(1)
              if (i === 2 && ok0 && ok1)               setStep(2)
            }}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 ${
              i === step   ? 'bg-kitak-lime text-kitak-dark font-bold' :
              i < step     ? 'bg-kitak-lime/15 text-kitak-lime font-semibold' :
                             'bg-white/5 text-white/30'
            }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
              i < step  ? 'bg-kitak-lime text-kitak-dark' :
              i === step ? 'bg-white/10 text-kitak-dark' :
                           'bg-white/10 text-white/30'
            }`}>
              {i < step ? '✓' : i + 1}
            </span>
            <span className="hidden sm:inline text-sm">{label}</span>
          </button>
          {i < r.steps.length - 1 && (
            <div className={`w-6 sm:w-10 h-px ${ i < step ? 'bg-kitak-lime/40' : 'bg-white/10' }`} />
          )}
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-3xl mx-auto">
      <StepBar />

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* ── STEP 0: Team Name ── */}
        {step === 0 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-1">{r.step0.title}</h2>
              <p className="text-white/35 text-sm">{r.step0.subtitle}</p>
            </div>

            <div className="glass-green rounded-2xl p-6 sm:p-8 border border-kitak-lime/10">
              <label className="form-label">{r.step0.label}</label>
              <input
                type="text"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                placeholder={r.step0.placeholder}
                className="form-input text-lg"
                maxLength={50}
                autoFocus
              />
              {teamName && (
                <div className="mt-4 p-4 rounded-xl border border-kitak-lime/20 bg-black/20">
                  <span className="text-white/30 text-xs uppercase tracking-wider">{r.step0.preview}</span>
                  <p className="font-bebas text-2xl text-kitak-lime mt-1">{teamName}</p>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => ok0 && setStep(1)}
              disabled={!ok0}
              className="w-full bg-kitak-lime text-kitak-dark font-bebas text-xl py-4 rounded-2xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100 tracking-wider lime-glow"
            >
              {r.step0.cta}
            </button>
          </div>
        )}

        {/* ── STEP 1: Members ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-1">{r.step1.title}</h2>
              <p className="text-white/35 text-sm">{r.step1.subtitle}</p>
            </div>

            <div className="glass rounded-xl p-4 border border-kitak-lime/10 text-center">
              <p className="text-white/45 text-sm leading-relaxed">
                <span className="text-kitak-lime font-semibold">{r.step1.noteHighlight}</span>{' '}
                {r.step1.note}
              </p>
            </div>

            {members.map((m, idx) => (
              <div
                key={idx}
                className="glass-green rounded-2xl p-5 sm:p-6 border border-white/5 hover:border-kitak-lime/20 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-kitak-lime text-kitak-dark font-bebas text-lg flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </div>
                  <h3 className="font-bold text-white text-sm">
                    {idx === 0 ? r.step1.captain : `${r.step1.runner} ${idx + 1}`}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    idx === 0 ? 'bg-kitak-lime/15 text-kitak-lime' : 'bg-white/5 text-white/30'
                  }`}>
                    {idx === 0 ? r.step1.required : r.step1.optional}
                  </span>
                  {m.name && (
                    <span className="ml-auto text-kitak-lime/50 text-xs font-medium truncate max-w-[120px]">{m.name}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">{r.step1.fullName} {idx === 0 ? '*' : ''}</label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={e => updateMember(idx, 'name', e.target.value)}
                      placeholder={r.step1.namePlaceholder}
                      className={`form-input ${ errors[`${idx}-name`] ? 'border-red-500/60' : '' }`}
                    />
                    {errors[`${idx}-name`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${idx}-name`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">{r.step1.staffId} {idx === 0 ? '*' : ''}</label>
                    <input
                      type="text"
                      value={m.staffId}
                      onChange={e => updateMember(idx, 'staffId', e.target.value)}
                      placeholder={r.step1.idPlaceholder}
                      className={`form-input ${ errors[`${idx}-staffId`] ? 'border-red-500/60' : '' }`}
                    />
                    {errors[`${idx}-staffId`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${idx}-staffId`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">{r.step1.department} {idx === 0 ? '*' : ''}</label>
                    <select
                      value={m.department}
                      onChange={e => updateMember(idx, 'department', e.target.value)}
                      className={`form-input appearance-none ${ errors[`${idx}-dept`] ? 'border-red-500/60' : '' }`}
                    >
                      <option value="" disabled>{r.step1.selectDept}</option>
                      {DEPARTMENTS.map(d => (
                        <option key={d} value={d} style={{ background: '#0D1F0F' }}>{d}</option>
                      ))}
                    </select>
                    {errors[`${idx}-dept`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${idx}-dept`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">{r.step1.phone}</label>
                    <input
                      type="tel"
                      value={m.phone}
                      onChange={e => updateMember(idx, 'phone', e.target.value)}
                      placeholder={r.step1.phonePlaceholder}
                      className="form-input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label">{r.step1.email}</label>
                    <input
                      type="email"
                      value={m.email}
                      onChange={e => updateMember(idx, 'email', e.target.value)}
                      placeholder={r.step1.emailPlaceholder}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="flex-1 glass border border-white/10 text-white font-semibold py-4 rounded-2xl hover:border-white/20 transition-all duration-200"
              >
                {r.step1.back}
              </button>
              <button
                type="button"
                onClick={() => { if (validate1()) setStep(2) }}
                className="flex-[2] bg-kitak-lime text-kitak-dark font-bebas text-xl py-4 rounded-2xl hover:scale-[1.02] transition-all duration-200 tracking-wider"
              >
                {r.step1.next}
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Logo + Submit ── */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-1">{r.step2.title}</h2>
              <p className="text-white/35 text-sm">{r.step2.subtitle}</p>
            </div>

            {/* Drop zone */}
            <div
              className={`glass-green rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center transition-all duration-200 cursor-pointer ${
                dragOver ? 'border-kitak-lime bg-kitak-lime/10 scale-[1.01]' : 'border-white/10 hover:border-kitak-lime/40'
              }`}
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={e => { e.preventDefault(); setDragOver(false); setLogo(e.dataTransfer.files?.[0] ?? null) }}
              onClick={() => fileRef.current?.click()}
            >
              {logoPreview ? (
                <div className="flex flex-col items-center gap-4">
                  <img
                    src={logoPreview}
                    alt="Team logo preview"
                    className="w-32 h-32 object-cover rounded-2xl border-2 border-kitak-lime/40"
                  />
                  <p className="text-kitak-lime font-semibold text-sm">{logoFile?.name}</p>
                  <button
                    type="button"
                    onClick={ev => { ev.stopPropagation(); setLogoFile(null); setLogoPreview(null) }}
                    className="text-white/30 text-xs hover:text-white/60 transition-colors"
                  >
                    {r.step2.removeUpload}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 pointer-events-none">
                  <span className="text-5xl">🏅</span>
                  <p className="text-white/55 font-semibold">{r.step2.dropTitle}</p>
                  <p className="text-white/30 text-sm">{r.step2.dropSub}</p>
                  <p className="text-white/20 text-xs mt-1">{r.step2.dropHint}</p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                name="team-logo"
                accept="image/*"
                className="hidden"
                onChange={e => setLogo(e.target.files?.[0] ?? null)}
              />
            </div>

            {/* Summary */}
            <div className="glass-green rounded-2xl p-6 border border-white/5">
              <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">{r.step2.summaryTitle}</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">{r.step2.teamName}</span>
                  <span className="text-kitak-lime font-semibold">{teamName}</span>
                </div>
                <div className="h-px bg-white/5" />
                {members.map((m, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/40">{i === 0 ? r.step2.captain : `${r.step2.runner} ${i + 1}`}</span>
                    <span className="text-white/65 text-right max-w-[200px] truncate">
                      {m.name || '—'} · {m.department || '—'}
                    </span>
                  </div>
                ))}
                <div className="h-px bg-white/5" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">{r.step2.logo}</span>
                  <span className="text-white/65">{logoFile?.name ?? r.step2.logoEmpty}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 glass border border-white/10 text-white font-semibold py-4 rounded-2xl hover:border-white/20 transition-all duration-200"
              >
                {r.step2.back}
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-shimmer flex-[2] relative overflow-hidden bg-kitak-lime text-kitak-dark font-bebas text-xl py-4 rounded-2xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 tracking-wider lime-glow"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    {r.step2.submitting}
                  </span>
                ) : (
                  r.step2.submit
                )}
              </button>
            </div>

            <p className="text-center text-white/20 text-xs">
              {r.step2.agreement}
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
