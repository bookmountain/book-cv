import { ContactInquiryForm } from "@/components/contact-inquiry-form";
import { PageIntro } from "@/components/page-intro";
import { ProjectCover } from "@/components/project-cover";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteProfile } from "@/lib/site-content";

export const dynamic = "force-dynamic";

function toMailto(value: string) {
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export default async function ContactPage() {
  const profile = await getSiteProfile();

  return (
    <div className="flex flex-col gap-16">
      <PageIntro
        eyebrow="Get in touch"
        lede="Whether you have a specific project in mind or just want to say hello, I’m always open to discussing new opportunities and creative ideas."
        title="Let’s start a conversation."
        titleClassName="max-w-3xl"
      />

      <section className="grid gap-8 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-6">
          <Card>
            <CardContent className="grid gap-6 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="eyebrow-label">Email</p>
                  <a className="text-sm text-foreground" href={toMailto(profile.email)}>
                    {profile.email}
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="eyebrow-label">Location</p>
                  <p className="text-sm text-foreground">{profile.location}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="eyebrow-label">LinkedIn</p>
                  <a className="text-sm text-foreground" href={profile.linkedin_url} rel="noreferrer" target="_blank">
                    Connect
                  </a>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="eyebrow-label">GitHub</p>
                  <a className="text-sm text-foreground" href={profile.github_url} rel="noreferrer" target="_blank">
                    View profile
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <ProjectCover
            caption="Open for thoughtful product work, systems delivery, and AI-enabled builds."
            className="aspect-[4/3]"
            eyebrow="Availability"
            title="Architectural contact visual"
          />
        </div>

        <div className="flex flex-col gap-5">
          <Card className="page-band">
            <CardContent className="p-6 sm:p-8">
              <ContactInquiryForm email={profile.email} />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-3 rounded-[0.65rem] border border-black/6 bg-[rgba(255,255,255,0.72)] px-6 py-5 text-sm text-muted-foreground shadow-[0_16px_34px_rgba(15,23,42,0.04)] sm:flex-row sm:items-center sm:justify-between">
            <span className="flex items-center gap-2 text-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Available for new projects
            </span>
            <span>Response time: usually within 24 hours</span>
          </div>
        </div>
      </section>
    </div>
  );
}
