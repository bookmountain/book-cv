from django.db import models


class SiteProfile(models.Model):
    full_name = models.CharField(max_length=120)
    title = models.CharField(max_length=180)
    summary = models.TextField()
    location = models.CharField(max_length=120, blank=True)
    email = models.EmailField(blank=True)
    github_url = models.URLField(blank=True)
    linkedin_url = models.URLField(blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site profile"
        verbose_name_plural = "Site profile"

    def __str__(self) -> str:
        return self.full_name


class Project(models.Model):
    title = models.CharField(max_length=160)
    slug = models.SlugField(unique=True, max_length=120)
    eyebrow = models.CharField(max_length=80, blank=True)
    stack = models.CharField(max_length=240, blank=True)
    summary = models.TextField()
    details = models.TextField(blank=True)
    highlights = models.JSONField(default=list, blank=True)
    repo_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self) -> str:
        return self.title


class ProjectScreenshot(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="screenshots")
    title = models.CharField(max_length=160)
    introduction = models.TextField(blank=True)
    image = models.FileField(upload_to="project-screenshots/", blank=True)
    image_url = models.URLField(blank=True)
    alt_text = models.CharField(max_length=180, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self) -> str:
        return f"{self.project.title} — {self.title}"


class Experience(models.Model):
    company = models.CharField(max_length=160)
    role = models.CharField(max_length=180)
    location = models.CharField(max_length=120, blank=True)
    period = models.CharField(max_length=80)
    summary = models.TextField()
    highlights = models.JSONField(default=list, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "company"]

    def __str__(self) -> str:
        return f"{self.company} — {self.role}"


class Education(models.Model):
    degree = models.CharField(max_length=180)
    institution = models.CharField(max_length=180)
    location = models.CharField(max_length=120, blank=True)
    period = models.CharField(max_length=80)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "institution"]

    def __str__(self) -> str:
        return f"{self.degree} — {self.institution}"


class Capability(models.Model):
    label = models.CharField(max_length=120, unique=True)
    value = models.TextField()
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "label"]

    def __str__(self) -> str:
        return self.label


class WritingEntry(models.Model):
    title = models.CharField(max_length=180)
    slug = models.SlugField(unique=True, max_length=120)
    eyebrow = models.CharField(max_length=80, blank=True)
    category = models.CharField(max_length=60, blank=True)
    reading_time = models.CharField(max_length=40, blank=True)
    summary = models.TextField()
    body = models.TextField(blank=True)
    cover = models.FileField(upload_to="writing-covers/", blank=True)
    is_featured = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self) -> str:
        return self.title


class WritingAsset(models.Model):
    entry = models.ForeignKey(WritingEntry, on_delete=models.CASCADE, related_name="assets")
    title = models.CharField(max_length=160)
    image = models.FileField(upload_to="writing-assets/")
    alt_text = models.CharField(max_length=180, blank=True)
    caption = models.CharField(max_length=220, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self) -> str:
        return f"{self.entry.title} — {self.title}"


class BookNote(models.Model):
    title = models.CharField(max_length=180)
    author = models.CharField(max_length=120, blank=True)
    summary = models.TextField()
    takeaway = models.CharField(max_length=220, blank=True)
    cover = models.FileField(upload_to="book-covers/", blank=True)
    is_published = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self) -> str:
        return self.title


class Reference(models.Model):
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=180)
    organization = models.CharField(max_length=160, blank=True)
    email = models.EmailField(blank=True)
    relationship = models.CharField(max_length=180, blank=True)
    quote = models.TextField(blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self) -> str:
        return self.name
