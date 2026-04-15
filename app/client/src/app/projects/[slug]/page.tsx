import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/page-intro";
import { ProjectCover } from "@/components/project-cover";
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
    <div className="flex flex-col gap-16">
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

      <ProjectCover
        alt={project.screenshots[0]?.alt_text}
        className="aspect-[16/8] min-h-[20rem]"
        imageSrc={project.screenshots[0]?.image_src}
        title={project.title}
      />

      <section className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_280px]">
        <div className="flex flex-col gap-10">
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <p className="eyebrow-label">About the project</p>
              <RichText className="max-w-3xl text-sm leading-8 text-muted-foreground" value={project.details} />
            </div>

            {project.highlights.length > 0 ? (
              <div className="flex flex-col gap-4">
                <p className="eyebrow-label">Key outcomes</p>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {project.highlights.map((highlight) => (
                    <Card key={highlight}>
                      <CardContent className="flex h-full flex-col gap-3 p-6">
                        <p className="eyebrow-label">Highlight</p>
                        <p className="text-sm leading-7 text-foreground/88">{highlight}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <Card className="h-fit xl:sticky xl:top-28">
          <CardContent className="grid gap-5 p-6">
            <div className="flex flex-col gap-1">
              <p className="eyebrow-label">Type</p>
              <p className="text-sm leading-7 text-foreground">{project.eyebrow}</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <p className="eyebrow-label">Stack</p>
              <div className="flex flex-wrap gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {project.stack.split(",").map((item) => (
                  <span key={item.trim()}>{item.trim()}</span>
                ))}
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
              <p className="eyebrow-label">Status</p>
              <p className="text-sm leading-7 text-foreground">{project.live_url ? "Live" : "Build in progress"}</p>
            </div>
          </CardContent>
        </Card>
      </section>

      {project.screenshots.length > 0 ? (
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="eyebrow-label">Screenshots</p>
            <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Walkthrough</h2>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
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
