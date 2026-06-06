'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

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
    const r = new FileReader()
    r.onloadend = () => setLogoPreview(r.result as string)
    r.readAsDataURL(file)
  }

  const ok0 = teamName.trim().length > 0
  const ok1  = members.every(m => m.name.trim() && m.staffId.trim() && m.department)

  const validate1 = (): boolean => {
    const e: Record<string, string> = {}
    members.forEach((m, i) => {
      if (!m.name.trim())    e[`${i}-name`]   = 'Required'
      if (!m.staffId.trim()) e[`${i}-staffId`] = 'Required'
      if (!m.department)     e[`${i}-dept`]    = 'Required'
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
      router.push(`/success/?team=${encodeURIComponent(teamName)}`)
    } catch {
      setSubmitting(false)
    }
  }

  const STEPS = ['Team Name', 'Members', 'Logo & Submit']

  /* ─ step bar ─ */
  const StepBar = () => (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((label, i) => (
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
          {i < STEPS.length - 1 && (
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
              <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-1">Your Team Identity</h2>
              <p className="text-white/35 text-sm">Give your team a name that strikes fear… or just sounds cool 😄</p>
            </div>

            <div className="glass-green rounded-2xl p-6 sm:p-8 border border-kitak-lime/10">
              <label className="form-label">Team Name *</label>
              <input
                type="text"
                value={teamName}
                onChange={e => setTeamName(e.target.value)}
                placeholder="e.g. Green Rockets, Thunder Boots…"
                className="form-input text-lg"
                maxLength={50}
                autoFocus
              />
              {teamName && (
                <div className="mt-4 p-4 rounded-xl border border-kitak-lime/20 bg-black/20">
                  <span className="text-white/30 text-xs uppercase tracking-wider">Preview</span>
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
              NEXT: ADD YOUR TEAMMATES →
            </button>
          </div>
        )}

        {/* ── STEP 1: Members ── */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-1">Your 4-Person Squad</h2>
              <p className="text-white/35 text-sm">All 4 runners must be filled in — every one counts 💪</p>
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
                    {idx === 0 ? '👑 Team Captain' : `Runner ${idx + 1}`}
                  </h3>
                  {m.name && (
                    <span className="ml-auto text-kitak-lime/50 text-xs font-medium truncate max-w-[120px]">{m.name}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      value={m.name}
                      onChange={e => updateMember(idx, 'name', e.target.value)}
                      placeholder="As per IC / Staff Card"
                      className={`form-input ${ errors[`${idx}-name`] ? 'border-red-500/60' : '' }`}
                    />
                    {errors[`${idx}-name`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${idx}-name`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Staff / Student ID *</label>
                    <input
                      type="text"
                      value={m.staffId}
                      onChange={e => updateMember(idx, 'staffId', e.target.value)}
                      placeholder="e.g. STF0001 / S12345"
                      className={`form-input ${ errors[`${idx}-staffId`] ? 'border-red-500/60' : '' }`}
                    />
                    {errors[`${idx}-staffId`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${idx}-staffId`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Department *</label>
                    <select
                      value={m.department}
                      onChange={e => updateMember(idx, 'department', e.target.value)}
                      className={`form-input appearance-none ${ errors[`${idx}-dept`] ? 'border-red-500/60' : '' }`}
                    >
                      <option value="" disabled>Select department…</option>
                      {DEPARTMENTS.map(d => (
                        <option key={d} value={d} style={{ background: '#0D1F0F' }}>{d}</option>
                      ))}
                    </select>
                    {errors[`${idx}-dept`] && (
                      <p className="text-red-400 text-xs mt-1">{errors[`${idx}-dept`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      value={m.phone}
                      onChange={e => updateMember(idx, 'phone', e.target.value)}
                      placeholder="01X-XXXXXXX"
                      className="form-input"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      value={m.email}
                      onChange={e => updateMember(idx, 'email', e.target.value)}
                      placeholder="name@icatsuc.edu.my"
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
                ← Back
              </button>
              <button
                type="button"
                onClick={() => { if (validate1()) setStep(2) }}
                className="flex-[2] bg-kitak-lime text-kitak-dark font-bebas text-xl py-4 rounded-2xl hover:scale-[1.02] transition-all duration-200 tracking-wider"
              >
                NEXT: TEAM LOGO →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Logo + Submit ── */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-1">Team Logo</h2>
              <p className="text-white/35 text-sm">Upload a logo or mascot — optional but iconic! 🏅</p>
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
                    Remove &amp; upload different
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 pointer-events-none">
                  <span className="text-5xl">🏅</span>
                  <p className="text-white/55 font-semibold">Drop your logo here</p>
                  <p className="text-white/30 text-sm">or click to browse</p>
                  <p className="text-white/20 text-xs mt-1">PNG · JPG · SVG · Max 5 MB</p>
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
              <h3 className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-4">Registration Summary</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Team Name</span>
                  <span className="text-kitak-lime font-semibold">{teamName}</span>
                </div>
                <div className="h-px bg-white/5" />
                {members.map((m, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/40">{i === 0 ? 'Captain' : `Runner ${i + 1}`}</span>
                    <span className="text-white/65 text-right max-w-[200px] truncate">
                      {m.name || '—'} · {m.department || '—'}
                    </span>
                  </div>
                ))}
                <div className="h-px bg-white/5" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Logo</span>
                  <span className="text-white/65">{logoFile?.name ?? 'Not uploaded (optional)'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 glass border border-white/10 text-white font-semibold py-4 rounded-2xl hover:border-white/20 transition-all duration-200"
              >
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-[2] relative overflow-hidden bg-kitak-lime text-kitak-dark font-bebas text-xl py-4 rounded-2xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 tracking-wider lime-glow"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    REGISTERING…
                  </span>
                ) : (
                  '🏃 REGISTER MY TEAM!'
                )}
              </button>
            </div>

            <p className="text-center text-white/20 text-xs">
              By registering you agree to the event rules and STRAVA tracking.
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
