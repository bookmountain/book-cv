from django.contrib import admin
from .models import Project, SiteProfile


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "title", "location", "updated_at")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "eyebrow", "is_featured", "sort_order", "updated_at")
    list_filter = ("is_featured", "eyebrow")
    prepopulated_fields = {"slug": ("title",)}
