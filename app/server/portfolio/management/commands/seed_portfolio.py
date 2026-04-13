from django.core.management.base import BaseCommand

from portfolio.models import BookNote, Experience, Project, Reference, SiteProfile, WritingEntry


class Command(BaseCommand):
    help = "Seed initial portfolio content for the book-cv site."

    def handle(self, *_args, **_options):
        SiteProfile.objects.update_or_create(
            id=1,
            defaults={
                "full_name": "Book Sam",
                "title": "Software Engineer building AI systems, sharp interfaces, and resilient infrastructure.",
                "summary": (
                    "Microsoft experience, microservice architecture practice, and hands-on local AI "
                    "infrastructure. I build product-facing interfaces, backend systems, and the workflows "
                    "that keep them practical to operate."
                ),
                "location": "Adelaide, Australia",
                "email": "bookmountain0222@gmail.com",
                "github_url": "https://github.com/bookmountain",
                "linkedin_url": "https://linkedin.com/in/book-sam-603004169",
            },
        )

        seed_projects = [
            {
                "title": "Microservice Demo Auction Platform",
                "slug": "microservice-demo-auction-platform",
                "eyebrow": "Architecture",
                "stack": ".NET 8, Next.js 14, RabbitMQ, gRPC",
                "summary": (
                    "A containerized auction platform built around decoupled services, asynchronous events, "
                    "real-time updates, and gateway routing."
                ),
                "repo_url": "https://github.com/bookmountain/microservice-demo",
                "sort_order": 1,
            },
            {
                "title": "Microsoft Form Recognizer Toolkit",
                "slug": "microsoft-form-recognizer-toolkit",
                "eyebrow": "Open Source",
                "stack": "Azure AI, Document Intelligence, GitHub",
                "summary": (
                    "Contribution work inside Microsoft's public toolkit for document intelligence workflows "
                    "and supporting developer tooling."
                ),
                "repo_url": "https://github.com/microsoft/Form-Recognizer-Toolkit",
                "sort_order": 2,
            },
            {
                "title": "AI Agent Infrastructure Homelab",
                "slug": "ai-agent-infrastructure-homelab",
                "eyebrow": "Private AI",
                "stack": "Proxmox, Ollama, Python Automation",
                "summary": (
                    "A self-hosted lab for local LLM experimentation, repeatable automation workflows, and "
                    "private AI development without recurring API spend."
                ),
                "repo_url": "https://github.com/bookmountain",
                "sort_order": 3,
            },
            {
                "title": "Playwright Automation Workflow",
                "slug": "playwright-automation-workflow",
                "eyebrow": "Current Build Queue",
                "stack": "Playwright, TypeScript, CI",
                "summary": (
                    "A browser automation workflow for regression coverage, portfolio smoke tests, and faster "
                    "preview validation."
                ),
                "sort_order": 4,
                "is_featured": False,
            },
            {
                "title": "OpenClaw Setup Notes",
                "slug": "openclaw-setup-notes",
                "eyebrow": "Current Build Queue",
                "stack": "Local tooling, AI workflows",
                "summary": (
                    "A documented setup for integrating OpenClaw into a local AI workflow and making the stack "
                    "repeatable on new machines."
                ),
                "sort_order": 5,
                "is_featured": False,
            },
            {
                "title": "AI Agent Project",
                "slug": "ai-agent-project",
                "eyebrow": "Current Build Queue",
                "stack": "Python, local models, agent orchestration",
                "summary": (
                    "An experiment in agent-style workflows that combine structured prompts, tooling, and local "
                    "model infrastructure."
                ),
                "sort_order": 6,
                "is_featured": False,
            },
            {
                "title": "AI Web Generator",
                "slug": "ai-web-generator",
                "eyebrow": "Current Build Queue",
                "stack": "Next.js, Django, prompt workflows",
                "summary": (
                    "A project focused on generating practical web experiences while keeping the output readable, "
                    "maintainable, and grounded in real implementation details."
                ),
                "sort_order": 7,
                "is_featured": False,
            },
        ]

        for payload in seed_projects:
            Project.objects.update_or_create(slug=payload["slug"], defaults=payload)

        seed_experiences = [
            {
                "company": "Microsoft",
                "role": "Software Engineer, VDI Team",
                "location": "Taipei, Taiwan",
                "period": "Mar 2022 — Apr 2025",
                "summary": (
                    "Worked across Azure AI Studio migration, enterprise document workflows, developer tooling, "
                    "accessibility, and delivery operations."
                ),
                "highlights": [
                    "Migrated VDI products into Azure AI Studio and aligned legacy capabilities with scalable AI-enabled workflows.",
                    "Used AI-assisted development tools to speed up workflow optimization for enterprise document processing.",
                    "Standardized Linux workflows with WSL2 to reduce setup friction and improve team-wide velocity.",
                ],
                "sort_order": 1,
            },
            {
                "company": "Gold Crown Technology Co., Ltd.",
                "role": "Front-End Developer",
                "location": "Taipei, Taiwan",
                "period": "Feb 2021 — Feb 2022",
                "summary": (
                    "Built React and Vue applications with a focus on search visibility, faster rendering, and "
                    "clearer product interactions."
                ),
                "highlights": [
                    "Delivered high-performance interfaces in React, Vue, and TypeScript.",
                    "Improved SEO and load times through Next.js SSR and GraphQL-driven rendering.",
                ],
                "sort_order": 2,
            },
            {
                "company": "DediProg",
                "role": "Front-End Developer",
                "location": "Taipei, Taiwan",
                "period": "Nov 2020 — Feb 2021",
                "summary": "Maintained and modernized legacy front-end systems while improving runtime performance.",
                "highlights": [
                    "Updated older jQuery-based workflows without disrupting existing product behavior.",
                ],
                "sort_order": 3,
            },
            {
                "company": "KozyGuru",
                "role": "Front-End Developer",
                "location": "Taipei, Taiwan",
                "period": "Feb 2020 — Jul 2020",
                "summary": "Built the core property management workflow for Australian Airbnb listings.",
                "highlights": [
                    "Shipped product-facing workflows for listing operations and day-to-day management.",
                ],
                "sort_order": 4,
            },
        ]

        for payload in seed_experiences:
            Experience.objects.update_or_create(
                company=payload["company"],
                role=payload["role"],
                defaults=payload,
            )

        seed_writings = [
            {
                "title": "Life in Microsoft",
                "slug": "life-in-microsoft",
                "eyebrow": "Journal",
                "category": "Work",
                "reading_time": "4 min read",
                "summary": (
                    "Notes from working inside a large product organization where reliability, accessibility, "
                    "and delivery operations mattered as much as feature work."
                ),
                "body": (
                    "My Microsoft work was never only about UI delivery. It involved moving VDI capabilities "
                    "into Azure AI Studio, tightening document workflows, and making the developer environment "
                    "stable enough that teams could move faster without repeating setup work."
                ),
                "sort_order": 1,
            },
            {
                "title": "Life at Adelaide University",
                "slug": "life-at-adelaide-university",
                "eyebrow": "Journal",
                "category": "Study",
                "reading_time": "3 min read",
                "summary": (
                    "Current study in Adelaide is sharpening the systems side of my work: distributed thinking, "
                    "AI engineering, and the discipline behind maintainable product builds."
                ),
                "body": (
                    "My graduate study complements the day-to-day engineering work. It gives me room to think "
                    "more deliberately about scale, architecture, and how AI tools fit into a real engineering "
                    "process instead of becoming a shortcut with no operational depth."
                ),
                "sort_order": 2,
            },
            {
                "title": "Building with AI Tools Without Losing Engineering Discipline",
                "slug": "building-with-ai-tools-without-losing-engineering-discipline",
                "eyebrow": "Blog",
                "category": "Practice",
                "reading_time": "5 min read",
                "summary": (
                    "A working approach to AI-assisted delivery that treats generated output as a starting point, "
                    "not a substitute for architecture, verification, or clean operations."
                ),
                "body": (
                    "I use tools like Codex, Copilot, and local models to accelerate implementation, but the "
                    "real leverage still comes from problem framing, clear interfaces, and making the finished "
                    "system easy to reason about after the code is written."
                ),
                "sort_order": 3,
            },
        ]

        for payload in seed_writings:
            WritingEntry.objects.update_or_create(slug=payload["slug"], defaults=payload)

        seed_references = [
            {
                "name": "Shih Chia Wang",
                "role": "Senior Software Engineer",
                "organization": "Microsoft",
                "email": "scwang0103@gmail.com",
                "relationship": "Engineering reference",
                "sort_order": 1,
            },
            {
                "name": "Debby King",
                "role": "Principal Program Manager",
                "organization": "Microsoft",
                "email": "debbyk@microsoft.com",
                "relationship": "Program leadership reference",
                "sort_order": 2,
            },
        ]

        for payload in seed_references:
            Reference.objects.update_or_create(email=payload["email"], defaults=payload)

        BookNote.objects.filter(is_published=False).delete()

        self.stdout.write(self.style.SUCCESS("Seeded portfolio content."))
