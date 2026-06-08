'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import { useLanguage } from '@/lib/i18n'

const AUTH_KEY = 'rkr-admin-auth'
const ADMIN_USER = 'admin'
const ADMIN_PASS = '123456'

interface Member {
  name: string
  staffId: string
  department: string
  phone: string
  email: string
}

interface Registration {
  teamName: string
  members: Member[]
  teamSize: number
  logoName: string | null
  submittedAt: string
}

function loadRegistrations(): Registration[] {
  try {
    const raw = localStorage.getItem('rkr-registrations')
    return raw ? (JSON.parse(raw) as Registration[]) : []
  } catch {
    return []
  }
}

/* ───────────────────── Login ───────────────────── */

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useLanguage()
  const a = t.admin
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      try { sessionStorage.setItem(AUTH_KEY, 'true') } catch { /* ignore */ }
      setError(false)
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <main className="min-h-screen bg-kitak-dark flex flex-col">
      <SiteHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-kitak-lime/10 border border-kitak-lime/20 flex items-center justify-center text-2xl">
              🔐
            </div>
            <h1 className="font-bebas text-4xl text-white mb-1">{a.loginTitle}</h1>
            <p className="text-white/35 text-sm">{a.loginSubtitle}</p>
          </div>

          <form onSubmit={submit} className="glass-green rounded-2xl p-6 sm:p-8 border border-kitak-lime/10 space-y-4">
            <div>
              <label className="form-label">{a.username}</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="form-input"
                autoFocus
                autoComplete="username"
              />
            </div>
            <div>
              <label className="form-label">{a.password}</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input"
                autoComplete="current-password"
              />
            </div>
            {error && <p className="text-red-400 text-xs">{a.loginError}</p>}
            <button
              type="submit"
              className="w-full bg-kitak-lime text-kitak-dark font-bebas text-xl py-3.5 rounded-2xl hover:scale-[1.02] transition-all duration-200 tracking-wider lime-glow"
            >
              {a.loginButton}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-white/30 hover:text-kitak-lime text-sm transition-colors">
              {a.backToSite}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

/* ───────────────────── Dashboard ───────────────────── */

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const { t } = useLanguage()
  const a = t.admin
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setRegistrations(loadRegistrations())
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return registrations
    return registrations.filter(reg => {
      const haystack = [
        reg.teamName,
        ...reg.members.flatMap(m => [m.name, m.phone, m.email]),
      ].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [registrations, search])

  const totalRunners = useMemo(
    () => registrations.reduce((sum, reg) => sum + reg.teamSize, 0),
    [registrations]
  )

  const exportToExcel = async () => {
    const XLSX = await import('xlsx')
    const rows = filtered.map(reg => {
      const captain = reg.members[0]
      return {
        [a.colTeamName]: reg.teamName,
        [a.colCaptain]:  captain?.name ?? '',
        [a.colContact]:  captain?.phone ?? '',
        [a.colEmail]:    captain?.email ?? '',
        [a.colMembers]:  reg.members.map(m => m.name).filter(Boolean).join(', '),
        [a.colDate]:     new Date(reg.submittedAt).toLocaleString(),
      }
    })
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Registrations')
    XLSX.writeFile(wb, `run-kitak-run-registrations-${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const logout = () => {
    try { sessionStorage.removeItem(AUTH_KEY) } catch { /* ignore */ }
    onLogout()
  }

  return (
    <main className="min-h-screen bg-kitak-dark">
      <SiteHeader />
      <div className="px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-bebas text-4xl sm:text-5xl text-white">{a.dashboardTitle}</h1>
              <p className="text-white/35 text-sm mt-1">Run Kitak Run 2026 · 18 July 2026</p>
            </div>
            <button
              onClick={logout}
              className="self-start sm:self-auto glass border border-white/10 text-white/60 hover:text-white text-sm font-medium px-4 py-2 rounded-xl hover:border-white/20 transition-all duration-200"
            >
              {a.logout}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <div className="glass-green rounded-2xl p-5 border border-kitak-lime/10">
              <p className="text-white/35 text-xs uppercase tracking-widest font-semibold mb-1">{a.totalTeams}</p>
              <p className="font-bebas text-3xl text-kitak-lime">{registrations.length}</p>
            </div>
            <div className="glass-green rounded-2xl p-5 border border-kitak-lime/10">
              <p className="text-white/35 text-xs uppercase tracking-widest font-semibold mb-1">{a.totalRunners}</p>
              <p className="font-bebas text-3xl text-kitak-lime">{totalRunners}</p>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={a.searchPlaceholder}
              className="form-input flex-1"
            />
            <button
              onClick={exportToExcel}
              disabled={filtered.length === 0}
              className="btn-shimmer relative overflow-hidden flex items-center justify-center gap-2 bg-kitak-lime text-kitak-dark font-bold text-sm px-5 py-3 rounded-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 lime-glow whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center gap-2">
                📊 {a.exportButton}
              </span>
            </button>
          </div>

          {/* Table */}
          {filtered.length === 0 ? (
            <div className="glass rounded-2xl p-10 border border-white/5 text-center">
              <p className="text-white/40 font-semibold mb-1">{a.noResults}</p>
              <p className="text-white/25 text-sm">{a.noResultsHint}</p>
            </div>
          ) : (
            <div className="glass-green rounded-2xl border border-white/5 overflow-x-auto">
              <table className="w-full text-sm min-w-[760px]">
                <thead>
                  <tr className="border-b border-white/10 text-white/40 text-xs uppercase tracking-wider">
                    <th className="text-left px-5 py-4 font-semibold">{a.colTeamName}</th>
                    <th className="text-left px-5 py-4 font-semibold">{a.colCaptain}</th>
                    <th className="text-left px-5 py-4 font-semibold">{a.colContact}</th>
                    <th className="text-left px-5 py-4 font-semibold">{a.colEmail}</th>
                    <th className="text-left px-5 py-4 font-semibold">{a.colMembers}</th>
                    <th className="text-left px-5 py-4 font-semibold">{a.colDate}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((reg, i) => {
                    const captain = reg.members[0]
                    return (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4 font-semibold text-kitak-lime whitespace-nowrap">{reg.teamName}</td>
                        <td className="px-5 py-4 text-white/75 whitespace-nowrap">{captain?.name || '—'}</td>
                        <td className="px-5 py-4 text-white/55 whitespace-nowrap">{captain?.phone || '—'}</td>
                        <td className="px-5 py-4 text-white/55 whitespace-nowrap">{captain?.email || '—'}</td>
                        <td className="px-5 py-4 text-white/55 max-w-[260px] truncate">
                          {reg.members.map(m => m.name).filter(Boolean).join(', ') || '—'}
                        </td>
                        <td className="px-5 py-4 text-white/40 whitespace-nowrap">
                          {new Date(reg.submittedAt).toLocaleString()}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

/* ───────────────────── Page ───────────────────── */

export default function AdminPage() {
  const [authed, setAuthed]   = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    try {
      setAuthed(sessionStorage.getItem(AUTH_KEY) === 'true')
    } catch { /* ignore */ }
    setChecked(true)
  }, [])

  if (!checked) return null

  return authed
    ? <Dashboard onLogout={() => setAuthed(false)} />
    : <LoginForm onSuccess={() => setAuthed(true)} />
}
