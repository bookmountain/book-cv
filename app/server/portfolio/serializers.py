from rest_framework import serializers

from .models import BookNote, Capability, Experience, Project, ProjectScreenshot, Reference, SiteProfile, WritingEntry


class ProjectScreenshotSerializer(serializers.ModelSerializer):
    image_src = serializers.SerializerMethodField()

    class Meta:
        model = ProjectScreenshot
        fields = [
            "title",
            "introduction",
            "image_src",
            "alt_text",
        ]

    def get_image_src(self, obj: ProjectScreenshot) -> str:
        if obj.image:
            request = self.context.get("request")
            image_url = obj.image.url
            return request.build_absolute_uri(image_url) if request else image_url
        return obj.image_url


class SiteProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProfile
        fields = [
            "full_name",
            "title",
            "summary",
            "location",
            "email",
            "github_url",
            "linkedin_url",
        ]


class ProjectSerializer(serializers.ModelSerializer):
    screenshots = ProjectScreenshotSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "title",
            "slug",
            "eyebrow",
            "stack",
            "summary",
            "details",
            "highlights",
            "repo_url",
            "live_url",
            "is_featured",
            "screenshots",
        ]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            "company",
            "role",
            "location",
            "period",
            "summary",
            "highlights",
        ]


class CapabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Capability
        fields = [
            "label",
            "value",
        ]


class WritingEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = WritingEntry
        fields = [
            "title",
            "slug",
            "eyebrow",
            "category",
            "reading_time",
            "summary",
            "body",
        ]


class BookNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookNote
        fields = [
            "title",
            "author",
            "summary",
            "takeaway",
        ]


class ReferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reference
        fields = [
            "name",
            "role",
            "organization",
            "email",
            "relationship",
            "quote",
        ]
