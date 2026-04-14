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
    <div className="flex flex-col gap-10">
      <PageIntro
        eyebrow="References"
        lede="People who can speak to how I work. Quotes can be edited in Django admin."
        title="References"
      />

      <section className="grid gap-4 md:grid-cols-2">
        {references.map((reference, index) => (
          <Reveal delay={index * 40} key={reference.email || reference.name}>
            <Card>
              <CardContent className="flex h-full flex-col gap-4 p-5">
                <p className="text-base leading-8 text-foreground/90">
                  {reference.quote || "Add a quote for this reference in Django admin."}
                </p>

                <div className="mt-auto flex flex-col gap-1 border-t pt-4">
                  <p className="font-semibold tracking-tight">{reference.name}</p>
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
    </div>
  );
}
