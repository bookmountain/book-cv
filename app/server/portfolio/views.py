from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import BookNote, Capability, Education, Experience, Project, Reference, SiteProfile, WritingEntry
from .serializers import (
    BookNoteSerializer,
    CapabilitySerializer,
    EducationSerializer,
    ExperienceSerializer,
    ProjectSerializer,
    ReferenceSerializer,
    SiteProfileSerializer,
    WritingEntrySerializer,
)


@api_view(["GET"])
def health_check(_request):
    return Response({"status": "ok"}, status=status.HTTP_200_OK)


class SiteProfileView(generics.GenericAPIView):
    serializer_class = SiteProfileSerializer

    def get(self, request):
        profile = SiteProfile.objects.first()
        if profile is None:
            return Response({"detail": "Profile not configured."}, status=status.HTTP_404_NOT_FOUND)
        return Response(self.get_serializer(profile, context={"request": request}).data, status=status.HTTP_200_OK)


class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()


class ProjectDetailView(generics.RetrieveAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    lookup_field = "slug"


class ExperienceListView(generics.ListAPIView):
    serializer_class = ExperienceSerializer
    queryset = Experience.objects.all()


class EducationListView(generics.ListAPIView):
    serializer_class = EducationSerializer
    queryset = Education.objects.all()


class WritingEntryListView(generics.ListAPIView):
    serializer_class = WritingEntrySerializer
    queryset = WritingEntry.objects.filter(is_featured=True)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class WritingEntryDetailView(generics.RetrieveAPIView):
    serializer_class = WritingEntrySerializer
    queryset = WritingEntry.objects.filter(is_featured=True)
    lookup_field = "slug"

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class BookNoteListView(generics.ListAPIView):
    serializer_class = BookNoteSerializer
    queryset = BookNote.objects.filter(is_published=True)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class ReferenceListView(generics.ListAPIView):
    serializer_class = ReferenceSerializer
    queryset = Reference.objects.all()


class PortfolioContentView(APIView):
    def get(self, request):
        profile = SiteProfile.objects.first()
        payload = {
            "profile": SiteProfileSerializer(profile, context={"request": request}).data if profile else None,
            "projects": ProjectSerializer(
                Project.objects.all(),
                many=True,
                context={"request": request},
            ).data,
            "experiences": ExperienceSerializer(Experience.objects.all(), many=True).data,
            "education": EducationSerializer(Education.objects.all(), many=True).data,
            "capabilities": CapabilitySerializer(Capability.objects.all(), many=True).data,
            "writings": WritingEntrySerializer(
                WritingEntry.objects.filter(is_featured=True),
                many=True,
                context={"request": request},
            ).data,
            "books": BookNoteSerializer(
                BookNote.objects.filter(is_published=True),
                many=True,
                context={"request": request},
            ).data,
            "references": ReferenceSerializer(Reference.objects.all(), many=True).data,
        }
        return Response(payload, status=status.HTTP_200_OK)
