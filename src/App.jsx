import { useEffect, useRef, useState } from 'react'

/* ---------------------------------- data ---------------------------------- */

const MARQUEE_ITEMS = [
  'GRAPHIC DESIGN',
  'PHOTOGRAPHY',
  'MARKETING',
  'UI / UX',
  'CONTENT CREATION',
  'COPYWRITING',
  'ART DIRECTION',
  'STORYTELLING',
]

const STATS = [
  { value: 'CUM LAUDE', label: 'BACHELOR HONORS' },
  { value: 'TOEFL 550', label: 'ENGLISH SCORE' },
  { value: '30+', label: 'PARTICIPANTS MENTORED' },
  { value: '6+', label: 'CREATIVE DISCIPLINES' },
]

const EDUCATION = [
  {
    degree: 'Master of Management',
    major: 'Marketing',
    school: 'Universitas Brawijaya',
    place: 'Malang, Indonesia',
    period: 'Aug 2023 — Present',
    note: 'Fast-track program from Bachelor of Information Systems to Master of Marketing Management — outstanding academic & interdisciplinary track.',
    tag: 'M.M.',
  },
  {
    degree: 'Bachelor of Information Systems',
    major: 'Information Systems',
    school: 'Universitas Brawijaya',
    place: 'Malang, Indonesia',
    period: 'Aug 2020 — Apr 2024',
    note: 'Honors: Cum Laude — Graduated with Honors.',
    tag: 'S.Kom.',
    highlight: true,
  },
]

const CERTIFICATIONS = [
  /* ----------------------------- Hacktiv8 Indonesia ---------------------------- */
  {
    group: 'Hacktiv8 Indonesia',
    name: 'AI for Work & Career Readiness with Google AI Products',
    date: 'Apr 2026',
    tag: '01760/H8/CSR/MBA2/IV/2026',
  },
  /* --------------------------------- Coursera --------------------------------- */
  {
    group: 'Coursera',
    name: 'Getting Started with Microsoft Excel — Certificate of Accomplishment',
    date: 'Apr 2026',
    tag: 'MRJ1EIKCEJHJ',
  },
  /* --------------------------- Google Cloud Skills Boost ----------------------- */
  {
    group: 'Google Cloud Skills Boost',
    name: 'Google Cloud Computing Foundations: Cloud Computing Fundamentals',
    date: 'Mar 2023',
    tag: '3304050',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Google Cloud Computing Foundations: Networking',
    date: 'Mar 2023',
    tag: '3343341',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Google Cloud Computing Foundations: Infrastructure in Google Cloud',
    date: 'Apr 2023',
    tag: '3443174',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Google Cloud Computing Foundations: Data, ML, and AI in Google Cloud',
    date: 'Apr 2023',
    tag: '3475138',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Create and Manage Cloud Resources',
    date: 'Apr 2023',
    tag: '3475293',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Preparing for Your Associate Cloud Engineer Journey',
    date: 'Apr 2023',
    tag: '3552732',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Build and Secure Networks in Google Cloud',
    date: 'May 2023',
    tag: '3622870',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Perform Foundational Infrastructure Tasks in Google Cloud',
    date: 'May 2023',
    tag: '3622929',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Perform Foundational Data, ML, and AI Tasks in Google Cloud',
    date: 'May 2023',
    tag: '3623202',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Google Cloud Fundamentals: Core Infrastructure',
    date: 'May 2023',
    tag: '3652141',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Essential Google Cloud Infrastructure: Foundation',
    date: 'May 2023',
    tag: '3666650',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Essential Google Cloud Infrastructure: Core Services',
    date: 'May 2023',
    tag: '3675916',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Getting Started with Terraform for Google Cloud',
    date: 'May 2023',
    tag: '3676145',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Elastic Google Cloud Infrastructure: Scaling and Automation',
    date: 'May 2023',
    tag: '3679482',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Getting Started with Google Kubernetes Engine',
    date: 'May 2023',
    tag: '3682850',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Set Up and Configure a Cloud Environment in Google Cloud',
    date: 'May 2023',
    tag: '3687793',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Automating Infrastructure on Google Cloud with Terraform',
    date: 'May 2023',
    tag: '3696637',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Logging, Monitoring and Observability in Google Cloud',
    date: 'May 2023',
    tag: '3706258',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Hybrid Cloud: Modernizing Applications with Anthos',
    date: 'May 2023',
    tag: '3727418',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Deploy to Kubernetes in Google Cloud',
    date: 'May 2023',
    tag: '3740034',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Serverless Cloud Run Development',
    date: 'May 2023',
    tag: '3744246',
  },
  {
    group: 'Google Cloud Skills Boost',
    name: 'Application Development with Cloud Run',
    date: 'May 2023',
    tag: '3755210',
  },
  /* ------------------------------ Dicoding Indonesia --------------------------- */
  {
    group: 'Dicoding Indonesia',
    name: 'Menjadi Google Cloud Engineer',
    date: 'May 2023',
    tag: 'L4PQG95ROZO1',
    note: 'Expired May 2026.',
  },
  {
    group: 'Dicoding Indonesia',
    name: 'Memulai Dasar Pemrograman untuk Menjadi Pengembang Software',
    date: 'Feb 2023',
    tag: '07Z6VLYDJXQR',
    note: 'Expired Feb 2026.',
  },
  {
    group: 'Dicoding Indonesia',
    name: 'Belajar Dasar Pemrograman Web',
    date: 'Mar 2023',
    tag: 'JMZVN7JLOPN9',
    note: 'Expired Mar 2026.',
  },
  {
    group: 'Dicoding Indonesia',
    name: 'Belajar Dasar Pemrograman JavaScript',
    date: 'Mar 2023',
    tag: 'N9ZO4W7G0ZG5',
    note: 'Expired Mar 2026.',
  },
  {
    group: 'Dicoding Indonesia',
    name: 'Belajar Membuat Aplikasi Back-End untuk Pemula dengan Google Cloud',
    date: 'Apr 2023',
    tag: 'N9ZO63WG8XG5',
    note: 'Expired Apr 2026.',
  },
]

const EXPERIENCE = [
  {
    role: 'Head of Human Resource Development (PSDM)',
    org: 'OPTIIK — Photography & Design Organization',
    place: 'Universitas Brawijaya · Malang',
    period: 'Mar 2022 — Jan 2023',
    index: '01',
    points: [
      'Directed internal orientation programs for 30+ participants, deepening their grasp of photography & design while building team cohesion.',
      'Conceptualized skill-building workshops & competition prep classes with professional graphic-design and photography tutors.',
      'Monitored and evaluated division heads, delivering feedback that lifted team productivity and member competency.',
    ],
  },
  {
    role: 'Project Manager — OPTIIK Young Impact',
    org: 'OPTIIK — Photography & Design Organization',
    place: 'Universitas Brawijaya · Malang',
    period: '2022',
    index: '02',
    points: [
      'Curated and reviewed creative outputs, giving feedback to keep a consistent visual identity.',
      'Oversaw visual branding and content direction for the event.',
      'Directed design & documentation teams toward a cohesive creative output.',
      'Led end-to-end coordination — managing divisions, tracking milestones, and driving on-site problem-solving.',
    ],
  },
]

const SKILLS = [
  {
    title: 'Design & UI/UX',
    items: ['Figma', 'Canva', 'PowerPoint', 'Wireframing', 'Prototyping', 'User Research', 'Graphic Design'],
  },
  {
    title: 'Marketing & Content',
    items: ['Social Media Management', 'Content Creation', 'Copywriting', 'Marketing Strategy'],
  },
  {
    title: 'AI-Assisted Creation',
    items: ['Prompt Writing', 'ChatGPT', 'Midjourney', 'Gemini', 'AI Copywriting', 'AI Image Generation'],
  },
  {
    title: 'Video & Languages',
    items: ['CapCut', 'Indonesian — Native', 'English — Intermediate / Advanced'],
  },
]

/* -------------------------------- utilities ------------------------------- */

function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, visible]
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setProgress(max > 0 ? h.scrollTop / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return progress
}

/* ------------------------------- components ------------------------------- */

function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function SectionHeading({ index, label, dark = false }) {
  return (
    <Reveal className="section-heading">
      <span className="section-heading__index">{index}</span>
      <span className="section-heading__line" />
      <span className="section-heading__label">{label}</span>
      <span className="section-heading__mark">{dark ? '●' : '○'}</span>
    </Reveal>
  )
}

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, i) => (
          <span className="marquee__item" key={i}>
            {item}
            <span className="marquee__star">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Hero() {
  const progress = useScrollProgress()
  return (
    <section className="hero" id="top">
      <div className="scroll-progress">
        <div className="scroll-progress__bar" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className="hero__meta">
        <span>PORTFOLIO — VOL. 2026</span>
        <span className="hero__meta-right">BASED IN MALANG, ID</span>
      </div>

      <div className="hero__body">
        <Reveal className="hero__line hero__line--1">
          <span>DENNIS</span>
          <span className="hero__asterisk spin-slow">✳</span>
        </Reveal>
        <Reveal className="hero__line hero__line--2" delay={120}>
          HANS
        </Reveal>
        <Reveal className="hero__line hero__line--3" delay={240}>
          <span className="hero__outline">ALBERTIAN</span>
        </Reveal>
      </div>

      <div className="hero__footer">
        <Reveal className="hero__intro" delay={300}>
          <p className="hero__role">
            GRAPHIC DESIGN — MARKETING STRATEGY
          </p>
          <p className="hero__desc">
            Creative & detail-oriented systems thinker bridging design aesthetics with marketing
            strategy to craft audience-driven stories.
          </p>
        </Reveal>
        <Reveal className="hero__scroll" delay={400}>
          <span className="hero__scroll-text">SCROLL TO EXPLORE</span>
          <span className="hero__scroll-arrow">↓</span>
        </Reveal>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="section section--light" id="about">
      <SectionHeading index="01" label="PROFILE" />
      <div className="about">
        <Reveal className="about__statement">
          <p>
            I work at the intersection of <em>design & marketing</em> — turning clean visual
            systems into stories people actually feel.
          </p>
        </Reveal>
        <Reveal className="about__body" delay={120}>
          <p>
            Creative and detail-oriented Information Systems graduate currently pursuing a Master's
            degree in Marketing Management, with a strong foundation in graphic design, photography,
            and digital content creation. Experienced in social media management, copywriting, and
            visual storytelling through organizational leadership in a photography and design
            community.
          </p>
          <p>
            Skilled in bridging design aesthetics with marketing strategy to produce engaging,
            audience-driven content across digital platforms.
          </p>
        </Reveal>
      </div>
      <div className="stats">
        {STATS.map((s, i) => (
          <Reveal className="stat" delay={i * 90} key={s.label}>
            <span className="stat__value">{s.value}</span>
            <span className="stat__label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="section section--dark" id="education">
      <SectionHeading index="02" label="EDUCATION" dark />
      <div className="list">
        {EDUCATION.map((e, i) => (
          <Reveal className="row" delay={i * 100} key={e.degree}>
            <div className="row__top">
              <span className="row__tag">{e.tag}</span>
              <span className="row__period">{e.period}</span>
            </div>
            <h3 className="row__title">
              {e.degree} <span className="row__title-muted">/ {e.major}</span>
            </h3>
            <div className="row__bottom">
              <p className="row__school">{e.school} — {e.place}</p>
              <p className="row__note">{e.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Certifications() {
  const [expanded, setExpanded] = useState(false)

  const groups = CERTIFICATIONS.reduce((acc, c) => {
    if (!acc.includes(c.group)) acc.push(c.group)
    return acc
  }, [])

  const visibleCerts = expanded ? CERTIFICATIONS : CERTIFICATIONS.slice(0, 3)
  const visibleGroups = groups
    .map((group) => ({
      group,
      total: CERTIFICATIONS.filter((c) => c.group === group).length,
      certs: visibleCerts.filter((c) => c.group === group),
    }))
    .filter((g) => g.certs.length > 0)

  return (
    <section className="section section--dark" id="certifications">
      <SectionHeading index="03" label="CERTIFICATIONS" dark />
      {visibleGroups.map(({ group, certs, total }) => (
        <div className="cert-group" key={group}>
          <Reveal className="cert-group__head">
            <span className="cert-group__name">{group}</span>
            <span className="cert-group__count">
              {certs.length < total
                ? `SHOWING ${certs.length} OF ${total}`
                : `${total} CREDENTIAL${total === 1 ? '' : 'S'}`}
            </span>
          </Reveal>
          <div className="list">
            {certs.map((c, i) => (
              <Reveal className="row row--cert" delay={(i % 4) * 80} key={c.name}>
                <div className="row__top">
                  <span className="row__tag">ID — {c.tag}</span>
                  <span className="row__period">{c.date}</span>
                </div>
                <h3 className="row__title">{c.name}</h3>
                <div className="row__bottom">
                  <p className="row__school">{c.org}</p>
                  {c.note && <p className="row__note">{c.note}</p>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      ))}

      {CERTIFICATIONS.length > 3 && (
        <Reveal className="cert-more">
          <button
            type="button"
            className="cert-more__btn"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? 'SHOW LESS ↑' : `SHOW ALL ${CERTIFICATIONS.length} CERTIFICATIONS ↓`}
          </button>
        </Reveal>
      )}
    </section>
  )
}

function Experience() {
  return (
    <section className="section section--light" id="experience">
      <SectionHeading index="04" label="LEADERSHIP" />
      <div className="exp">
        {EXPERIENCE.map((x, i) => (
          <Reveal className="exp__item" delay={i * 100} key={x.index}>
            <div className="exp__head">
              <span className="exp__index">{x.index}</span>
              <div className="exp__titles">
                <h3 className="exp__role">{x.role}</h3>
                <p className="exp__org">{x.org}</p>
              </div>
              <div className="exp__meta">
                <span>{x.period}</span>
                <span>{x.place}</span>
              </div>
            </div>
            <ul className="exp__points">
              {x.points.map((p, j) => (
                <li key={j}>
                  <span className="exp__dash">—</span> {p}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section section--dark" id="skills">
      <SectionHeading index="05" label="CAPABILITIES" dark />
      <div className="skills">
        {SKILLS.map((group, i) => (
          <Reveal className="skills__group" delay={i * 90} key={group.title}>
            <h3 className="skills__title">{group.title}</h3>
            <ul className="skills__tags">
              {group.items.map((item) => (
                <li className="skill" key={item}>
                  <span className="skill__dot" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
      <Reveal className="skills__footnote" delay={200}>
        <span>✦</span>
        <p>
          Currently deepening marketing strategy, visual branding, and AI-assisted content workflows
          — always in monochrome.
        </p>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <SectionHeading index="06" label="CONTACT" />
      <Reveal className="contact__cta">
        <p className="contact__small">HAVE A PROJECT IN MIND?</p>
        <a className="contact__email" href="mailto:dennishansss@gmail.com">
          LET'S MAKE
          <br />
          SOMETHING<span className="contact__dot">.</span>
        </a>
      </Reveal>
      <div className="contact__grid">
        <Reveal className="contact__cell" delay={80}>
          <span className="contact__label">EMAIL</span>
          <a href="mailto:dennishansss@gmail.com">dennishansss@gmail.com</a>
        </Reveal>
        <Reveal className="contact__cell" delay={200}>
          <span className="contact__label">LINKEDIN</span>
          <a href="https://linkedin.com/in/dennis-hans" target="_blank" rel="noreferrer">
            /in/dennis-hans ↗
          </a>
        </Reveal>
        <Reveal className="contact__cell" delay={260}>
          <span className="contact__label">LOCATION</span>
          <span>Malang, East Java, ID</span>
        </Reveal>
      </div>
      <div className="footer">
        <span>© 2026 DENNIS HANS ALBERTIAN</span>
        <a href="#top" className="footer__top">
          BACK TO TOP ↑
        </a>
      </div>
    </section>
  )
}

/* ---------------------------------- app ----------------------------------- */

export default function App() {
  return (
    <main className="page">
      <div className="grain" aria-hidden="true" />
      <div className="grid-lines" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <Hero />
      <Marquee />
      <About />
      <Education />
      <Certifications />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
