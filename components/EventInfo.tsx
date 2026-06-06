const teamFormat = [
  { icon: '👥', title: '4 Members Per Team',   desc: 'Build your dream squad' },
  { icon: '⚡',  title: 'Mixed Gender',         desc: 'Balanced representation' },
  { icon: '🏢', title: 'Cross-Department',    desc: 'Unite across divisions' },
  { icon: '🎂', title: 'Mixed Age Group',     desc: 'Everyone’s welcome' },
]

const steps = [
  { n: '01', title: 'Register Your Team',   desc: 'Sign up with 4 members, pick a team name, upload your logo' },
  { n: '02', title: 'Run Simultaneously',   desc: 'All 4 members run at the same time for exactly 1 hour' },
  { n: '03', title: 'Track via STRAVA',     desc: 'Distance is auto-logged — every metre counts toward the team total' },
  { n: '04', title: 'Photo Challenge',      desc: 'Complete fun team photo challenges along the route for bonus points' },
]

export default function EventInfo() {
  return (
    <section
      id="event-info"
      className="py-24 px-4"
      style={{ background: 'linear-gradient(180deg, #0D1F0F 0%, #050C06 100%)' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-kitak-lime text-xs font-bold tracking-widest uppercase mb-4">
            The Challenge
          </span>
          <h2 className="font-bebas text-5xl sm:text-7xl text-white mb-4">What Is It?</h2>
          <p className="text-white/55 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            A fun, team-based running event where teams of 4 work together to achieve the longest
            total distance in 1 hour. Run, jog, or walk —{' '}
            <span className="text-kitak-lime font-semibold">every step counts!</span>
          </p>
        </div>

        {/* Team format cards */}
        <div className="mb-16">
          <h3 className="font-bebas text-3xl text-white/40 text-center mb-6 tracking-widest">
            Team Format
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {teamFormat.map((item) => (
              <div
                key={item.title}
                className="glass-green rounded-2xl p-6 text-center hover:border-kitak-lime/30 hover:scale-[1.03] transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-white text-sm mb-1">{item.title}</h4>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 glass rounded-xl p-3 text-center border border-kitak-lime/8">
            <span className="text-white/40 text-sm">No team yet? </span>
            <span className="text-kitak-lime font-semibold text-sm">We’ll assign one for you! 🙌</span>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-16">
          <h3 className="font-bebas text-3xl text-white/40 text-center mb-6 tracking-widest">
            How It Works
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => (
              <div key={s.n} className="relative">
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-[calc(100%+10px)] w-[calc(100%-20px)] h-px"
                    style={{ background: 'linear-gradient(90deg, rgba(168,212,0,0.4), transparent)' }}
                  />
                )}
                <div className="glass-green rounded-2xl p-6 hover:border-kitak-lime/30 transition-all duration-300 h-full">
                  <div className="font-bebas text-5xl leading-none mb-2" style={{ color: 'rgba(168,212,0,0.18)' }}>
                    {s.n}
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
            Strategy + Teamwork ={' '}
            <span className="text-kitak-lime">WIN</span>
          </p>
          <p className="relative text-white/45 mt-3 text-sm sm:text-base">
            Tracked live via STRAVA · Every step adds to your team total
          </p>
        </div>

        {/* Venue link */}
        <div className="mt-12">
          <h3 className="font-bebas text-3xl text-white/40 text-center mb-5 tracking-widest">Event Venue</h3>
          <a
            href="https://maps.google.com/?q=Sarawak+Botanical+Garden+Kuching+Sarawak+Malaysia"
            target="_blank"
            rel="noopener noreferrer"
            className="block glass-green rounded-2xl p-6 border border-white/5 hover:border-kitak-lime/30 hover:scale-[1.01] transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-kitak-lime/10 flex items-center justify-center text-2xl flex-shrink-0">
                📍
              </div>
              <div className="flex-1 text-left">
                <p className="font-bold text-white">Sarawak Botanical Garden</p>
                <p className="text-white/45 text-sm">Kuching, Sarawak, Malaysia</p>
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
      </div>
    </section>
  )
}
