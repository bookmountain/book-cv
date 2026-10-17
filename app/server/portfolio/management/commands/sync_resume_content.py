from django.core.management.base import BaseCommand
from django.db import transaction
from django.db.models import Max, Min

from portfolio.legacy_seed_text import LEGACY_EXPERIENCE_TEXT, LEGACY_PROJECT_TEXT
from portfolio.models import Experience, Project
from portfolio.resume_content import RESUME_EXPERIENCES, RESUME_PROJECTS

# Short fields the resume owns. They are always set to the resume value.
PROJECT_RESUME_FIELDS = ("stack", "repo_url", "live_url")
EXPERIENCE_RESUME_FIELDS = ("role", "location", "period")

# Text fields that may have been written by hand in the admin. They are only replaced
# when the live value is empty or still the text an older seed wrote.
PROJECT_TEXT_FIELDS = ("summary", "details", "highlights")
EXPERIENCE_TEXT_FIELDS = ("summary", "highlights")

# Only used when a project row has to be created.
PROJECT_CREATE_FIELDS = ("title", "eyebrow", "is_featured")


def _normalize(value):
    if isinstance(value, list):
        return [_normalize(item) for item in value]
    if isinstance(value, str):
        return " ".join(value.replace("\r\n", "\n").split())
    return value


def _is_replaceable(current, legacy_values):
    if current in ("", None, []):
        return True
    return any(_normalize(current) == _normalize(legacy) for legacy in legacy_values)


def _preview(value, limit=70):
    text = " | ".join(value) if isinstance(value, list) else str(value)
    text = " ".join(text.split())
    return text if len(text) <= limit else f"{text[: limit - 1]}…"


class Command(BaseCommand):
    help = (
        "Create or update the resume-covered Project and Experience rows (matched by project slug "
        "and experience company). Other rows and other models are not touched."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Show what would change, then roll back without saving anything.",
        )

    def handle(self, *_args, dry_run=False, **_options):
        self.counts = {"created": 0, "updated": 0, "unchanged": 0}

        with transaction.atomic():
            self.stdout.write(self.style.MIGRATE_HEADING("Projects"))
            for payload in RESUME_PROJECTS:
                self._sync_project(payload)

            self.stdout.write(self.style.MIGRATE_HEADING("Experiences"))
            for index, payload in enumerate(RESUME_EXPERIENCES):
                self._sync_experience(payload, is_newest=index == 0)

            self._print_order()

            if dry_run:
                transaction.set_rollback(True)

        summary = ", ".join(f"{count} {label}" for label, count in self.counts.items())
        if dry_run:
            self.stdout.write(self.style.WARNING(f"Dry run: {summary}. Nothing was saved."))
        else:
            self.stdout.write(self.style.SUCCESS(f"Synced resume content: {summary}."))

    def _sync_project(self, payload):
        slug = payload["slug"]
        project = Project.objects.filter(slug=slug).first()

        if project is None:
            # New projects go after every existing project so the current order is kept.
            next_order = (Project.objects.aggregate(value=Max("sort_order"))["value"] or 0) + 1
            fields = {
                key: payload[key]
                for key in (*PROJECT_CREATE_FIELDS, *PROJECT_RESUME_FIELDS, *PROJECT_TEXT_FIELDS)
                if key in payload
            }
            Project.objects.create(slug=slug, sort_order=next_order, **fields)
            self._report("create", f"project {slug}", [f"sort_order={next_order}", *sorted(fields)])
            return

        legacy = LEGACY_PROJECT_TEXT.get(slug, {})
        self._apply(project, payload, f"project {slug}", PROJECT_RESUME_FIELDS, PROJECT_TEXT_FIELDS, legacy)

    def _sync_experience(self, payload, is_newest):
        company = payload["company"]
        matches = list(Experience.objects.filter(company=company).order_by("sort_order", "id"))

        if len(matches) > 1:
            self.stdout.write(
                self.style.WARNING(f"  ! {len(matches)} experiences found for {company!r}; updating id={matches[0].id} only")
            )

        if not matches:
            sort_order = self._top_experience_sort_order() if is_newest else self._next_experience_sort_order()
            fields = {key: payload[key] for key in (*EXPERIENCE_RESUME_FIELDS, *EXPERIENCE_TEXT_FIELDS)}
            Experience.objects.create(company=company, sort_order=sort_order, **fields)
            self._report("create", f"experience {company}", [f"sort_order={sort_order}", *sorted(fields)])
            return

        legacy = LEGACY_EXPERIENCE_TEXT.get(company, {})
        self._apply(matches[0], payload, f"experience {company}", EXPERIENCE_RESUME_FIELDS, EXPERIENCE_TEXT_FIELDS, legacy)

    def _next_experience_sort_order(self):
        return (Experience.objects.aggregate(value=Max("sort_order"))["value"] or 0) + 1

    def _top_experience_sort_order(self):
        """The newest resume job (Sampras HK) goes first. Existing rows only move if there is no room above it."""
        lowest = Experience.objects.aggregate(value=Min("sort_order"))["value"]

        if lowest is None:
            return 0
        if lowest > 0:
            return lowest - 1

        for experience in Experience.objects.all():
            experience.sort_order += 1
            experience.save(update_fields=["sort_order", "updated_at"])
        self.stdout.write("  ~ shifted existing experience sort_order values by +1 to make room at the top")
        return 0

    def _apply(self, instance, payload, label, resume_fields, text_fields, legacy):
        changed = []
        kept = []

        for field in resume_fields:
            if field in payload and getattr(instance, field) != payload[field]:
                setattr(instance, field, payload[field])
                changed.append(field)

        for field in text_fields:
            if field not in payload:
                continue

            current = getattr(instance, field)
            if _normalize(current) == _normalize(payload[field]):
                continue

            legacy_values = [legacy[field]] if field in legacy else []
            if _is_replaceable(current, legacy_values):
                setattr(instance, field, payload[field])
                changed.append(field)
            else:
                kept.append(field)

        if changed:
            instance.save(update_fields=[*changed, "updated_at"])
            self._report("update", label, changed)
        else:
            self._report("unchanged", label, [])

        for field in kept:
            self.stdout.write(
                f"    kept {field} (written in the admin): {_preview(getattr(instance, field))!r}"
            )

    def _report(self, action, label, fields):
        key = {"create": "created", "update": "updated", "unchanged": "unchanged"}[action]
        self.counts[key] += 1
        detail = f": {', '.join(fields)}" if fields else ""
        style = {"create": self.style.SUCCESS, "update": self.style.WARNING, "unchanged": str}[action]
        self.stdout.write(style(f"  {action:<9} {label}{detail}"))

    def _print_order(self):
        self.stdout.write(self.style.MIGRATE_HEADING("Resulting order"))
        for project in Project.objects.order_by("sort_order", "title"):
            self.stdout.write(f"  project    {project.sort_order:>3}  {project.slug}")
        for experience in Experience.objects.order_by("sort_order", "company"):
            self.stdout.write(f"  experience {experience.sort_order:>3}  {experience.company}")
