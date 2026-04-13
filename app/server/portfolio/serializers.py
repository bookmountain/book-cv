from rest_framework import serializers

from .models import BookNote, Experience, Project, Reference, SiteProfile, WritingEntry


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
    class Meta:
        model = Project
        fields = [
            "title",
            "slug",
            "eyebrow",
            "stack",
            "summary",
            "repo_url",
            "live_url",
            "is_featured",
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
        ]
