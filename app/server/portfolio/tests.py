import json

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import TestCase


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
        self.assertEqual(len(payload["capabilities"]), 4)
        self.assertGreaterEqual(len(payload["writings"]), 4)
        self.assertEqual(len(payload["books"]), 5)
        self.assertEqual(len(payload["references"]), 2)
        self.assertIn("screenshots", payload["projects"][0])

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

    def test_health_endpoint_returns_ok(self):
        response = self.client.get("/api/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")


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
