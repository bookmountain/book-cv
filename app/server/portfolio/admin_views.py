import json

from django.http import JsonResponse
from django.views.decorators.http import require_POST

from .markdown_utils import render_markdown


@require_POST
def markdown_preview(request):
    try:
        payload = json.loads(request.body or "{}")
    except json.JSONDecodeError:
        payload = {}

    return JsonResponse({"html": render_markdown(payload.get("markdown", ""))})
