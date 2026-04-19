import { ProjectCard } from "@/components/prototype-ui";
import { getProjects } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="container">
          <div className="section-label">Projects</div>
          <h1 className="section-title">Selected work.</h1>
          <p className="section-sub">A focused set of delivery projects spanning architecture, product UI, and open-source contribution.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {projects.map((project, index) => (
              <ProjectCard delay={index * 100} key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
