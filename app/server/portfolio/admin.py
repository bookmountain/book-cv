from django.contrib import admin
from django.db import models
from django.utils.html import format_html

from .models import BookNote, Capability, Education, Experience, Project, ProjectScreenshot, Reference, SiteProfile, WritingAsset, WritingEntry
from .widgets import MarkdownEditorWidget


class MarkdownEditorMixin:
    markdown_fields: tuple[str, ...] = ()

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name in self.markdown_fields and isinstance(db_field, models.TextField):
            kwargs["widget"] = MarkdownEditorWidget()
        return super().formfield_for_dbfield(db_field, request, **kwargs)


class ProjectScreenshotInline(MarkdownEditorMixin, admin.StackedInline):
    model = ProjectScreenshot
    extra = 0
    fields = ("title", "introduction", "image", "image_url", "alt_text", "sort_order")
    markdown_fields = ("introduction",)


class WritingAssetInline(admin.StackedInline):
    model = WritingAsset
    extra = 0
    fields = ("title", "image", "alt_text", "caption", "markdown_snippet", "sort_order")
    readonly_fields = ("markdown_snippet",)

    def markdown_snippet(self, obj: WritingAsset) -> str:
        if not obj.pk or not obj.image:
            return "Save this asset to get a markdown snippet."

        alt_text = obj.alt_text or obj.title
        return format_html(
            '<code>![{}]({})</code>',
            alt_text,
            obj.image.url,
        )

    markdown_snippet.short_description = "Markdown snippet"


@admin.register(SiteProfile)
class SiteProfileAdmin(MarkdownEditorMixin, admin.ModelAdmin):
    list_display = ("full_name", "title", "location", "updated_at")
    markdown_fields = ("summary",)


@admin.register(Project)
class ProjectAdmin(MarkdownEditorMixin, admin.ModelAdmin):
    list_display = ("title", "eyebrow", "is_featured", "sort_order", "updated_at")
    list_filter = ("is_featured", "eyebrow")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "summary", "details", "stack")
    ordering = ("sort_order",)
    inlines = [ProjectScreenshotInline]
    markdown_fields = ("details",)


@admin.register(Experience)
class ExperienceAdmin(MarkdownEditorMixin, admin.ModelAdmin):
    list_display = ("company", "role", "period", "location", "sort_order", "updated_at")
    search_fields = ("company", "role", "location")
    ordering = ("sort_order",)
    markdown_fields = ("summary",)


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ("degree", "institution", "period", "location", "sort_order", "updated_at")
    search_fields = ("degree", "institution", "location")
    ordering = ("sort_order",)


@admin.register(Capability)
class CapabilityAdmin(admin.ModelAdmin):
    list_display = ("label", "sort_order", "updated_at")
    search_fields = ("label", "value")
    ordering = ("sort_order",)


@admin.register(WritingEntry)
class WritingEntryAdmin(MarkdownEditorMixin, admin.ModelAdmin):
    list_display = ("title", "category", "reading_time", "is_featured", "sort_order", "updated_at")
    list_filter = ("is_featured", "category")
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "summary", "body")
    ordering = ("sort_order",)
    fields = ("title", "slug", "eyebrow", "category", "reading_time", "summary", "body", "cover", "is_featured", "sort_order")
    inlines = [WritingAssetInline]
    markdown_fields = ("body",)


@admin.register(BookNote)
class BookNoteAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "is_published", "sort_order", "updated_at")
    list_filter = ("is_published",)
    search_fields = ("title", "author", "summary", "takeaway")
    ordering = ("sort_order",)
    fields = ("title", "author", "summary", "takeaway", "cover", "is_published", "sort_order")


@admin.register(Reference)
class ReferenceAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "organization", "email", "sort_order", "updated_at")
    search_fields = ("name", "role", "organization", "email", "relationship", "quote")
    ordering = ("sort_order",)
