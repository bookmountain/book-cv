from django.conf import settings
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic import RedirectView
from django.views.static import serve

from portfolio.admin_views import markdown_preview

urlpatterns = [
    path("", RedirectView.as_view(pattern_name="admin:index", permanent=False)),
    path("admin/markdown-preview/", admin.site.admin_view(markdown_preview), name="admin-markdown-preview"),
    path("admin/", admin.site.urls),
    path("api/", include("portfolio.urls")),
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
]
