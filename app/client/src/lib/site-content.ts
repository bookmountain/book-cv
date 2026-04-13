export type SiteProfile = {
  full_name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  github_url: string;
  linkedin_url: string;
};

export type Project = {
  title: string;
  slug: string;
  eyebrow: string;
  stack: string;
  summary: string;
  repo_url: string;
  live_url: string;
  is_featured: boolean;
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
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
};

export type PortfolioContent = {
  profile: SiteProfile;
  projects: Project[];
  experiences: Experience[];
  writings: WritingEntry[];
  books: BookNote[];
  references: Reference[];
};

export const capabilityRows = [
  {
    label: "Application",
    value: "TypeScript, React, Next.js, NestJS, Vue, PostgreSQL",
  },
  {
    label: "AI",
    value: "Azure AI Studio, Ollama, RAG architecture, Codex, Copilot",
  },
  {
    label: "Automation",
    value: "Playwright, Selenium, repeatable browser checks, pragmatic CI",
  },
  {
    label: "Systems",
    value: "Proxmox, Linux, Docker, RabbitMQ, gRPC, WSL2",
  },
];

export const fallbackContent: PortfolioContent = {
  profile: {
    full_name: "Book Sam",
    title:
      "Software Engineer building AI systems, sharp interfaces, and resilient infrastructure.",
    summary:
      "Microsoft experience, microservice architecture practice, and hands-on local AI infrastructure. I build product-facing interfaces, backend systems, and the workflows that keep them practical to operate.",
    location: "Adelaide, Australia",
    email: "bookmountain0222@gmail.com",
    github_url: "https://github.com/bookmountain",
    linkedin_url: "https://linkedin.com/in/book-sam-603004169",
  },
  projects: [
    {
      title: "Microservice Demo Auction Platform",
      slug: "microservice-demo-auction-platform",
      eyebrow: "Architecture",
      stack: ".NET 8, Next.js 14, RabbitMQ, gRPC",
      summary:
        "A containerized auction platform built around decoupled services, asynchronous events, real-time updates, and gateway routing.",
      repo_url: "https://github.com/bookmountain/microservice-demo",
      live_url: "",
      is_featured: true,
    },
    {
      title: "Microsoft Form Recognizer Toolkit",
      slug: "microsoft-form-recognizer-toolkit",
      eyebrow: "Open Source",
      stack: "Azure AI, Document Intelligence, GitHub",
      summary:
        "Contribution work inside Microsoft's public toolkit for document intelligence workflows and supporting developer tooling.",
      repo_url: "https://github.com/microsoft/Form-Recognizer-Toolkit",
      live_url: "",
      is_featured: true,
    },
    {
      title: "AI Agent Infrastructure Homelab",
      slug: "ai-agent-infrastructure-homelab",
      eyebrow: "Private AI",
      stack: "Proxmox, Ollama, Python Automation",
      summary:
        "A self-hosted lab for local LLM experimentation, repeatable automation workflows, and private AI development without recurring API spend.",
      repo_url: "https://github.com/bookmountain",
      live_url: "",
      is_featured: true,
    },
    {
      title: "Playwright Automation Workflow",
      slug: "playwright-automation-workflow",
      eyebrow: "Current Build Queue",
      stack: "Playwright, TypeScript, CI",
      summary:
        "A browser automation workflow for regression coverage, portfolio smoke tests, and faster preview validation.",
      repo_url: "",
      live_url: "",
      is_featured: false,
    },
    {
      title: "OpenClaw Setup Notes",
      slug: "openclaw-setup-notes",
      eyebrow: "Current Build Queue",
      stack: "Local tooling, AI workflows",
      summary:
        "A documented setup for integrating OpenClaw into a repeatable local AI workflow.",
      repo_url: "",
      live_url: "",
      is_featured: false,
    },
    {
      title: "AI Agent Project",
      slug: "ai-agent-project",
      eyebrow: "Current Build Queue",
      stack: "Python, local models, agent orchestration",
      summary:
        "An experiment in agent-style workflows that combine structured prompts, tooling, and local model infrastructure.",
      repo_url: "",
      live_url: "",
      is_featured: false,
    },
    {
      title: "AI Web Generator",
      slug: "ai-web-generator",
      eyebrow: "Current Build Queue",
      stack: "Next.js, Django, prompt workflows",
      summary:
        "A project focused on generating practical web experiences while keeping the output readable and maintainable.",
      repo_url: "",
      live_url: "",
      is_featured: false,
    },
  ],
  experiences: [
    {
      company: "Microsoft",
      role: "Software Engineer, VDI Team",
      location: "Taipei, Taiwan",
      period: "Mar 2022 — Apr 2025",
      summary:
        "Worked across Azure AI Studio migration, enterprise document workflows, developer tooling, accessibility, and delivery operations.",
      highlights: [
        "Migrated VDI products into Azure AI Studio and aligned legacy capabilities with scalable AI-enabled workflows.",
        "Used AI-assisted development tools to speed up workflow optimization for enterprise document processing.",
        "Standardized Linux workflows with WSL2 to reduce setup friction and improve team-wide velocity.",
      ],
    },
    {
      company: "Gold Crown Technology Co., Ltd.",
      role: "Front-End Developer",
      location: "Taipei, Taiwan",
      period: "Feb 2021 — Feb 2022",
      summary:
        "Built React and Vue applications with a focus on search visibility, faster rendering, and clearer product interactions.",
      highlights: [
        "Delivered high-performance interfaces in React, Vue, and TypeScript.",
        "Improved SEO and load times through Next.js SSR and GraphQL-driven rendering.",
      ],
    },
    {
      company: "DediProg",
      role: "Front-End Developer",
      location: "Taipei, Taiwan",
      period: "Nov 2020 — Feb 2021",
      summary:
        "Maintained and modernized legacy front-end systems while improving runtime performance.",
      highlights: [
        "Updated older jQuery-based workflows without disrupting existing product behavior.",
      ],
    },
    {
      company: "KozyGuru",
      role: "Front-End Developer",
      location: "Taipei, Taiwan",
      period: "Feb 2020 — Jul 2020",
      summary:
        "Built the core property management workflow for Australian Airbnb listings.",
      highlights: [
        "Shipped product-facing workflows for listing operations and day-to-day management.",
      ],
    },
  ],
  writings: [
    {
      title: "Life in Microsoft",
      slug: "life-in-microsoft",
      eyebrow: "Journal",
      category: "Work",
      reading_time: "4 min read",
      summary:
        "Notes from working inside a large product organization where reliability, accessibility, and delivery operations mattered as much as feature work.",
      body:
        "My Microsoft work was never only about UI delivery. It involved moving VDI capabilities into Azure AI Studio, tightening document workflows, and making the developer environment stable enough that teams could move faster without repeating setup work.",
    },
    {
      title: "Life at Adelaide University",
      slug: "life-at-adelaide-university",
      eyebrow: "Journal",
      category: "Study",
      reading_time: "3 min read",
      summary:
        "Current study in Adelaide is sharpening the systems side of my work: distributed thinking, AI engineering, and the discipline behind maintainable product builds.",
      body:
        "Graduate study gives me room to think more deliberately about scale, architecture, and how AI tools fit into a real engineering process instead of becoming a shortcut with no operational depth.",
    },
    {
      title: "Building with AI Tools Without Losing Engineering Discipline",
      slug: "building-with-ai-tools-without-losing-engineering-discipline",
      eyebrow: "Blog",
      category: "Practice",
      reading_time: "5 min read",
      summary:
        "A working approach to AI-assisted delivery that treats generated output as a starting point, not a substitute for architecture, verification, or clean operations.",
      body:
        "I use tools like Codex, Copilot, and local models to accelerate implementation, but the real leverage still comes from problem framing, clear interfaces, and making the finished system easy to reason about after the code is written.",
    },
  ],
  books: [],
  references: [
    {
      name: "Shih Chia Wang",
      role: "Senior Software Engineer",
      organization: "Microsoft",
      email: "scwang0103@gmail.com",
      relationship: "Engineering reference",
    },
    {
      name: "Debby King",
      role: "Principal Program Manager",
      organization: "Microsoft",
      email: "debbyk@microsoft.com",
      relationship: "Program leadership reference",
    },
  ],
};

function joinApiUrl(baseUrl: string, path: string) {
  return `${baseUrl.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

export async function getPortfolioContent(): Promise<PortfolioContent> {
  const apiBase =
    process.env.PORTFOLIO_API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    "http://localhost:8000/api";

  try {
    const response = await fetch(joinApiUrl(apiBase, "content/"), {
      cache: "no-store",
      signal: AbortSignal.timeout(1500),
    });

    if (!response.ok) {
      throw new Error(`Unexpected API response ${response.status}`);
    }

    const payload = (await response.json()) as Partial<PortfolioContent>;

    return {
      profile: payload.profile ?? fallbackContent.profile,
      projects: Array.isArray(payload.projects) ? payload.projects : fallbackContent.projects,
      experiences: Array.isArray(payload.experiences)
        ? payload.experiences
        : fallbackContent.experiences,
      writings: Array.isArray(payload.writings) ? payload.writings : fallbackContent.writings,
      books: Array.isArray(payload.books) ? payload.books : fallbackContent.books,
      references: Array.isArray(payload.references)
        ? payload.references
        : fallbackContent.references,
    };
  } catch {
    return fallbackContent;
  }
}
