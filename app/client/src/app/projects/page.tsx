import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { getProjects } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="page-stack">
      <PageIntro
        eyebrow="Projects"
        title="Project list with detail pages, repo links, live demos, and screenshot galleries."
        lede="Each project has its own page so the work is easier to scan and easier to update. Where screenshots are not uploaded yet, the layout is already in place through Django admin."
      />

      <section className="section-block">
        <div className="project-list">
          {projects.map((project, index) => (
            <Reveal className="project-row" delay={index * 50} key={project.slug}>
              <div className="project-row-main">
                <p className="mini-label">{project.eyebrow}</p>
                <h2>{project.title}</h2>
                <p className="supporting-text">{project.stack}</p>
                <p>{project.summary}</p>
              </div>
              <div className="project-row-aside">
                <ul className="micro-list">
                  {project.highlights.slice(0, 2).map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <div className="card-actions">
                  <Link className="button button-solid" href={`/projects/${project.slug}`}>
                    Open project
                  </Link>
                  {project.repo_url ? (
                    <a className="button button-ghost" href={project.repo_url} rel="noreferrer" target="_blank">
                      Repository
                    </a>
                  ) : null}
                  {project.live_url ? (
                    <a className="button button-ghost" href={project.live_url} rel="noreferrer" target="_blank">
                      Live demo
                    </a>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
