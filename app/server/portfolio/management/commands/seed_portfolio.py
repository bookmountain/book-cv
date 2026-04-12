from django.core.management.base import BaseCommand

from portfolio.models import Project, SiteProfile


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
                    "infrastructure. This Django backend powers the admin and future content API."
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
        ]

        for payload in seed_projects:
            Project.objects.update_or_create(slug=payload["slug"], defaults=payload)

        self.stdout.write(self.style.SUCCESS("Seeded portfolio content."))
