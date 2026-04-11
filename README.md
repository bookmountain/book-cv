# book-cv

Monorepo for Book Sam's CV and personal website.

## Structure

- `latex/`: LaTeX source for the resume and supporting assets
- `app/`: placeholder application workspace for the personal website
- `app/nextjs/`: future Next.js frontend
- `app/django/`: future Django backend

## Current Status

The LaTeX resume is the active project today. The website folders are intentionally lightweight placeholders for the next phase.

## Resume

Build from the `latex/` directory:

```bash
cd latex
latexmk -xelatex resume.tex
```

The generated PDF is written to `latex/build/resume.pdf`.

## Website Placeholders

- `app/nextjs/` is reserved for the public-facing personal site
- `app/django/` is reserved for the backend/API and CMS-style functionality

## Next Steps

1. Scaffold `app/nextjs` with a new Next.js app.
2. Scaffold `app/django` with a Django project and API layer.
3. Connect the site content to the CV source where that actually helps, rather than duplicating data blindly.

