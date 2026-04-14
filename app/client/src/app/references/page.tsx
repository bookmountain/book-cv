import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getReferences } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function ReferencesPage() {
  const references = await getReferences();

  return (
    <div className="flex flex-col gap-14">
      <PageIntro
        eyebrow="References"
        lede="You can edit the quote for each reference in Django admin, so this page can become a proper testimonial section without losing direct contact details."
        title="Reference cards shaped more like reviews than a flat contact list."
      />

      <section className="grid gap-4 xl:grid-cols-2">
        {references.map((reference, index) => (
          <Reveal delay={index * 70} key={reference.email || reference.name}>
            <Card className="h-full rounded-[1.8rem] border-border/70">
              <CardHeader className="gap-4">
                <Badge className="w-fit rounded-full px-3 py-1 uppercase tracking-[0.22em]" variant="outline">
                  Reference review
                </Badge>
                <CardTitle className="font-serif text-4xl leading-tight text-balance">
                  {reference.quote ||
                    "Add the exact quote from this reference in Django admin to replace this placeholder."}
                </CardTitle>
                <CardDescription className="text-sm leading-7">
                  A direct reference with editable quote content and visible contact details.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2 text-sm leading-7 text-muted-foreground">
                <p className="font-medium text-foreground">{reference.name}</p>
                <p>{reference.relationship}</p>
                <p>
                  {reference.role}, {reference.organization}
                </p>
              </CardContent>
              <CardFooter>
                <Button render={<a href={toMailto(reference.email)} />} size="sm" variant="ghost">
                  {reference.email}
                </Button>
              </CardFooter>
            </Card>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
