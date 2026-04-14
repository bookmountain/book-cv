import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageIntro } from "@/components/page-intro";
import { ProjectShot } from "@/components/project-shot";
import { Reveal } from "@/components/reveal";
import { RichText } from "@/components/rich-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex flex-col gap-14">
      <PageIntro eyebrow={project.eyebrow} lede={project.summary} title={project.title}>
        {project.live_url ? (
          <Button render={<a href={project.live_url} rel="noreferrer" target="_blank" />}>Open live demo</Button>
        ) : null}
        {project.repo_url ? (
          <Button render={<a href={project.repo_url} rel="noreferrer" target="_blank" />} variant="outline">
            View repository
          </Button>
        ) : null}
        <Button render={<Link href="/projects" />} variant="ghost">
          Back to projects
        </Button>
      </PageIntro>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <Reveal>
          <Card className="h-full rounded-[1.8rem] border-border/70">
            <CardHeader className="gap-4">
              <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                Overview
              </Badge>
              <CardTitle className="font-serif text-4xl leading-none">{project.stack}</CardTitle>
            </CardHeader>
            <CardContent>
              <RichText className="text-sm leading-8 text-muted-foreground" value={project.details} />
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={80}>
          <Card className="h-full rounded-[1.8rem] border-border/70">
            <CardHeader className="gap-4">
              <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="secondary">
                Highlights
              </Badge>
              <CardTitle className="font-serif text-4xl leading-none text-balance">
                What matters in this build
              </CardTitle>
              <CardDescription className="text-sm leading-7">
                The short version of the decisions or outcomes that make the project worth showing.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {project.highlights.map((highlight) => (
                <p className="text-sm leading-7 text-muted-foreground" key={highlight}>
                  {highlight}
                </p>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </section>

      <Separator />

      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-3xl flex-col gap-3">
            <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
              Screenshots
            </Badge>
            <h2 className="font-serif text-3xl leading-none text-balance sm:text-4xl">Visual walkthrough</h2>
          </div>
          <p className="text-sm leading-7 text-muted-foreground">
            Upload or edit these in Django admin as the project evolves.
          </p>
        </div>

        {project.screenshots.length > 0 ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {project.screenshots.map((screenshot, index) => (
              <Reveal delay={index * 70} key={`${project.slug}-${screenshot.title}`}>
                <ProjectShot screenshot={screenshot} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <Card className="rounded-[1.8rem] border-border/70">
              <CardHeader className="gap-4">
                <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                  No screenshots yet
                </Badge>
                <CardTitle className="font-serif text-4xl leading-none">This project page is ready for visual updates.</CardTitle>
                <CardDescription className="text-sm leading-7">
                  Add screenshots and introductions in Django admin to fill this gallery.
                </CardDescription>
              </CardHeader>
            </Card>
          </Reveal>
        )}
      </section>
    </div>
  );
}
