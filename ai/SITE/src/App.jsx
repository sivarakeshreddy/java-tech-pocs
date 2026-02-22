import './App.css'

const profile = {
  name: 'Siva Rakesh Reddy',
  title: 'Technical Lead | Java Full Stack',
  location: 'Hyderabad, Telangana, India',
  email: 'sivarakesh1808@gmail.com',
  phone: '+91 95429 83813',
  linkedin: 'https://www.linkedin.com/in/siva-rakesh-reddy-834427132',
  resume: '/SivaRakesh_Resume.pdf',
  summary:
    'Java full-stack leader with deep experience across Spring, React, and cloud-native architectures. Specializes in AWS serverless, resilient API design, and high-scale mobile backends with measurable wins in latency, availability, and cost.',
}

const portfolioLink = ''

const stats = [
  { label: 'Experience', value: '8+ years', detail: 'Full-stack & cloud' },
  { label: 'Scale', value: '5M+ req/hr', detail: 'API Gateway + Lambda' },
  { label: 'Reliability', value: '99.9% uptime', detail: 'Dynatrace & Sumo Logic' },
  { label: 'Efficiency', value: '40% lower cost', detail: 'Serverless + FinOps' },
]

const highlights = [
  'Architected AWS Lambda microservices with TypeScript + CDK, supporting multi-region mobile traffic.',
  'Cut response times from 3.2s to 800ms with parallel API execution, streamlined data shaping, and caching.',
  'Integrated 10+ mission-critical airline APIs with auth hardening, retries, and circuit breakers for resilience.',
  'Lifted quality with Jest and SonarQube (85%+ coverage) while halving MTTR through Dynatrace + Sumo observability.',
]

const experience = [
  {
    company: 'LTiMindtree',
    role: 'Technical Lead / Senior Developer',
    period: 'Feb 2022 - Jan 2026 | Hyderabad',
    items: [
      'Built a cloud-native, serverless travel platform on AWS (Lambda, API Gateway, DynamoDB) with TypeScript + CDK.',
      'Handles 5M+ API requests per peak hour at 99.9% uptime; reduced latency by 25% validated through Dynatrace.',
      'Optimized Lambda flows from 3.2s to 800ms via parallel calls and lean transformations; cut infra cost by 40%.',
      'Established Jest-based automation (85% coverage) and continuous quality checks with SonarQube.',
      'Integrated Dynatrace APM and Sumo Logic, trimming MTTR by 50% and improving incident clarity.',
    ],
  },
  {
    company: 'Cognizant',
    role: 'Team Member',
    period: 'May 2021 - Feb 2022 | Hyderabad',
    items: [
      'Led requirements and design for data-heavy React experiences backed by REST APIs.',
      'Built unit and integration suites to 85% coverage, reducing UAT defects and rework.',
      'Managed deployments with Maven and Tomcat and coordinated GitHub-driven delivery.',
    ],
  },
  {
    company: 'Capgemini Technology Services India Limited',
    role: 'Team Member',
    period: 'Apr 2018 - Apr 2021 | Bangalore',
    items: [
      'Developed Spring Boot REST APIs and ORM layers that improved data performance by 30%.',
      'Automated recurring workflows with Spring Batch and shell scripts, cutting manual effort by 40%.',
      'Profiled JVM, tuned New Relic and Actuator metrics to lower API latency by about 25% and exceed SLAs.',
    ],
  },
]

const project = {
  name: 'Mobile My Trips - Delta Airlines',
  timeline: 'Feb 2022 - Jan 2026',
  summary:
    'Cloud-native backbone for Delta mobile trip experiences. Multi-region Lambda microservices with parallel API orchestration, hardened security, and mobile-ready data shaping.',
  outcomes: [
    '60% faster API responses through parallel GraphQL and REST aggregation.',
    'Automated PNR refresh and change detection cut backend load by 40%.',
    'CI/CD via GitLab and Amazon Q code review enabled multiple prod releases per day.',
    'Structured logging and transaction IDs across Dynatrace, Sumo Logic, and CloudWatch.',
  ],
}

const skills = [
  {
    category: 'Programming',
    items: ['Java', 'Node.js', 'TypeScript', 'JavaScript', 'Python'],
  },
  {
    category: 'Frameworks & UI',
    items: ['Spring Boot', 'Spring Cloud', 'Hibernate', 'GraphQL', 'React', 'Axios', 'Moment.js'],
  },
  {
    category: 'Cloud & Platforms',
    items: ['AWS (Lambda, API Gateway, DynamoDB, Secrets Manager, VPC)', 'Kubernetes', 'AWS CDK'],
  },
  {
    category: 'Data & Messaging',
    items: ['DynamoDB', 'Oracle', 'Kafka', 'Zlib', 'iconv-lite'],
  },
  {
    category: 'Tooling & Quality',
    items: ['Docker', 'Git/GitHub/GitLab', 'Maven', 'Tomcat', 'WebLogic', 'Jest', 'SonarQube', 'Dynatrace APM', 'Sumo Logic'],
  },
]

const education = [
  {
    school: 'SRKR Engineering College, Andhra University',
    credential: 'B.Tech',
    period: 'Jan 2013 - Jan 2017',
  },
  {
    school: 'Sasi Junior College (Velivennu)',
    credential: '12th (MPC)',
    period: 'Jan 2011 - Jan 2013',
  },
  {
    school: 'Vikas Public School',
    credential: '10th (SSC)',
    period: 'Jan 2010 - Jan 2011',
  },
]

const contactLinks = [
  { label: 'Email', href: `mailto:${profile.email}`, value: profile.email },
  { label: 'LinkedIn', href: profile.linkedin, value: 'linkedin.com/in/siva-rakesh-reddy-834427132' },
  { label: 'Call', href: `tel:${profile.phone.replace(/\s+/g, '')}`, value: profile.phone },
  { label: 'Resume (PDF)', href: profile.resume, value: 'Download PDF', download: true },
]

function App() {
  return (
    <div className="page">
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <header className="hero card" id="top">
        <div className="hero__intro">
          <p className="eyebrow">Technical Lead | Full Stack | Cloud Native</p>
          <h1>{profile.name}</h1>
          <p className="lede">{profile.summary}</p>
          <div className="cta-row">
            <a className="btn primary" href={`mailto:${profile.email}`}>
              Start a project
            </a>
            <a className="btn ghost" href={profile.resume} download>
              Download resume
            </a>
            <a className="btn text" href="#experience">
              View experience
            </a>
          </div>
          <div className="chip-row">
            <span className="chip">{profile.location}</span>
            <span className="chip">Open to senior leadership roles</span>
            <span className="chip">Hybrid / Remote</span>
          </div>
        </div>
        <div className="hero__stats">
          {stats.map((stat) => (
            <div key={stat.label} className="stat">
              <div className="stat__value">{stat.value}</div>
              <div className="stat__label">{stat.label}</div>
              <div className="stat__detail">{stat.detail}</div>
            </div>
          ))}
        </div>
      </header>

      <main className="content">
        <section className="card section">
          <div className="section__header">
            <p className="eyebrow">About</p>
            <h2>What I deliver</h2>
            <p className="muted">
              Hands-on leadership across Java, Spring, React, and AWS serverless - turning complex, high-availability needs into
              production-grade systems with measurable gains.
            </p>
          </div>
          <div className="highlight-grid">
            {highlights.map((item, idx) => (
              <div key={idx} className="highlight">
                <span className="badge">+</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card section" id="experience">
          <div className="section__header">
            <p className="eyebrow">Career Journey</p>
            <h2>Experience</h2>
          </div>
          <div className="timeline">
            {experience.map((job) => (
              <article key={job.company} className="timeline__item">
                <div className="timeline__marker" />
                <div className="timeline__content">
                  <div className="timeline__meta">
                    <h3>{job.role}</h3>
                    <p className="muted">{job.company}</p>
                    <p className="tiny">{job.period}</p>
                  </div>
                  <ul>
                    {job.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="card section" id="projects">
          <div className="section__header">
            <p className="eyebrow">Flagship Work</p>
            <h2>{project.name}</h2>
            <p className="tiny muted">{project.timeline}</p>
          </div>
          <p className="muted">{project.summary}</p>
          <div className="pill-row">
            {project.outcomes.map((item, idx) => (
              <span key={idx} className="pill">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="card section" id="skills">
          <div className="section__header">
            <p className="eyebrow">Toolkit</p>
            <h2>Skills</h2>
          </div>
          <div className="skills-grid">
            {skills.map((group) => (
              <div key={group.category} className="skill-card">
                <p className="tiny muted">{group.category}</p>
                <div className="skill-tags">
                  {group.items.map((skill) => (
                    <span key={skill} className="pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card section" id="education">
          <div className="section__header">
            <p className="eyebrow">Education</p>
            <h2>Academic path</h2>
          </div>
          <div className="education-grid">
            {education.map((item) => (
              <div key={item.school} className="education-card">
                <h3>{item.credential}</h3>
                <p className="muted">{item.school}</p>
                <p className="tiny">{item.period}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card section" id="contact">
          <div className="section__header">
            <p className="eyebrow">Contact</p>
            <h2>Let's talk</h2>
            <p className="muted">Reach out for leadership roles, platform modernization, or high-scale React + Java builds.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-links">
              {contactLinks.map((link) => {
                const isExternal = link.href.startsWith('http')
                return (
                  <a
                    key={link.label}
                    className="contact-card"
                    href={link.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    download={link.download}
                  >
                    <span className="contact-label">{link.label}</span>
                    <span className="contact-value">{link.value}</span>
                  </a>
                )
              })}
            </div>
            <div className="contact-cta">
              {portfolioLink ? (
                <a className="btn primary wide" href={portfolioLink} target="_blank" rel="noreferrer">
                  View portfolio
                </a>
              ) : (
                <div className="portfolio-placeholder">
                  <p className="muted">Portfolio link not added yet.</p>
                  <p className="tiny">Set `portfolioLink` in `src/App.jsx` when you are ready to showcase project screenshots.</p>
                </div>
              )}
              <div className="note">
                <p className="tiny">
                  Prefer a quick intro? Call {profile.phone} or book via LinkedIn. I respond within one business day.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="tiny muted">(c) {new Date().getFullYear()} {profile.name}. Built with React + Vite.</p>
      </footer>
    </div>
  )
}

export default App
