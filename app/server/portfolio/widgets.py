from django import forms
from django.forms.utils import flatatt
from django.urls import reverse
from django.utils.html import format_html, format_html_join
from django.utils.safestring import mark_safe


class MarkdownEditorWidget(forms.Textarea):
    class Media:
        css = {
            "all": ("portfolio/admin/markdown-editor.css",),
        }
        js = ("portfolio/admin/markdown-editor.js",)

    tool_definitions = (
        ("bold", "Bold", "B"),
        ("italic", "Italic", "I"),
        ("heading", "Heading", "H"),
        ("link", "Link", "Link"),
        ("ulist", "Bulleted list", "List"),
        ("quote", "Quote", "Quote"),
        ("code", "Code block", "Code"),
    )

    def __init__(self, attrs=None):
        defaults = {
            "class": "vLargeTextField markdown-editor__textarea",
            "rows": 16,
            "spellcheck": "false",
            "data-markdown-editor-textarea": "true",
        }
        if attrs:
            defaults.update(attrs)
        super().__init__(attrs=defaults)

    def render(self, name, value, attrs=None, renderer=None):
        attrs = attrs or {}
        textarea = super().render(name, value, attrs, renderer)
        mode_button_attrs = {
            "type": "button",
            "class": "markdown-editor__mode",
        }
        tool_button_attrs = {
            "type": "button",
            "class": "markdown-editor__tool",
        }

        mode_buttons = format_html(
            "{}{}",
            format_html(
                '<button{} data-markdown-mode="write" aria-pressed="true">Write</button>',
                flatatt({**mode_button_attrs, "class": "markdown-editor__mode is-active"}),
            ),
            format_html(
                '<button{} data-markdown-mode="preview" aria-pressed="false">Preview</button>',
                flatatt(mode_button_attrs),
            ),
        )
        tool_buttons = format_html_join(
            "",
            '<button{} data-markdown-action="{}" title="{}">{}</button>',
            (
                (
                    flatatt(tool_button_attrs),
                    action,
                    title,
                    label,
                )
                for action, title, label in self.tool_definitions
            ),
        )

        return format_html(
            """
            <div class="markdown-editor" data-markdown-editor="true" data-preview-url="{}">
              <div class="markdown-editor__header">
                <div class="markdown-editor__modes">{}</div>
                <div class="markdown-editor__tools">{}</div>
              </div>
              <div class="markdown-editor__body">
                <div class="markdown-editor__write-pane">{}</div>
                <div class="markdown-editor__preview" data-markdown-editor-preview="true" hidden>
                  <p class="markdown-editor__placeholder">Preview will appear here.</p>
                </div>
              </div>
            </div>
            """,
            reverse("admin-markdown-preview"),
            mark_safe(mode_buttons),
            mark_safe(tool_buttons),
            mark_safe(textarea),
        )
