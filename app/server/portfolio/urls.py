from django.urls import path

from .views import ProjectListView, SiteProfileView, health_check

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("profile/", SiteProfileView.as_view(), name="site-profile"),
    path("projects/", ProjectListView.as_view(), name="project-list"),
]
