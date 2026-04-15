import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { ProjectCover } from "@/components/project-cover";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBooks, getPortfolioContent, getWritings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function HomePage() {
  const content = await getPortfolioContent();
  const featuredProjects = content.projects.filter((project) => project.is_featured).slice(0, 3);
  const posts = (await getWritings()).slice(0, 3);
  const books = (await getBooks()).slice(0, 3);

  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="Engineering excellence"
        lede="With a background at Microsoft, I focus on bridging complex backend infrastructure with high-fidelity product UI."
        title="Software engineer building practical products and reliable systems."
        titleClassName="max-w-4xl text-[2.7rem] sm:text-5xl xl:text-[4.2rem]"
        ledeClassName="max-w-xl"
      >
        <Button render={<Link href="/projects" />}>View projects</Button>
        <Button render={<Link href="/contact" />} variant="outline">
          Contact
        </Button>
      </PageIntro>

      <section className="grid gap-8 border-t border-black/6 pt-10 md:grid-cols-3">
        {[
          { label: "Location", value: content.profile.location },
          { label: "Focus", value: "Web apps, AI systems, and automation" },
          { label: "Primary stack", value: "Next.js, Django, PostgreSQL, Docker" },
        ].map((item) => (
          <div className="flex flex-col gap-2" key={item.label}>
            <p className="eyebrow-label">{item.label}</p>
            <p className="text-sm font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="page-band flex flex-col gap-8 rounded-[0.85rem] px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-xl flex-col gap-3">
            <p className="eyebrow-label">Selected work</p>
            <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Systems and interfaces built to last.</h2>
            <p className="text-sm leading-7 text-muted-foreground">
              A curated set of delivery-focused projects spanning product UI, architecture, and developer tooling.
            </p>
          </div>
          <Button render={<Link href="/projects" />} size="sm" variant="ghost">
            All projects
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Reveal delay={index * 40} key={project.slug}>
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-5 p-6">
                  <ProjectCover
                    alt={project.screenshots[0]?.alt_text}
                    className="aspect-[4/3]"
                    imageSrc={project.screenshots[0]?.image_src}
                    title={project.title}
                  />
                  <div className="flex flex-col gap-3">
                    <p className="eyebrow-label">{project.eyebrow}</p>
                    <h3 className="font-serif text-[1.75rem] leading-tight tracking-[-0.03em]">{project.title}</h3>
                    <p className="text-sm leading-7 text-muted-foreground">{project.summary}</p>
                    <div className="flex flex-wrap gap-3 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                      {project.stack.split(",").slice(0, 3).map((item) => (
                        <span key={item.trim()}>{item.trim()}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-2">
                    <Button render={<Link href={`/projects/${project.slug}`} />} size="sm" variant="ghost">
                      View project
                    </Button>
                    {project.live_url ? (
                      <Button render={<a href={project.live_url} rel="noreferrer" target="_blank" />} size="sm" variant="outline">
                        Live demo
                      </Button>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="grid gap-10 xl:grid-cols-[minmax(0,0.34fr)_1fr]">
        <div className="flex flex-col gap-3">
          <p className="eyebrow-label">Latest posts</p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Writing on engineering, AI, and software delivery.</h2>
        </div>
        <div className="divide-y divide-black/6">
          {posts.map((entry) => (
            <article className="grid gap-4 py-7 md:grid-cols-[140px_minmax(0,1fr)] md:items-start" key={entry.slug}>
              <div className="flex flex-col gap-2 text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                <span>{entry.category}</span>
                <span>{entry.reading_time}</span>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-[1.9rem] leading-tight tracking-[-0.03em]">{entry.title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{entry.summary}</p>
                <div>
                  <Button render={<Link href={`/blog/${entry.slug}`} />} size="sm" variant="ghost">
                    Read post
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-band grid gap-10 rounded-[0.85rem] px-6 py-8 sm:px-8 sm:py-10 xl:grid-cols-[minmax(0,0.34fr)_1fr]">
        <div className="flex flex-col gap-3">
          <p className="eyebrow-label">Current shelf</p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Books shaping how I design and build.</h2>
          <p className="text-sm leading-7 text-muted-foreground">
            Continuous learning sits underneath the architectural mindset. These are the books currently influencing the work.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {books.map((book, index) => (
            <Card key={book.title}>
              <CardContent className="flex h-full flex-col gap-5 p-6">
                <div
                  className="flex aspect-[3/4] items-end rounded-[0.55rem] border border-white/30 p-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]"
                  style={{
                    background:
                      [
                        "linear-gradient(160deg, #111827 0%, #334155 100%)",
                        "linear-gradient(160deg, #1f2937 0%, #475569 100%)",
                        "linear-gradient(160deg, #0f172a 0%, #64748b 100%)",
                      ][index % 3],
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.56rem] font-semibold uppercase tracking-[0.28em] text-white/70">Book note</p>
                    <p className="font-serif text-2xl leading-tight">{book.title}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-foreground">{book.author}</p>
                  <p className="text-sm leading-7 text-muted-foreground">{book.takeaway}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 rounded-[0.85rem] border border-black/6 bg-[rgba(255,255,255,0.7)] px-6 py-8 shadow-[0_16px_36px_rgba(15,23,42,0.04)] sm:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex flex-col gap-3">
          <p className="eyebrow-label">Collaborate</p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Interested in building something durable together?</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            I work best where product thinking, systems clarity, and fast delivery need to coexist.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button render={<Link href="/contact" />} size="lg">
            Start a project
          </Button>
          <Button render={<a href={toMailto(content.profile.email)} />} size="lg" variant="outline">
            Email me
          </Button>
        </div>
      </section>
    </div>
  );
}
