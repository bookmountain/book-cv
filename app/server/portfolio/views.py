from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Project, SiteProfile
from .serializers import ProjectSerializer, SiteProfileSerializer


@api_view(["GET"])
def health_check(_request):
    return Response({"status": "ok"}, status=status.HTTP_200_OK)


class SiteProfileView(generics.GenericAPIView):
    serializer_class = SiteProfileSerializer

    def get(self, _request):
        profile = SiteProfile.objects.first()
        if profile is None:
            return Response({"detail": "Profile not configured."}, status=status.HTTP_404_NOT_FOUND)
        return Response(self.get_serializer(profile).data, status=status.HTTP_200_OK)


class ProjectListView(generics.ListAPIView):
    serializer_class = ProjectSerializer
    queryset = Project.objects.filter(is_featured=True)
