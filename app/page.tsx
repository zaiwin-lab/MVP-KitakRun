import HeroSection from '@/components/HeroSection'
import EventInfo from '@/components/EventInfo'
import PrizesSection from '@/components/PrizesSection'
import SocialSection from '@/components/SocialSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-kitak-dark">
      {/*
        Hidden Netlify form — Netlify's build bot crawls HTML for
        data-netlify forms. This ghost form must list every field name
        so the bot registers them before the JS-powered form runs.
      */}
      <form
        name="team-registration"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        hidden
        encType="multipart/form-data"
      >
        <input type="text"  name="team-name" />
        <input type="text"  name="member-1-name" />
        <input type="text"  name="member-1-id" />
        <input type="text"  name="member-1-dept" />
        <input type="tel"   name="member-1-phone" />
        <input type="email" name="member-1-email" />
        <input type="text"  name="member-2-name" />
        <input type="text"  name="member-2-id" />
        <input type="text"  name="member-2-dept" />
        <input type="tel"   name="member-2-phone" />
        <input type="email" name="member-2-email" />
        <input type="text"  name="member-3-name" />
        <input type="text"  name="member-3-id" />
        <input type="text"  name="member-3-dept" />
        <input type="tel"   name="member-3-phone" />
        <input type="email" name="member-3-email" />
        <input type="text"  name="member-4-name" />
        <input type="text"  name="member-4-id" />
        <input type="text"  name="member-4-dept" />
        <input type="tel"   name="member-4-phone" />
        <input type="email" name="member-4-email" />
        <input type="file"  name="team-logo" />
      </form>

      <HeroSection />
      <EventInfo />
      <PrizesSection />
      <SocialSection />
    </main>
  )
}
