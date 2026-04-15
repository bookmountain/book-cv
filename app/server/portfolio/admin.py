from django.contrib import admin
from .models import BookNote, Capability, Experience, Project, ProjectScreenshot, Reference, SiteProfile, WritingEntry


class ProjectScreenshotInline(admin.StackedInline):
    model = ProjectScreenshot
    extra = 0
    fields = ("title", "introduction", "image", "image_url", "alt_text", "sort_order")


@admin.register(SiteProfile)
class SiteProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "title", "location", "updated_at")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "eyebrow", "is_featured", "sort_order", "updated_at")
    list_filter = ("is_featured", "eyebrow")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "summary", "details", "stack")
    ordering = ("sort_order",)
    inlines = [ProjectScreenshotInline]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("company", "role", "period", "location", "sort_order", "updated_at")
    search_fields = ("company", "role", "location")
    ordering = ("sort_order",)


@admin.register(Capability)
class CapabilityAdmin(admin.ModelAdmin):
    list_display = ("label", "sort_order", "updated_at")
    search_fields = ("label", "value")
    ordering = ("sort_order",)


@admin.register(WritingEntry)
class WritingEntryAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "reading_time", "is_featured", "sort_order", "updated_at")
    list_filter = ("is_featured", "category")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "summary", "body")
    ordering = ("sort_order",)


@admin.register(BookNote)
class BookNoteAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "is_published", "sort_order", "updated_at")
    list_filter = ("is_published",)
    search_fields = ("title", "author", "summary", "takeaway")
    ordering = ("sort_order",)


@admin.register(Reference)
class ReferenceAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "organization", "email", "sort_order", "updated_at")
    search_fields = ("name", "role", "organization", "email", "relationship", "quote")
    ordering = ("sort_order",)
