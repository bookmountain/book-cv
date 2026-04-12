import { Reveal } from "@/components/reveal";
import {
  capabilityRows,
  experienceHighlights,
  featuredProjects,
  siteMeta,
} from "@/lib/site-content";

export default function HomePage() {
  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="hero">
        <Reveal className="hero-copy">
          <p className="eyebrow">Book Sam</p>
          <h1>{siteMeta.title}</h1>
          <p className="lede">{siteMeta.intro}</p>
          <div className="hero-actions">
            <a
              className="button button-solid"
              href={siteMeta.github}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
            <a className="button button-ghost" href={siteMeta.email}>
              Contact
            </a>
          </div>
        </Reveal>

        <Reveal className="hero-aside" delay={120}>
          <div className="hero-panel">
            <span className="panel-label">Current focus</span>
            <p>
              AI-enabled product delivery, microservice architecture, and
              private model infrastructure.
            </p>
          </div>
          <div className="hero-meta">
            <span>{siteMeta.location}</span>
            <a href={siteMeta.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </Reveal>
      </section>

      <section className="section-grid">
        <Reveal className="section-label" delay={40}>
          Selected Work
        </Reveal>
        <div className="section-content work-list">
          {featuredProjects.map((project, index) => (
            <Reveal
              key={project.title}
              className="work-item"
              delay={index * 80}
            >
              <p className="eyebrow">{project.eyebrow}</p>
              <div className="work-heading">
                <h2>{project.title}</h2>
                <span>{project.stack}</span>
              </div>
              <p>{project.description}</p>
              <a href={project.href} target="_blank" rel="noreferrer">
                Open repository
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <Reveal className="section-label" delay={40}>
          Experience
        </Reveal>
        <div className="section-content timeline">
          {experienceHighlights.map((item, index) => (
            <Reveal
              key={item.company}
              className="timeline-row"
              delay={index * 70}
            >
              <div>
                <p className="timeline-company">{item.company}</p>
                <h3>{item.role}</h3>
              </div>
              <div>
                <p className="timeline-period">{item.period}</p>
                <p>{item.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-grid">
        <Reveal className="section-label" delay={40}>
          Capability
        </Reveal>
        <div className="section-content capability-list">
          {capabilityRows.map((row, index) => (
            <Reveal
              key={row.label}
              className="capability-row"
              delay={index * 60}
            >
              <span>{row.label}</span>
              <p>{row.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="footer-cta" delay={120}>
        <p className="eyebrow">Start a conversation</p>
        <h2>
          Need someone who can move between product UI, backend systems, and AI
          infrastructure?
        </h2>
        <div className="hero-actions">
          <a className="button button-solid" href={siteMeta.email}>
            Email Book
          </a>
          <a
            className="button button-ghost"
            href={siteMeta.github}
            target="_blank"
            rel="noreferrer"
          >
            Browse work
          </a>
        </div>
      </Reveal>
    </main>
  );
}
