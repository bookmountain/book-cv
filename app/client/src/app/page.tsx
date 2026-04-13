import { Reveal } from "@/components/reveal";
import { capabilityRows, getPortfolioContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default async function HomePage() {
  const content = await getPortfolioContent();
  const featuredProjects = content.projects.filter((project) => project.is_featured);
  const currentQueue = content.projects.filter((project) => !project.is_featured);

  return (
    <main className="page-shell" id="top">
      <header className="site-header">
        <a className="brand" href="#top">
          {content.profile.full_name}
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#journal">Journal</a>
          <a href="#reading">Reading</a>
          <a href="#references">References</a>
        </nav>
      </header>

      <section className="hero" id="about">
        <Reveal className="hero-copy">
          <p className="eyebrow">Software Engineer</p>
          <h1>{content.profile.title}</h1>
          <p className="lede">{content.profile.summary}</p>
          <div className="hero-actions">
            <a
              className="button button-solid"
              href={content.profile.github_url}
              target="_blank"
              rel="noreferrer"
            >
              View GitHub
            </a>
            <a className="button button-ghost" href={toMailto(content.profile.email)}>
              Contact
            </a>
          </div>
        </Reveal>

        <Reveal className="hero-aside" delay={120}>
          <dl className="fact-list">
            <div>
              <dt>Based</dt>
              <dd>{content.profile.location}</dd>
            </div>
            <div>
              <dt>Current mode</dt>
              <dd>Building clear software across AI, product UI, and delivery systems.</dd>
            </div>
            <div>
              <dt>Study</dt>
              <dd>Master of IT in Adelaide, with a systems and AI engineering focus.</dd>
            </div>
          </dl>

          <div className="contact-list">
            <a href={content.profile.linkedin_url} target="_blank" rel="noreferrer">
              {stripProtocol(content.profile.linkedin_url)}
            </a>
            <a href={content.profile.github_url} target="_blank" rel="noreferrer">
              {stripProtocol(content.profile.github_url)}
            </a>
            <a href={toMailto(content.profile.email)}>{content.profile.email}</a>
          </div>
        </Reveal>
      </section>

      <section className="section-row" id="capability">
        <Reveal className="section-label">Capabilities</Reveal>
        <div className="section-content capability-list">
          {capabilityRows.map((row, index) => (
            <Reveal className="capability-row" key={row.label} delay={index * 60}>
              <span>{row.label}</span>
              <p>{row.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-row" id="experience">
        <Reveal className="section-label">Experience</Reveal>
        <div className="section-content stacked-list">
          {content.experiences.map((experience, index) => (
            <Reveal className="content-block" key={`${experience.company}-${experience.role}`} delay={index * 70}>
              <header className="block-header">
                <div>
                  <p className="block-kicker">{experience.company}</p>
                  <h2>{experience.role}</h2>
                  <p className="block-meta">{experience.location}</p>
                </div>
                <p className="block-period">{experience.period}</p>
              </header>
              <p className="block-summary">{experience.summary}</p>
              <ul className="detail-list">
                {experience.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-row" id="projects">
        <Reveal className="section-label">Selected Projects</Reveal>
        <div className="section-content stacked-list">
          {featuredProjects.map((project, index) => (
            <Reveal className="content-block" key={project.slug} delay={index * 80}>
              <header className="block-header">
                <div>
                  <p className="block-kicker">{project.eyebrow}</p>
                  <h2>{project.title}</h2>
                </div>
                <p className="block-meta">{project.stack}</p>
              </header>
              <p className="block-summary">{project.summary}</p>
              <div className="inline-links">
                {project.repo_url ? (
                  <a href={project.repo_url} target="_blank" rel="noreferrer">
                    Repository
                  </a>
                ) : null}
                {project.live_url ? (
                  <a href={project.live_url} target="_blank" rel="noreferrer">
                    Live site
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-row" id="queue">
        <Reveal className="section-label">Current Queue</Reveal>
        <div className="section-content compact-grid">
          {currentQueue.map((project, index) => (
            <Reveal className="queue-item" key={project.slug} delay={index * 60}>
              <p className="block-kicker">{project.eyebrow}</p>
              <h2>{project.title}</h2>
              <p className="queue-stack">{project.stack}</p>
              <p>{project.summary}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-row" id="journal">
        <Reveal className="section-label">Journal</Reveal>
        <div className="section-content compact-grid">
          {content.writings.map((entry, index) => (
            <Reveal className="journal-entry" key={entry.slug} delay={index * 70}>
              <div className="journal-meta">
                <span>{entry.eyebrow}</span>
                <span>{entry.reading_time}</span>
              </div>
              <h2>{entry.title}</h2>
              <p className="entry-tag">{entry.category}</p>
              <p>{entry.summary}</p>
              <p className="journal-body">{entry.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-row" id="reading">
        <Reveal className="section-label">Reading</Reveal>
        <div className="section-content">
          {content.books.length > 0 ? (
            <div className="stacked-list">
              {content.books.map((book, index) => (
                <Reveal className="content-block" key={`${book.title}-${book.author}`} delay={index * 60}>
                  <header className="block-header">
                    <div>
                      <p className="block-kicker">Book note</p>
                      <h2>{book.title}</h2>
                    </div>
                    <p className="block-meta">{book.author}</p>
                  </header>
                  <p className="block-summary">{book.summary}</p>
                  {book.takeaway ? <p className="book-takeaway">{book.takeaway}</p> : null}
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="empty-state">
              <p className="block-kicker">Ready for notes</p>
              <h2>Reading entries are wired in and ready for your books.</h2>
              <p>
                I set up the section and admin plumbing without inventing titles you did not give me. Add book
                notes in the Django admin and they will slot straight into this page.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      <section className="section-row" id="references">
        <Reveal className="section-label">References</Reveal>
        <div className="section-content compact-grid">
          {content.references.map((reference, index) => (
            <Reveal className="reference-card" key={reference.email || reference.name} delay={index * 60}>
              <h2>{reference.name}</h2>
              <p className="entry-tag">{reference.relationship}</p>
              <p>{reference.role}</p>
              <p>{reference.organization}</p>
              <a href={toMailto(reference.email)}>{reference.email}</a>
            </Reveal>
          ))}
        </div>
      </section>

      <footer className="footer-section" id="contact">
        <Reveal>
          <p className="eyebrow">Get in touch</p>
          <h2>Open to thoughtful engineering work across product, systems, and AI delivery.</h2>
          <div className="hero-actions">
            <a className="button button-solid" href={toMailto(content.profile.email)}>
              Email Book
            </a>
            <a
              className="button button-ghost"
              href={content.profile.linkedin_url}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </footer>
    </main>
  );
}
