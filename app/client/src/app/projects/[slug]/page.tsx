import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/page-intro";
import { ProjectShot } from "@/components/project-shot";
import { Reveal } from "@/components/reveal";
import { RichText } from "@/components/rich-text";
import { getProjectBySlug, getProjects } from "@/lib/site-content";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project | Book Sam" };
  }

  return {
    title: `${project.title} | Book Sam`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="page-stack">
      <PageIntro eyebrow={project.eyebrow} title={project.title} lede={project.summary}>
        {project.live_url ? (
          <a className="button button-solid" href={project.live_url} rel="noreferrer" target="_blank">
            Open live demo
          </a>
        ) : null}
        {project.repo_url ? (
          <a className="button button-ghost" href={project.repo_url} rel="noreferrer" target="_blank">
            View repository
          </a>
        ) : null}
        <Link className="button button-ghost" href="/projects">
          Back to projects
        </Link>
      </PageIntro>

      <section className="section-block split-section">
        <Reveal className="detail-panel">
          <p className="mini-label">Stack</p>
          <h2>{project.stack}</h2>
          <RichText value={project.details} />
        </Reveal>
        <Reveal className="detail-panel" delay={80}>
          <p className="mini-label">Highlights</p>
          <h2>What matters in this build</h2>
          <ul className="detail-list">
            {project.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="section-block">
        <div className="section-heading section-heading-inline">
          <div>
            <p className="mini-label">Screenshots</p>
            <h2>Visual walkthrough</h2>
          </div>
          <p className="supporting-text">Upload or edit these in Django admin as the project evolves.</p>
        </div>
        {project.screenshots.length > 0 ? (
          <div className="shot-grid">
            {project.screenshots.map((screenshot, index) => (
              <Reveal delay={index * 70} key={`${project.slug}-${screenshot.title}`}>
                <ProjectShot screenshot={screenshot} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="empty-panel">
            <p className="mini-label">No screenshots yet</p>
            <h2>This project page is ready for visual updates.</h2>
            <p>Add screenshots and introductions in Django admin to fill this gallery.</p>
          </Reveal>
        )}
      </section>
    </div>
  );
}
