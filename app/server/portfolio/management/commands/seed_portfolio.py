from django.core.management.base import BaseCommand

from portfolio.models import (
    BookNote,
    Capability,
    Education,
    Experience,
    Project,
    ProjectScreenshot,
    Reference,
    SiteProfile,
    WritingEntry,
)
from portfolio.resume_content import RESUME_EXPERIENCES, RESUME_PROJECTS
from portfolio.resume_source import load_resume_education_entries, load_resume_reference_entries


class Command(BaseCommand):
    help = "Seed initial portfolio content for the book-cv site."

    def handle(self, *_args, **_options):
        SiteProfile.objects.update_or_create(
            id=1,
            defaults={
                "full_name": "Book Sam",
                "title": "Software engineer building AI products, delivery systems, and readable web experiences.",
                "summary": (
                    "I work across product UI, backend systems, and AI-enabled delivery. My background spans "
                    "Microsoft, front-end product work, microservice architecture practice, and self-hosted "
                    "AI infrastructure."
                ),
                "location": "Adelaide, Australia",
                "email": "book.in.au@outlook.com",
                "github_url": "https://github.com/bookmountain",
                "linkedin_url": "https://linkedin.com/in/book-sam-603004169",
            },
        )

        seed_projects = [
            {
                "title": "Book Sam Portfolio",
                "slug": "book-sam-portfolio",
                "eyebrow": "Live Product",
                "stack": "Next.js 16, Django 6, PostgreSQL, Docker",
                "summary": (
                    "A content-managed portfolio with routed pages for projects, writing, books, and references."
                ),
                "details": (
                    "This site is treated as a real product rather than a static profile page. The frontend is "
                    "built in Next.js with routed sections, while Django provides the editing surface through "
                    "the admin. That setup lets me keep the public site clean while still updating project "
                    "details, blog posts, screenshots, books, and reference quotes without touching the UI code.\n\n"
                    "The underlying stack is intentionally practical: Docker for repeatable deployment, PostgreSQL "
                    "for structured content, and a GitHub Actions pipeline that redeploys on push to the main branch."
                ),
                "highlights": [
                    "Split the portfolio into real pages instead of a single anchor-heavy landing page.",
                    "Added editable project galleries, reference quotes, and reading notes through Django admin.",
                    "Kept deployment simple with Docker Compose, Cloudflare Tunnel, and GitHub Actions.",
                ],
                "repo_url": "https://github.com/bookmountain/book-cv",
                "live_url": "https://me.bookmountain.work",
                "sort_order": 6,
            },
            {
                "title": "AI Agent Infrastructure Homelab",
                "slug": "ai-agent-infrastructure-homelab",
                "eyebrow": "Private AI",
                "stack": "Proxmox, Ollama, Python Automation",
                "summary": (
                    "A self-hosted lab for local LLM experimentation, repeatable automation workflows, and private "
                    "AI development without recurring API spend."
                ),
                "details": (
                    "The homelab is where I move beyond consuming AI APIs and work closer to the underlying runtime. "
                    "I use Proxmox to structure local environments, Ollama to run local models, and Python automation "
                    "to make experiments repeatable instead of manual.\n\n"
                    "That matters because it turns AI exploration into infrastructure and workflow design. It also lets "
                    "me evaluate privacy, latency, and reliability tradeoffs directly instead of treating them as "
                    "abstract concerns."
                ),
                "highlights": [
                    "Configured local model workflows with an emphasis on privacy, repeatability, and lower latency.",
                    "Used Python automation to connect local models into practical agent-style experiments.",
                    "Built a low-cost environment for applied AI work without depending on paid API calls.",
                ],
                "repo_url": "https://github.com/bookmountain",
                "live_url": "",
                "sort_order": 7,
            },
            {
                "title": "Playwright Automation Workflow",
                "slug": "playwright-automation-workflow",
                "eyebrow": "Current Build Queue",
                "stack": "Playwright, TypeScript, CI",
                "summary": (
                    "A browser automation workflow for regression coverage, portfolio smoke tests, and faster preview "
                    "validation."
                ),
                "details": (
                    "This is the next step in turning my personal stack into something with reliable verification. "
                    "The goal is to use Playwright for smoke tests, visual sanity checks, and key user-path coverage "
                    "so deployment confidence does not depend on manual clicking."
                ),
                "highlights": [
                    "Browser-level checks for critical paths.",
                    "Designed for GitHub Actions preview validation.",
                ],
                "sort_order": 8,
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
                "details": (
                    "This project is about operational clarity. I want the setup to be understandable, portable, and "
                    "easy to rebuild rather than a one-off environment that only works on one machine."
                ),
                "highlights": [
                    "Documented setup and environment assumptions.",
                    "Focused on repeatability instead of one-machine hacks.",
                ],
                "sort_order": 9,
                "is_featured": False,
            },
        ]

        # Resume projects come first, in resume order. The resume does not cover the toolkit's
        # long-form text, so the seed keeps its own details and highlights for it.
        resume_project_extras = {
            "microsoft-form-recognizer-toolkit": {
                "details": (
                    "This project reflects a public, inspectable part of my Microsoft work. Contributing to the "
                    "official toolkit meant working within existing conventions, keeping developer ergonomics in mind, "
                    "and improving tools that supported Azure AI document workflows.\n\n"
                    "The important signal here is not just that the repository is public. It shows that I can work "
                    "inside a large organization's engineering standards and contribute in a way that helps other "
                    "developers use the platform effectively."
                ),
                "highlights": [
                    "Contributed to Microsoft's public developer tooling around Form Recognizer workflows.",
                    "Worked in a codebase where usability and documentation mattered alongside implementation.",
                    "Used the project as a bridge between internal product work and public developer experience.",
                ],
            },
        }
        seed_projects = [
            {**payload, **resume_project_extras.get(payload["slug"], {}), "sort_order": index}
            for index, payload in enumerate(RESUME_PROJECTS, start=1)
        ] + seed_projects

        seeded_projects = []
        for payload in seed_projects:
            project, _created = Project.objects.update_or_create(slug=payload["slug"], defaults=payload)
            seeded_projects.append(project)

        screenshot_seed = {
            "book-sam-portfolio": [
                {
                    "title": "Multi-page structure",
                    "introduction": (
                        "A routed information architecture with separate spaces for projects, blog posts, books, "
                        "and references."
                    ),
                    "alt_text": "Book Sam portfolio page structure preview",
                },
                {
                    "title": "Project editing workflow",
                    "introduction": (
                        "The project section is backed by Django admin so screenshots, introductions, and links can "
                        "be updated without editing React components."
                    ),
                    "alt_text": "Portfolio project editing workflow preview",
                },
            ],
            "microservice-demo-auction-platform": [
                {
                    "title": "Service topology",
                    "introduction": (
                        "A view intended for the service boundaries, gateway routing, and message-driven flows."
                    ),
                    "alt_text": "Microservice service topology placeholder",
                },
                {
                    "title": "Auction workflow",
                    "introduction": (
                        "A place for a frontend flow screenshot showing listing, bidding, and live update behavior."
                    ),
                    "alt_text": "Auction workflow placeholder",
                },
            ],
            "microsoft-form-recognizer-toolkit": [
                {
                    "title": "Toolkit walkthrough",
                    "introduction": (
                        "A place for the toolkit flow that shows how document processing is organized for developers."
                    ),
                    "alt_text": "Form Recognizer toolkit walkthrough placeholder",
                },
                {
                    "title": "Developer touchpoints",
                    "introduction": (
                        "Use this slot for a screenshot that illustrates contribution surfaces, docs, or sample usage."
                    ),
                    "alt_text": "Form Recognizer developer touchpoints placeholder",
                },
            ],
            "ai-agent-infrastructure-homelab": [
                {
                    "title": "Homelab topology",
                    "introduction": (
                        "A good place for a Proxmox or local model infrastructure view."
                    ),
                    "alt_text": "AI homelab topology placeholder",
                },
                {
                    "title": "Local model workflow",
                    "introduction": (
                        "Use this slot for the part that shows Ollama, automation scripts, and agent experiments."
                    ),
                    "alt_text": "Local model workflow placeholder",
                },
            ],
        }

        for project in seeded_projects:
            for index, screenshot in enumerate(screenshot_seed.get(project.slug, []), start=1):
                ProjectScreenshot.objects.update_or_create(
                    project=project,
                    title=screenshot["title"],
                    defaults={
                        **screenshot,
                        "sort_order": index,
                        "image_url": screenshot.get("image_url", ""),
                    },
                )

        for index, payload in enumerate(RESUME_EXPERIENCES, start=1):
            Experience.objects.update_or_create(
                company=payload["company"],
                defaults={**payload, "sort_order": index},
            )

        seeded_education_ids = []

        for entry in load_resume_education_entries():
            education, _created = Education.objects.update_or_create(
                degree=entry.degree,
                institution=entry.institution,
                defaults={
                    "location": entry.location,
                    "period": entry.period,
                    "sort_order": entry.sort_order,
                },
            )
            seeded_education_ids.append(education.id)

        Education.objects.exclude(id__in=seeded_education_ids).delete()

        seed_capabilities = [
            {
                "label": "Application",
                "value": "TypeScript, React, Next.js, NestJS, Vue, PostgreSQL",
                "sort_order": 1,
            },
            {
                "label": "AI",
                "value": "Azure AI Studio, Ollama, RAG architecture, Codex, Copilot",
                "sort_order": 2,
            },
            {
                "label": "Automation",
                "value": "Playwright, Selenium, pragmatic CI, browser verification",
                "sort_order": 3,
            },
            {
                "label": "Systems",
                "value": "Proxmox, Linux, Docker, RabbitMQ, gRPC, WSL2",
                "sort_order": 4,
            },
        ]

        for payload in seed_capabilities:
            Capability.objects.update_or_create(label=payload["label"], defaults=payload)

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
                    "My Microsoft work was never only about UI delivery. It involved moving VDI capabilities into "
                    "Azure AI Studio, tightening document workflows, and making the developer environment stable "
                    "enough that teams could move faster without repeating setup work.\n\n"
                    "What I value most from that period is the operational discipline. It sharpened how I think about "
                    "scale, collaboration, accessibility, and the difference between shipping code and maintaining a "
                    "product that other teams can rely on."
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
                    "Graduate study gives me room to think more deliberately about distributed systems, architecture, "
                    "and how AI tools fit into real engineering work.\n\n"
                    "The useful part is not collecting theory for its own sake. It is having a stronger framework for "
                    "making tradeoffs in the systems I build and operate."
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
                    "I use tools like Codex, Copilot, and local models to accelerate implementation, but the real "
                    "leverage still comes from problem framing, clear interfaces, and making the finished system easy "
                    "to reason about after the code is written.\n\n"
                    "AI makes some parts of implementation cheaper. That increases the value of the surrounding work: "
                    "architecture, verification, deployment, observability, and making systems understandable to the "
                    "next person who touches them."
                ),
                "sort_order": 3,
            },
            {
                "title": "Why I Treat My Portfolio Like a Product",
                "slug": "why-i-treat-my-portfolio-like-a-product",
                "eyebrow": "Blog",
                "category": "Portfolio",
                "reading_time": "4 min read",
                "summary": (
                    "A portfolio is more convincing when it behaves like a maintained product instead of a frozen "
                    "brochure."
                ),
                "body": (
                    "I want this site to show how I build, not only what I claim. That is why the portfolio has "
                    "routed pages, structured content, deploy automation, and admin-managed updates.\n\n"
                    "The more the site behaves like a small real product, the more honestly it represents how I think "
                    "about engineering quality."
                ),
                "sort_order": 4,
            },
        ]

        for payload in seed_writings:
            WritingEntry.objects.update_or_create(slug=payload["slug"], defaults=payload)

        seed_books = [
            {
                "title": "The Pragmatic Programmer",
                "author": "Andrew Hunt and David Thomas",
                "summary": (
                    "A reminder that strong engineers think in habits: clear communication, steady improvement, "
                    "and responsibility for the whole system instead of only the line of code in front of them."
                ),
                "takeaway": "Good engineering is a craft built through compounding habits, not isolated cleverness.",
                "sort_order": 1,
            },
            {
                "title": "Domain-Driven Design",
                "author": "Eric Evans",
                "summary": (
                    "This book sharpened how I think about language, boundaries, and the cost of vague domain models. "
                    "It is especially useful when product complexity starts leaking into every layer of the system."
                ),
                "takeaway": "Clear domains and explicit boundaries make complex systems survivable.",
                "sort_order": 2,
            },
            {
                "title": "Clean Code",
                "author": "Robert C. Martin",
                "summary": (
                    "Not every rule needs to be treated as doctrine, but the core lesson still matters: code should "
                    "be easier to understand after you touch it, not harder."
                ),
                "takeaway": "Readability and discipline scale better than personal cleverness.",
                "sort_order": 3,
            },
            {
                "title": "Designing Data-Intensive Applications",
                "author": "Martin Kleppmann",
                "summary": (
                    "This is the book I return to when I want to reason about systems under load, data movement, "
                    "tradeoffs in consistency, and what distributed architecture choices really imply."
                ),
                "takeaway": "Distributed systems choices are tradeoffs, not free upgrades.",
                "sort_order": 4,
            },
            {
                "title": "Dive Into Design Patterns",
                "author": "Alexander Shvets",
                "summary": (
                    "A practical design-pattern reference that is useful when I want to think about composition, "
                    "responsibility, and how to keep object interactions from turning into a mess."
                ),
                "takeaway": "Patterns are useful when they clarify intent, not when they become decoration.",
                "sort_order": 5,
            },
        ]

        for payload in seed_books:
            BookNote.objects.update_or_create(title=payload["title"], defaults=payload)

        seeded_reference_emails = set()

        for entry in load_resume_reference_entries():
            seeded_reference_emails.add(entry.email)
            Reference.objects.update_or_create(
                email=entry.email,
                defaults={
                    "name": entry.name,
                    "role": entry.role,
                    "organization": entry.organization,
                    "relationship": entry.relationship,
                    "quote": "",
                    "sort_order": entry.sort_order,
                },
            )

        Reference.objects.exclude(email__in=seeded_reference_emails).delete()

        self.stdout.write(self.style.SUCCESS("Seeded portfolio content."))
