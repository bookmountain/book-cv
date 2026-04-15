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

export function splitParagraphs(value: string) {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
