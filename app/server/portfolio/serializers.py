from rest_framework import serializers

from .models import Project, SiteProfile


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
        ]
