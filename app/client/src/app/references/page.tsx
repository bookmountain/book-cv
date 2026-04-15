import Link from "next/link";

import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getReferences } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function ReferencesPage() {
  const references = await getReferences();

  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="References"
        lede="People who can speak to how I work, how I collaborate, and how I operate under delivery pressure."
        title="References and endorsements"
      />

      <section className="grid gap-5 md:grid-cols-2">
        {references.map((reference, index) => (
          <Reveal delay={index * 40} key={reference.email || reference.name}>
            <Card>
              <CardContent className="flex h-full flex-col gap-6 p-6">
                <p className="font-serif text-[1.75rem] leading-tight tracking-[-0.03em] text-foreground">
                  {reference.quote || "Add a quote for this reference in Django admin."}
                </p>

                <div className="mt-auto flex flex-col gap-2 border-t border-black/6 pt-5">
                  <p className="eyebrow-label">Reference</p>
                  <p className="font-medium tracking-tight">{reference.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {reference.role}, {reference.organization}
                  </p>
                  <p className="text-sm text-muted-foreground">{reference.relationship}</p>
                  <div className="pt-1">
                    <Button render={<a href={toMailto(reference.email)} />} size="sm" variant="ghost">
                      {reference.email}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </section>

      <section className="page-band grid gap-5 rounded-[0.85rem] px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="flex flex-col gap-3">
          <p className="eyebrow-label">Start a conversation</p>
          <h2 className="font-serif text-3xl font-medium tracking-[-0.03em]">Need a direct introduction or want to discuss a project?</h2>
          <p className="max-w-2xl text-sm leading-7 text-muted-foreground">
            The fastest path is to reach out directly. I can provide context, examples, and the right references for the work.
          </p>
        </div>
        <Button render={<Link href="/contact" />} size="lg">
          Contact
        </Button>
      </section>
    </div>
  );
}
