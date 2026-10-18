import json
from io import StringIO

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import TestCase

from .models import Experience, Project
from .resume_source import load_resume_education_entries


class TestPortfolioApi(TestCase):
    def setUp(self):
        call_command("seed_portfolio")

    def test_root_redirects_to_admin(self):
        response = self.client.get("/", follow=False)

        self.assertEqual(response.status_code, 302)
        self.assertEqual(response["Location"], "/admin/")

    def test_content_endpoint_returns_expected_sections(self):
        response = self.client.get("/api/content/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()

        self.assertIsNotNone(payload["profile"])
        self.assertGreaterEqual(len(payload["projects"]), 4)
        self.assertGreaterEqual(len(payload["experiences"]), 4)
        self.assertEqual(len(payload["education"]), len(load_resume_education_entries()))
        self.assertEqual(len(payload["capabilities"]), 7)
        self.assertGreaterEqual(len(payload["writings"]), 4)
        self.assertEqual(len(payload["books"]), 5)
        self.assertEqual(len(payload["references"]), 2)
        self.assertIn("screenshots", payload["projects"][0])
        self.assertIn("cover_src", payload["writings"][0])
        self.assertIn("cover_src", payload["books"][0])
        self.assertTrue(payload["education"][0]["institution"].startswith("Adelaide University"))
        self.assertEqual(payload["experiences"][0]["company"], "Sampras HK")
        self.assertEqual(payload["references"][0]["organization"], "Microsoft")

    def test_project_detail_endpoint_returns_gallery(self):
        response = self.client.get("/api/projects/book-sam-portfolio/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()

        self.assertEqual(payload["slug"], "book-sam-portfolio")
        self.assertGreaterEqual(len(payload["highlights"]), 2)
        self.assertGreaterEqual(len(payload["screenshots"]), 2)

    def test_writing_detail_endpoint_returns_entry_body(self):
        response = self.client.get("/api/writings/life-in-microsoft/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()

        self.assertEqual(payload["slug"], "life-in-microsoft")
        self.assertIn("Microsoft", payload["body"])
        self.assertIn("cover_src", payload)

    def test_education_endpoint_returns_resume_seeded_entries(self):
        response = self.client.get("/api/education/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()

        expected = load_resume_education_entries()

        self.assertEqual(len(payload), len(expected))
        self.assertEqual(payload[0]["degree"], "Master of Information Technology")
        self.assertEqual(
            [(entry["degree"], entry["institution"]) for entry in payload],
            [(entry.degree, entry.institution) for entry in expected],
        )

    def test_health_endpoint_returns_ok(self):
        response = self.client.get("/api/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")


class TestSyncResumeContent(TestCase):
    def setUp(self):
        Project.objects.create(
            slug="ai-agent-project",
            title="AI Agent Project",
            summary="I recently finished a course and wrote this myself.",
            details="## Written in the admin",
            highlights=["Bounded tools and explicit workflow design.", "Focused on useful orchestration rather than hype."],
            sort_order=3,
        )
        Project.objects.create(slug="site-only", title="Site only", summary="Keep me.", sort_order=7)
        Experience.objects.create(
            company="Microsoft",
            role="Software Engineer, VDI Team",
            period="Mar 2022 — Apr 2025",
            summary="Worked across Azure AI Studio migration, enterprise document workflows, developer tooling, "
            "accessibility, and delivery operations.",
            sort_order=1,
        )

    def test_dry_run_saves_nothing(self):
        call_command("sync_resume_content", "--dry-run", stdout=StringIO())

        self.assertFalse(Project.objects.filter(slug="ucompass").exists())
        self.assertFalse(Experience.objects.filter(company="Sampras HK").exists())

    def test_sync_updates_resume_rows_and_keeps_other_content(self):
        call_command("sync_resume_content", stdout=StringIO())
        call_command("sync_resume_content", stdout=StringIO())

        agent = Project.objects.get(slug="ai-agent-project")
        self.assertEqual(agent.title, "AI Agent Project")
        self.assertEqual(agent.summary, "I recently finished a course and wrote this myself.")
        self.assertEqual(agent.details, "## Written in the admin")
        self.assertEqual(agent.stack, "Java 21, Spring AI, Vue 3, pgvector")
        self.assertIn("ReAct agent", agent.highlights[0])
        self.assertEqual(agent.sort_order, 3)

        site_only = Project.objects.get(slug="site-only")
        self.assertEqual((site_only.summary, site_only.sort_order), ("Keep me.", 7))

        self.assertEqual(Project.objects.filter(slug="ucompass").count(), 1)
        self.assertEqual(
            list(Project.objects.filter(sort_order__gt=7).values_list("slug", flat=True)),
            ["microsoft-form-recognizer-toolkit", "microservice-demo-auction-platform", "ai-web-generator", "ucompass"],
        )

        self.assertEqual(Experience.objects.filter(company="Sampras HK").count(), 1)
        self.assertEqual(
            list(Experience.objects.values_list("company", flat=True)),
            ["Sampras HK", "Microsoft", "Gold Crown Technology Co., Ltd.", "DediProg", "KozyGuru"],
        )
        self.assertEqual(Experience.objects.get(company="Microsoft").sort_order, 1)


class TestAdminMarkdownPreview(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_superuser(
            username="admin",
            email="admin@example.com",
            password="password123",
        )
        self.client.force_login(self.user)

    def test_admin_markdown_preview_renders_html(self):
        response = self.client.post(
            "/admin/markdown-preview/",
            data=json.dumps({"markdown": "## Heading\n\n- first"}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("<h2>Heading</h2>", response.json()["html"])
        self.assertIn("<li>first</li>", response.json()["html"])
