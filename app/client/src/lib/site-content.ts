import { cache } from "react";

export type SiteProfile = {
  full_name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
};

export type ProjectScreenshot = {
  title: string;
  introduction: string;
  image_src: string;
  alt_text: string;
};

export type Project = {
  title: string;
  slug: string;
  eyebrow: string;
  stack: string;
  summary: string;
  details: string;
  highlights: string[];
  repo_url: string;
  live_url: string;
  is_featured: boolean;
  screenshots: ProjectScreenshot[];
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
};

export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
};

export type CapabilityRow = {
  label: string;
  value: string;
};

export type WritingEntry = {
  title: string;
  slug: string;
  eyebrow: string;
  category: string;
  reading_time: string;
  summary: string;
  body: string;
};

export type BookNote = {
  title: string;
  author: string;
  summary: string;
  takeaway: string;
  cover_src: string;
};

export type Reference = {
  name: string;
  role: string;
  organization: string;
  email: string;
  relationship: string;
  quote: string;
};

export type PortfolioContent = {
  profile: SiteProfile;
  projects: Project[];
  experiences: Experience[];
  education: Education[];
  capabilities: CapabilityRow[];
  writings: WritingEntry[];
  books: BookNote[];
  references: Reference[];
};

const emptyProfile: SiteProfile = {
  full_name: "",
  title: "",
  summary: "",
  location: "",
  email: "",
  github_url: "",
  linkedin_url: "",
};

function joinApiUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

async function requestJson<T>(path: string): Promise<T | null> {
  const apiBase =
    process.env.PORTFOLIO_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000/api";

  try {
    const response = await fetch(joinApiUrl(apiBase, path), {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) {
      throw new Error(`Unexpected API response ${response.status}`);
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function asArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}

function asProfile(value: Partial<SiteProfile> | null | undefined): SiteProfile {
  return {
    ...emptyProfile,
    ...value,
  };
}

export const getPortfolioContent = cache(async (): Promise<PortfolioContent> => {
  const payload = await requestJson<Partial<PortfolioContent>>("content/");

  return {
    profile: asProfile(payload?.profile),
    projects: asArray(payload?.projects),
    experiences: asArray(payload?.experiences),
    education: asArray(payload?.education),
    capabilities: asArray(payload?.capabilities),
    writings: asArray(payload?.writings),
    books: asArray(payload?.books),
    references: asArray(payload?.references),
  };
});

export const getSiteProfile = cache(async (): Promise<SiteProfile> => {
  return (await getPortfolioContent()).profile;
});

export const getProjects = cache(async (): Promise<Project[]> => {
  return (await getPortfolioContent()).projects;
});

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return (await getProjects()).find((project) => project.slug === slug) ?? null;
}

export const getExperiences = cache(async (): Promise<Experience[]> => {
  return (await getPortfolioContent()).experiences;
});

export const getEducation = cache(async (): Promise<Education[]> => {
  return (await getPortfolioContent()).education;
});

export const getCapabilities = cache(async (): Promise<CapabilityRow[]> => {
  return (await getPortfolioContent()).capabilities;
});

export const getWritings = cache(async (): Promise<WritingEntry[]> => {
  return (await getPortfolioContent()).writings;
});

export async function getWritingBySlug(slug: string): Promise<WritingEntry | null> {
  return (await getWritings()).find((entry) => entry.slug === slug) ?? null;
}

export const getBooks = cache(async (): Promise<BookNote[]> => {
  return (await getPortfolioContent()).books;
});

export const getReferences = cache(async (): Promise<Reference[]> => {
  return (await getPortfolioContent()).references;
});

function collectText(...values: Array<string | string[] | undefined>) {
  return values
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function compactText(value: string, limit = 120) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= limit) {
    return normalized;
  }

  const sliced = normalized.slice(0, limit);
  const breakpoint = sliced.lastIndexOf(" ");
  const output = breakpoint > 72 ? sliced.slice(0, breakpoint) : sliced;

  return `${output.replace(/[.,;:!?-]+$/, "")}…`;
}

export function getDisplayCapabilities(
  content: Pick<PortfolioContent, "capabilities" | "experiences" | "projects" | "writings">,
): CapabilityRow[] {
  const explicit = asArray(content.capabilities).filter((row) => row.label.trim() && row.value.trim());

  if (explicit.length) {
    return explicit;
  }

  const items: CapabilityRow[] = [];
  const projects = asArray(content.projects);
  const experiences = asArray(content.experiences);
  const writings = asArray(content.writings);

  const push = (label: string, value?: string) => {
    if (!value || items.some((item) => item.label === label)) {
      return;
    }

    items.push({
      label,
      value: compactText(value),
    });
  };

  const microsoftExperience = experiences.find((experience) =>
    /microsoft|azure ai|document/.test(collectText(experience.company, experience.summary, experience.highlights)),
  );
  const documentProject = projects.find((project) =>
    /form recognizer|document intelligence|azure ai/.test(
      collectText(project.title, project.slug, project.stack, project.summary, project.details, project.highlights),
    ),
  );
  const homelabProject = projects.find((project) =>
    /ollama|proxmox|self-hosted|homelab|local model/.test(
      collectText(project.title, project.slug, project.stack, project.summary, project.details, project.highlights),
    ),
  );
  const agentProject =
    projects.find((project) => project.slug.includes("ai-agent-project")) ??
    projects.find((project) =>
      /agent orchestration|agent-style|bounded tools/.test(
        collectText(project.title, project.slug, project.stack, project.summary, project.details, project.highlights),
      ),
    );
  const deliveryWriting =
    writings.find((entry) => entry.slug.includes("building-with-ai")) ??
    writings.find((entry) => /\bai\b|copilot|codex|claude|local model/.test(collectText(entry.title, entry.summary, entry.body)));
  const promptProject =
    projects.find((project) => project.slug.includes("ai-web-generator")) ??
    projects.find((project) =>
      /prompt workflows|generation|generated|maintainability as a first-class output metric/.test(
        collectText(project.title, project.slug, project.stack, project.summary, project.details, project.highlights),
      ),
    );

  push("Azure AI Studio", microsoftExperience?.summary || microsoftExperience?.highlights[0]);
  push("Document Intelligence", documentProject?.summary || documentProject?.highlights[0]);
  push("Self-hosted Models", homelabProject?.summary || homelabProject?.highlights[0]);
  push("Agent Workflows", agentProject?.summary || agentProject?.highlights[0]);
  push("AI-assisted Delivery", deliveryWriting?.summary || microsoftExperience?.highlights[1]);
  push("Prompt Workflows", promptProject?.summary || promptProject?.highlights[0]);

  return items.slice(0, 6);
}
