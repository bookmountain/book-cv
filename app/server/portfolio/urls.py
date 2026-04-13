from django.urls import path

from .views import (
    BookNoteListView,
    ExperienceListView,
    PortfolioContentView,
    ProjectListView,
    ReferenceListView,
    SiteProfileView,
    WritingEntryListView,
    health_check,
)

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("content/", PortfolioContentView.as_view(), name="portfolio-content"),
    path("profile/", SiteProfileView.as_view(), name="site-profile"),
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("experiences/", ExperienceListView.as_view(), name="experience-list"),
    path("writings/", WritingEntryListView.as_view(), name="writing-list"),
    path("books/", BookNoteListView.as_view(), name="book-list"),
    path("references/", ReferenceListView.as_view(), name="reference-list"),
]
