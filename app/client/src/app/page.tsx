import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import {
  capabilityRows,
  getBooks,
  getPortfolioContent,
  getReferences,
  getWritings,
} from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function HomePage() {
  const content = await getPortfolioContent();
  const featuredProjects = content.projects.filter((project) => project.is_featured).slice(0, 3);
  const posts = (await getWritings()).slice(0, 3);
  const books = (await getBooks()).slice(0, 3);
  const references = (await getReferences()).slice(0, 2);

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Portfolio"
        title="Readable portfolio, real projects, and work that holds up under detail."
        lede={content.profile.summary}
      >
        <Link className="button button-solid" href="/projects">
          View projects
        </Link>
        <Link className="button button-ghost" href="/blog">
          Read posts
        </Link>
        <a className="button button-ghost" href={toMailto(content.profile.email)}>
          Contact
        </a>
      </PageIntro>

      <section className="home-hero-grid">
        <Reveal className="feature-panel">
          <p className="mini-label">What I do</p>
          <h2>Product UI, backend systems, AI delivery, and the operational glue between them.</h2>
          <p>
            I build software that needs to be understandable after launch, not only impressive during the demo.
          </p>
        </Reveal>

        <Reveal className="feature-panel" delay={80}>
          <p className="mini-label">Current focus</p>
          <ul className="metric-list">
            <li>AI-assisted engineering with practical verification</li>
            <li>Microservice architecture and delivery workflows</li>
            <li>Private local AI infrastructure for experimentation</li>
          </ul>
        </Reveal>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <p className="mini-label">Capabilities</p>
          <h2>The stack I keep returning to</h2>
        </div>
        <div className="capability-grid">
          {capabilityRows.map((row, index) => (
            <Reveal className="capability-card" delay={index * 60} key={row.label}>
              <p className="mini-label">{row.label}</p>
              <p>{row.value}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading section-heading-inline">
          <div>
            <p className="mini-label">Projects</p>
            <h2>Selected work</h2>
          </div>
          <Link className="text-link" href="/projects">
            See all projects
          </Link>
        </div>
        <div className="card-grid">
          {featuredProjects.map((project, index) => (
            <Reveal className="project-card" delay={index * 70} key={project.slug}>
              <p className="mini-label">{project.eyebrow}</p>
              <h3>{project.title}</h3>
              <p className="supporting-text">{project.stack}</p>
              <p>{project.summary}</p>
              <div className="card-actions">
                <Link className="text-link" href={`/projects/${project.slug}`}>
                  Project details
                </Link>
                {project.repo_url ? (
                  <a className="text-link" href={project.repo_url} rel="noreferrer" target="_blank">
                    Repository
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-block split-section">
        <div>
          <div className="section-heading section-heading-inline">
            <div>
              <p className="mini-label">Blog</p>
              <h2>Posts and notes</h2>
            </div>
            <Link className="text-link" href="/blog">
              Open blog
            </Link>
          </div>
          <div className="stack-list">
            {posts.map((entry, index) => (
              <Reveal className="list-card" delay={index * 70} key={entry.slug}>
                <p className="mini-label">
                  {entry.category} · {entry.reading_time}
                </p>
                <h3>{entry.title}</h3>
                <p>{entry.summary}</p>
                <Link className="text-link" href={`/blog/${entry.slug}`}>
                  Read post
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <div className="section-heading section-heading-inline">
            <div>
              <p className="mini-label">Reading</p>
              <h2>Books that shaped how I work</h2>
            </div>
            <Link className="text-link" href="/books">
              See reading page
            </Link>
          </div>
          <div className="book-preview-grid">
            {books.map((book, index) => (
              <Reveal className="book-preview-card" delay={index * 70} key={book.title}>
                <div className={`book-cover tone-${(index % 5) + 1}`}>
                  <span>{book.title}</span>
                  <small>{book.author}</small>
                </div>
                <p className="book-takeaway">{book.takeaway}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading section-heading-inline">
          <div>
            <p className="mini-label">References</p>
            <h2>People who can speak to my work</h2>
          </div>
          <Link className="text-link" href="/references">
            Open references
          </Link>
        </div>
        <div className="quote-grid">
          {references.map((reference, index) => (
            <Reveal className="quote-card" delay={index * 70} key={reference.email || reference.name}>
              <span className="quote-mark">“</span>
              <p className="quote-body">
                {reference.quote || "Add the exact quote in Django admin to turn this card into a full testimonial."}
              </p>
              <div className="quote-meta">
                <strong>{reference.name}</strong>
                <span>
                  {reference.role}, {reference.organization}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
