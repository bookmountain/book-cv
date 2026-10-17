"""Project and experience text taken from the resume in ``latex/sections/resume``.

``seed_portfolio`` and ``sync_resume_content`` both read from here, so a fresh seed and
the production sync write the same text. Keep the wording plain and only use numbers
that are in the resume.

Each project dict only holds the fields the resume covers. A field that is left out
(for example ``details`` on the Form Recognizer Toolkit) is never written by the sync.
"""

RESUME_PROJECTS = [
    {
        "slug": "microsoft-form-recognizer-toolkit",
        "title": "Microsoft Form Recognizer Toolkit",
        "eyebrow": "Open Source",
        "is_featured": True,
        # Resume wording, unchanged.
        "stack": "Open Source, Azure AI, GitHub",
        "summary": (
            "Contributor to Microsoft's open-source Form Recognizer Toolkit, supporting document intelligence "
            "tooling in a production-adjacent open-source codebase."
        ),
        "repo_url": "https://github.com/microsoft/Form-Recognizer-Toolkit",
        "live_url": "",
    },
    {
        "slug": "microservice-demo-auction-platform",
        "title": "Microservice Demo Auction Platform",
        "eyebrow": "Architecture",
        "is_featured": True,
        "stack": ".NET 8, Next.js 14, RabbitMQ, Docker",
        "summary": "An auction app built from separate services, with login, bidding, and real-time notifications.",
        "details": (
            "An auction app split into separate services instead of one large API. Users can log in, place bids, "
            "and get real-time notifications.\n\n"
            "The services talk to each other through RabbitMQ messages and gRPC calls. Docker Compose runs all of "
            "the services together."
        ),
        "highlights": [
            "Built an auction app from separate services with login, bidding, and real-time notifications.",
            "Used RabbitMQ and gRPC for communication between services.",
            "Ran all services together with Docker Compose.",
        ],
        "repo_url": "https://github.com/bookmountain/microservice-demo",
        "live_url": "",
    },
    {
        # The live row uses this slug and title; keep both so links and admin edits stay intact.
        "slug": "ai-agent-project",
        "title": "AI Agent Project",
        "eyebrow": "AI Development",
        "is_featured": True,
        "stack": "Java 21, Spring AI, Vue 3, pgvector",
        "summary": "A RAG chatbot and a ReAct agent built with Java 21 and Spring AI, with replies streamed to a Vue 3 UI.",
        "details": (
            "The project has two parts: a RAG chatbot and a ReAct agent.\n\n"
            "The chatbot first searches a pgvector store for document chunks that match the question, then sends "
            "those chunks to the model with the question, so the answer comes from the documents.\n\n"
            "The agent works in a loop: it picks the next step, calls a tool, reads the result, and repeats until "
            "the task is done. Its tools cover web search, PDF generation, web scraping, and MCP tools.\n\n"
            "Replies stream to a Vue 3 UI. The app runs with Docker Compose and deploys through GitHub Actions on "
            "a self-hosted runner."
        ),
        "highlights": [
            "Built a RAG chatbot and a ReAct agent that answer from documents and run tasks with web search, PDF "
            "generation, web scraping, and MCP tools, streaming replies to a Vue 3 UI.",
            "Containerized the application with Docker Compose and configured GitHub Actions deployment through a "
            "self-hosted runner.",
        ],
        "repo_url": "https://github.com/bookmountain/ai-agent",
        "live_url": "https://ai-agent.bookmountain.work",
    },
    {
        "slug": "ai-web-generator",
        "title": "AI Web Generator",
        "eyebrow": "AI Development",
        "is_featured": True,
        "stack": "Java 21, Spring Boot, LangChain4j, LangGraph4j, MySQL, Redis, Vue 3",
        "summary": "A web app that turns a text prompt into a working website and streams the code live.",
        "details": (
            "Type a prompt and the app builds a website in one of three forms: a single HTML file, a set of files, "
            "or a full Vue project. The code streams to the browser over SSE while it is written, and you can click "
            "any element in the preview to edit it.\n\n"
            "The AI agent has 6 file tools. An 11-step LangGraph4j workflow collects images, icons, diagrams, and "
            "logos in 4 parallel branches, then checks code quality and retries if needed.\n\n"
            "Redis stores chat memory and limits each user to 5 requests per minute. Prometheus and Grafana "
            "monitor the service, and the project has 36 tests. It runs with Docker Compose and deploys through "
            "GitHub Actions."
        ),
        "highlights": [
            "Built a web app that turns a text prompt into a working website (single HTML, multi-file, or full Vue "
            "project), streams the code live over SSE, and lets users click any element in the preview to edit it.",
            "Gave the AI agent 6 file tools and built an 11-step LangGraph4j workflow that collects images, icons, "
            "diagrams, and logos in 4 parallel branches, then checks code quality and retries if needed.",
            "Added Redis chat memory, rate limiting (5 requests/min per user), Prometheus/Grafana monitoring, and "
            "36 tests; deployed with Docker Compose and GitHub Actions.",
        ],
        "repo_url": "https://github.com/bookmountain/ai-web-generator",
        "live_url": "https://ai-web-generator.bookmountain.work",
    },
    {
        "slug": "ucompass",
        "title": "UCompass",
        "eyebrow": "Hackathon",
        "is_featured": True,
        "stack": "React Native, Expo, ASP.NET Core, PostGIS, SignalR, Ollama",
        "summary": (
            "A map app for Adelaide and Flinders students to find flatmates, buy and sell items, and join meetups. "
            "Built by a team of 4 in 33 hours at the 2026 CS Club Hackathon."
        ),
        "details": (
            "UCompass was built by a team of 4 in 33 hours at the 2026 CS Club Hackathon (Sep 2026). It is a map "
            "app for Adelaide and Flinders students to find flatmates, buy and sell items, and join meetups.\n\n"
            "I wrote the .NET 10 backend: 55 API endpoints across 12 controllers, login with an email code and JWT, "
            "chat over SignalR, map search with PostGIS, and photo storage on Cloudflare R2.\n\n"
            "Photo AI runs Qwen3-VL on a local Ollama server, so users can fill in a listing or search the market "
            "from a photo. The API is deployed with Docker Compose and GitHub Actions.\n\n"
            "More on the [Devpost page](https://devpost.com/software/ucompass)."
        ),
        "highlights": [
            "Built a map app for Adelaide and Flinders students to find flatmates, buy and sell items, and join "
            "meetups, as a team of 4 at the 2026 CS Club Hackathon (Sep. 2026) in 33 hours.",
            "Wrote the .NET 10 backend: 55 API endpoints across 12 controllers, email-code and JWT login, SignalR "
            "chat, PostGIS map search, and Cloudflare R2 photo storage.",
            "Added photo AI with Qwen3-VL on local Ollama so users can fill in a listing or search the market from "
            "a photo; deployed the API with Docker Compose and GitHub Actions.",
        ],
        "repo_url": "https://github.com/bookmountain/hackathon-2026",
        "live_url": "",
    },
]


# Listed newest first, like the resume. ``company`` is the lookup key.
RESUME_EXPERIENCES = [
    {
        "company": "Sampras HK",
        "role": "Senior Software Engineer",
        "location": "Remote, Hong Kong",
        "period": "Aug 2025 — Present",
        "summary": "Full-stack work on APIs, admin portals, and websites for Hong Kong clients with NestJS, React, and Next.js.",
        "highlights": [
            "Delivered 9 full-stack projects (APIs, admin portals, and websites) with NestJS, React, and Next.js for "
            "Hong Kong clients in retail, finance, food & beverage, and charity.",
            "Reduced API median latency by 97% in local benchmarks (2.5 s to 61–78 ms) on 6 endpoints by optimizing "
            "permission loading, with the same access results for all 692 tested accounts.",
            "Rebuilt the company's virtual waiting-room product on Cloudflare Workers and Durable Objects, replacing "
            "shared DynamoDB queue state with one Durable Object per event; tested with 5,000 simulated visitors.",
        ],
    },
    {
        "company": "Microsoft",
        "role": "Software Engineer, VDI Team",
        "location": "Taipei, Taiwan",
        "period": "Mar 2022 — Apr 2025",
        "summary": "Front-end work on Azure AI Document Intelligence and Azure AI Foundry with React, TypeScript, and Redux.",
        "highlights": [
            "Built front-end features for Azure Form Recognizer Studio (renamed Azure AI Document Intelligence in "
            "2023) with React, TypeScript, and Redux, including the document labeling UI used to train custom "
            "extraction models.",
            "Migrated Document Intelligence Studio features into Azure AI Studio (now Azure AI Foundry) as the two "
            "products merged.",
            "Built a front-end monorepo that combined Azure AI products from multiple departments, as the platform "
            "grew from OCR (Form Recognizer) to images and audio in Azure AI Studio.",
            "Introduced Redux Toolkit Query (RTK Query) for API caching and request deduplication, cutting repeated "
            "API calls and page loading time.",
            "Kept unit test coverage above 90% with Jest and React Testing Library, improving release stability.",
            "Used GitHub Copilot to speed up development of Form Recognizer document processing features.",
            "Set up a shared WSL2 Linux development environment for the team, cutting manual setup work.",
            "Built accessibility features so the product works for more users.",
        ],
    },
    {
        "company": "Gold Crown Technology Co., Ltd.",
        "role": "Front-End Developer",
        "location": "Taipei, Taiwan",
        "period": "Feb 2021 — Feb 2022",
        "summary": "Built web apps with React, Vue, and TypeScript, and added server-side rendering with Next.js and GraphQL.",
        "highlights": [
            "Built web apps with React, Vue, and TypeScript, with a focus on easy-to-use interfaces.",
            "Added server-side rendering with Next.js and GraphQL to improve SEO and page load times.",
        ],
    },
    {
        "company": "DediProg",
        "role": "Front-End Developer",
        "location": "Taipei, Taiwan",
        "period": "Nov 2020 — Feb 2021",
        "summary": "Maintained a legacy jQuery front end and made it faster.",
        "highlights": [
            "Maintained and updated legacy jQuery code and improved front-end performance.",
        ],
    },
    {
        "company": "KozyGuru",
        "role": "Front-End Developer",
        "location": "Taipei, Taiwan",
        "period": "Feb 2020 — Jul 2020",
        "summary": "Built the core property management platform for Australian Airbnb listings.",
        "highlights": [
            "Built the core property management platform for Australian Airbnb listings.",
        ],
    },
]
