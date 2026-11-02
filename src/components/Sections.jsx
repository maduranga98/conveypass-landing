import { Check, Icon } from './Icons.jsx'
import { DEMO_MAIL, stats, pains, features } from '../data.js'

export const Nav = () => (
  <header className="sticky top-0 z-20 border-b border-line bg-white">
    <div className="wrap flex flex-wrap items-center justify-between gap-4 py-[18px]">
      <a href="#top" className="flex items-center gap-2.5">
        <img src="/logo.jpg" alt="ConvoyPass logo" width="32" height="32" className="block h-8 w-8" />
        <span className="font-head text-[21px] font-extrabold text-navy">Convoy<span className="text-amber">Pass</span></span>
      </a>
      <nav className="flex flex-wrap items-center gap-x-[30px] gap-y-2">
        {[['#features', 'Features'], ['#how-it-works', 'How it works'], ['#pricing', 'Pricing']].map(([h, t]) => (
          <a key={h} href={h} className="text-sm font-semibold text-ink hover:text-amber-dark">{t}</a>
        ))}
        <a href="#demo" className="btn btn-amber !px-[22px] !py-2.5 !text-sm">Book a demo</a>
      </nav>
    </div>
  </header>
)

export const Hero = () => (
  <section id="top" className="relative flex min-h-[560px] items-center overflow-hidden">
    <img src="/img1.jpg" alt="Security officer checking a driver at an industrial site gate, with a cement truck waiting at the barrier" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
    <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(15,27,43,.94)_0%,rgba(15,27,43,.82)_42%,rgba(15,27,43,.35)_75%,rgba(15,27,43,.15)_100%)]" />
    <div className="wrap relative py-24">
      <div className="flex max-w-[600px] flex-col gap-6">
        <div className="eyebrow animate-rise !text-amber">Vehicle &amp; contractor gate control</div>
        <h1 className="animate-rise text-[clamp(32px,4.6vw,50px)] font-extrabold leading-[1.12] text-white [animation-delay:.1s]">Stop guessing who's on your site</h1>
        <p className="animate-rise text-[17px] leading-relaxed text-[#D7DCE4] [animation-delay:.2s]">ConvoyPass replaces paper gate logs with a governed digital record — blocking unlicensed drivers, uninsured vehicles, and expired gate passes before they ever reach your yard.</p>
        <div className="mt-1.5 flex animate-rise flex-wrap gap-3.5 [animation-delay:.3s]">
          <a href="#demo" className="btn btn-amber">Book a demo</a>
          <a href="#pricing" className="btn btn-ghost">See pricing</a>
        </div>
      </div>
    </div>
  </section>
)

export const Stats = () => (
  <section className="border-t border-white/10 bg-navy">
    <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-5 py-7">
      {stats.map(([big, small]) => (
        <div key={big}>
          <div className="font-head text-[26px] font-extrabold text-white">{big}</div>
          <div className="text-[13px] text-[#9AA4B2]">{small}</div>
        </div>
      ))}
    </div>
  </section>
)

export const Pain = () => (
  <section>
    <div className="wrap py-[76px]">
      <div className="mx-auto mb-12 max-w-[620px] text-center">
        <h2 className="h2 mb-3">Your gate log is a liability, not a record</h2>
        <p className="text-base text-slate">Paper and spreadsheets can't stop a problem before it walks in.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
        {pains.map((p) => (
          <div key={p.title} className="rounded-2xl bg-cloud p-[30px]">
            <div className="mb-[18px] flex h-[42px] w-[42px] items-center justify-center rounded-[10px] bg-amber-pale text-amber-dark"><Icon name={p.icon} /></div>
            <h3 className="mb-2.5 text-[17px] font-bold text-navy">{p.title}</h3>
            <p className="text-sm leading-relaxed text-slate">{p.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

const Split = ({ id, bg, reverse, img, alt, eyebrow, title, body, bullets }) => (
  <section id={id} className={bg}>
    <div className={`wrap flex ${reverse ? 'flex-wrap-reverse' : 'flex-wrap'} items-center gap-14 py-20`}>
      <div className={`aspect-square min-w-[300px] flex-[1_1_440px] overflow-hidden rounded-2xl shadow-[0_24px_60px_-24px_rgba(15,27,43,.35)] ${reverse ? 'order-2' : ''}`}>
        <img src={img} alt={alt} loading="lazy" className="block h-full w-full object-cover" />
      </div>
      <div className="flex min-w-[300px] flex-[1_1_420px] flex-col gap-[18px]">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="font-head text-[clamp(24px,3vw,32px)] font-extrabold leading-tight text-navy">{title}</h2>
        <p className="text-[15.5px] leading-[1.7] text-slate">{body}</p>
        <ul className="mt-2 flex flex-col gap-3">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2.5 text-[14.5px] text-ink"><Check className="mt-0.5 h-[18px] w-[18px] shrink-0 text-amber" />{b}</li>
          ))}
        </ul>
      </div>
    </div>
  </section>
)

export const Splits = () => (
  <>
    <Split id="how-it-works" bg="bg-cloud" img="/img2.jpg" alt="Security guard scanning a QR-coded gate pass on a truck windshield with a smartphone"
      eyebrow="At the gate · entry" title="A gate pass that scans in seconds"
      body="Every monthly gate pass carries a unique QR code. Security scans it on a phone camera — no lookup, no paperwork — and the system checks license, insurance, and eligibility behind the scan in real time."
      bullets={['Instant pass/fail at the barrier, not after an incident', "No proprietary scanners — works on any guard's phone", 'Every scan logged automatically for audits']} />
    <Split reverse img="/img3.jpg" alt="Driver handing his license to a security officer at a factory gate booth"
      eyebrow="Compliance · eligibility" title="Documents checked before anyone's waved through"
      body="License, vehicle insurance, and gate pass validity are verified automatically the moment a driver checks in — flagged issues can suspend a driver or vehicle instantly, with photo evidence attached for supervisor review."
      bullets={['Expired documents block entry automatically', 'Configurable penalty and suspension workflows', 'One inspection clears multiple trips']} />
  </>
)

export const Features = () => (
  <section id="features" className="bg-cloud">
    <div className="wrap py-20">
      <div className="mx-auto mb-12 max-w-[620px] text-center">
        <h2 className="h2 mb-3">Everything the gate needs to say no automatically</h2>
        <p className="text-base text-slate">Six compliance modules, already running on a live industrial site.</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-5">
        {features.map(([t, b]) => (
          <div key={t} className="rounded-2xl border border-line bg-white p-7">
            <h3 className="mb-2 text-base font-bold text-navy">{t}</h3>
            <p className="text-sm leading-relaxed text-slate">{b}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export const Band = () => (
  <section className="relative flex min-h-[340px] items-center">
    <img src="/img4.jpg" alt="Aerial view of an industrial logistics warehouse yard with rows of trucks at loading docks" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,27,43,.92)_0%,rgba(15,27,43,.55)_60%,rgba(15,27,43,.25)_100%)]" />
    <div className="wrap relative py-14">
      <div className="eyebrow mb-2.5 !text-amber">Already running</div>
      <p className="max-w-[680px] font-head text-[clamp(20px,2.6vw,28px)] font-bold leading-snug text-white">Live at an industrial manufacturing site today — handling real vehicle and driver compliance, not a prototype.</p>
    </div>
  </section>
)

export const Pricing = () => (
  <section id="pricing">
    <div className="wrap py-20">
      <div className="mx-auto mb-12 max-w-[560px] text-center">
        <h2 className="h2 mb-3">Priced for your fleet, not your headcount</h2>
        <p className="text-base text-slate">No per-user fees. Guard and driver turnover never costs you more.</p>
      </div>
      <div className="mx-auto grid max-w-[780px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        <div className="rounded-2xl bg-navy p-9">
          <span className="mb-[18px] inline-block rounded-full bg-amber/20 px-3 py-1 text-xs font-bold text-amber">FLAT RATE</span>
          <div className="mb-1 font-head text-4xl font-extrabold text-white">$49–99<span className="text-[15px] font-medium text-[#9AA4B2]">/site/mo</span></div>
          <p className="mb-[26px] text-sm text-[#9AA4B2]">One price per site, whatever your fleet size.</p>
          <a href="#demo" className="btn btn-amber block text-center">Book a demo</a>
        </div>
        <div className="rounded-2xl border border-line bg-white p-9">
          <span className="mb-[18px] inline-block rounded-full bg-cloud px-3 py-1 text-xs font-bold text-slate">PER VEHICLE</span>
          <div className="mb-1 font-head text-4xl font-extrabold text-navy">$29<span className="text-[15px] font-medium text-slate">/mo base</span></div>
          <p className="mb-[26px] text-sm text-slate">+ $0.50–1.00 per registered vehicle.</p>
          <a href="#demo" className="btn btn-outline block text-center">Book a demo</a>
        </div>
      </div>
    </div>
  </section>
)

export const Cta = () => (
  <section id="demo" className="relative flex min-h-[420px] items-center">
    <img src="/img1.jpg" alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover [object-position:center_30%]" />
    <div className="absolute inset-0 bg-navy/90" />
    <div className="relative mx-auto flex max-w-[640px] flex-col items-center gap-5 px-6 py-[84px] text-center">
      <h2 className="font-head text-[clamp(26px,3.6vw,38px)] font-extrabold text-white">See it running on a real gate</h2>
      <p className="text-base leading-relaxed text-[#D7DCE4]">Book a 20-minute demo and we'll walk you through a live site handling real drivers and vehicles.</p>
      <a href={DEMO_MAIL} className="btn btn-amber mt-2">Book a demo</a>
    </div>
  </section>
)

export const Footer = () => (
  <footer className="bg-white">
    <div className="wrap flex flex-wrap items-center justify-between gap-4 py-9">
      <div className="flex items-center gap-2.5">
        <img src="/logo.jpg" alt="" width="24" height="24" className="h-6 w-6" />
        <span className="text-sm text-slate">ConvoyPass — vehicle gate-pass &amp; contractor tracking for SMB industrial sites.</span>
      </div>
      <div className="flex gap-5 text-[13px] text-slate">
        <a href="#features" className="hover:text-amber-dark">Features</a>
        <a href="#pricing" className="hover:text-amber-dark">Pricing</a>
        <a href="mailto:info@lumoraventures.com" className="hover:text-amber-dark">Contact</a>
      </div>
    </div>
    <div className="wrap pb-7 text-xs text-slate">© 2026 ConvoyPass, a product of Lumora Ventures.</div>
  </footer>
)
