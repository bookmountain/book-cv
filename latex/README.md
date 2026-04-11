# LaTeX Resume

This directory contains the active LaTeX source for Book Sam's resume.

## Structure

- `resume.tex`: main resume entrypoint
- `sections/resume/`: active resume content
- `styles/`: supporting class/style files
- `assets/fonts/`: bundled fonts
- `build/`: generated LaTeX output

## Build

Run from this directory:

```bash
latexmk -xelatex resume.tex
```

The generated PDF is written to `build/resume.pdf`.

## VS Code

The repo root includes `.vscode/settings.json` for LaTeX Workshop. Open `latex/resume.tex`, then build with the default `latexmk (xelatex)` recipe.
