from markdown import markdown


MARKDOWN_EXTENSIONS = [
    "extra",
    "sane_lists",
]


def render_markdown(value: str) -> str:
    return markdown(value or "", extensions=MARKDOWN_EXTENSIONS)
