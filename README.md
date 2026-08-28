# Run Kitak Run — Team Event Registration Experience

> **Maturity: historical event prototype on a development branch — not a live registration system**

Run Kitak Run is a multilingual team-event discovery and registration experience designed to make a community run easy to understand, share and administer. The code demonstrates a polished static journey, but the event information dated **18 July 2026** is now historical and is not evidence that the event, prizes, route or affiliations were approved or delivered.

The application source is on the public [development branch](https://github.com/zaiwin-lab/MVP-KitakRun/tree/claude/tourism-mvp-plan-BJvMk). The default branch contains this portfolio documentation only. No public live demonstration was reliably verified during this review.

## Business problem

Community events need a clear mobile-first journey for participants, multilingual information for diverse audiences and a manageable way for organisers to review team registrations. Static campaign sites can cover the discovery layer quickly, but registration confirmation and participant safety require reliable operational systems behind them.

## Intended users

- prospective runners and team captains
- community-event organisers
- registration and communications teams
- sponsors or stakeholders reviewing a campaign concept

These are intended user groups, not evidence of registrations, attendance, sponsorship or institutional involvement.

## What the prototype demonstrates

The development branch contains:

- a responsive event landing page with countdown, schedule, event information and prize presentation
- Bahasa Malaysia, English, Mandarin and Iban interface content
- a team-registration form with optional team members and logo upload
- a Netlify Forms-style submission request
- same-device browser storage for demonstration records
- an administrative view with search and XLSX export
- WhatsApp calls to action
- a static Next.js export configured for Netlify

The experience demonstrates front-end journey design and local administrative tooling. It does not demonstrate a central participant database, verified payment, email delivery, identity verification, race operations or an authenticated multi-user administration system.

## Strategic value

The concept shows how a multilingual event campaign can reduce registration friction and give organisers a reusable information architecture. A production implementation could become an auditable participant-operations layer only after approved event content, central data management and safety controls are added.

## Technology

- Next.js 14, React 18 and TypeScript
- Tailwind CSS
- static export for Netlify
- Netlify Forms submission pattern
- browser localStorage and sessionStorage
- SheetJS for spreadsheet export

No runtime AI or machine-learning capability was found in the inspected implementation.

## Delivery role

Product direction, participant-journey design and prototype delivery were led by **Ts. Zaiwin Kassim** with the **KOBIS AI Prodigy Team**. This does not establish endorsement, sponsorship or approval by any organisation named in the demonstration content.

## Responsible use and limitations

- **Treat all event details as unverified historical demonstration content.** Date, venue, route, checkpoints, prizes, organisers and institutional references require written owner approval before republication.
- **Do not accept live registrations through the current prototype.** Repository evidence does not establish a central, access-controlled registration database.
- **Confirmation is not proof of acceptance.** The success screen can present a confirmed state without repository evidence of organiser review or a transactional email service.
- **The administrative view is local and client-controlled.** Same-device browser records and client-side credentials are unsuitable for real participant operations.
- **Personal data needs formal governance.** Production use requires explicit consent, a privacy notice, role-based access, retention/deletion rules, secure file handling and an incident process.
- **Participant safety sits outside this interface.** Route approval, medical planning, waivers, age rules, emergency contacts, accessibility and insurance need qualified operational owners.
- **Translations need human validation.** Public event instructions should be reviewed by fluent speakers, especially safety and eligibility wording.

## Evidence boundary

This README records the behaviour visible in the repository and development branch. It does not claim that the event occurred, that registrations were received, or that any metric, prize, sponsor, partner, affiliation or operational outcome is verified.
