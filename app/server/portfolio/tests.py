from django.core.management import call_command
from django.test import TestCase


class TestPortfolioApi(TestCase):
    def setUp(self):
        call_command("seed_portfolio")

    def test_content_endpoint_returns_expected_sections(self):
        response = self.client.get("/api/content/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()

        self.assertIsNotNone(payload["profile"])
        self.assertGreaterEqual(len(payload["projects"]), 3)
        self.assertGreaterEqual(len(payload["experiences"]), 4)
        self.assertGreaterEqual(len(payload["writings"]), 3)
        self.assertEqual(len(payload["references"]), 2)

    def test_health_endpoint_returns_ok(self):
        response = self.client.get("/api/health/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")
