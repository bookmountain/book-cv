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
    slug = models.SlugField(unique=True)
    eyebrow = models.CharField(max_length=80, blank=True)
    stack = models.CharField(max_length=240, blank=True)
    summary = models.TextField()
    repo_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=True)
    sort_order = models.PositiveIntegerField(default=0)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]

    def __str__(self) -> str:
        return self.title
