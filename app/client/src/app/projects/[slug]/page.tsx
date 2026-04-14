import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/page-intro";
import { ProjectShot } from "@/components/project-shot";
import { Reveal } from "@/components/reveal";
import { RichText } from "@/components/rich-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
    <div className="flex flex-col gap-10">
      <PageIntro eyebrow={project.eyebrow} lede={project.summary} title={project.title}>
        {project.live_url ? (
          <Button render={<a href={project.live_url} rel="noreferrer" target="_blank" />}>Live demo</Button>
        ) : null}
        {project.repo_url ? (
          <Button render={<a href={project.repo_url} rel="noreferrer" target="_blank" />} variant="outline">
            GitHub
          </Button>
        ) : null}
        <Button render={<Link href="/projects" />} variant="ghost">
          Back
        </Button>
      </PageIntro>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_240px]">
        <div className="flex flex-col gap-6">
          <div className="grid gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">About the project</p>
              <RichText className="grid gap-4 text-sm leading-7 text-muted-foreground" value={project.details} />
            </div>

            {project.highlights.length > 0 ? (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Highlights</p>
                <div className="grid gap-3">
                  {project.highlights.map((highlight) => (
                    <p className="text-sm leading-7 text-foreground/85" key={highlight}>
                      {highlight}
                    </p>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <Card className="h-fit">
          <CardContent className="grid gap-4 p-5">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Type</p>
              <p className="text-sm leading-7">{project.eyebrow}</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Stack</p>
              <p className="text-sm leading-7">{project.stack}</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Status</p>
              <p className="text-sm leading-7">{project.live_url ? "Live" : "Build in progress"}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {project.screenshots.length > 0 ? (
        <section className="flex flex-col gap-4 border-t pt-8">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">Screenshots</p>
            <h2 className="text-2xl font-semibold tracking-tight">Walkthrough</h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {project.screenshots.map((screenshot, index) => (
              <Reveal delay={index * 40} key={`${project.slug}-${screenshot.title}`}>
                <ProjectShot screenshot={screenshot} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
