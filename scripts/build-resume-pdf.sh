#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LATEX_DIR="$ROOT_DIR/latex"
PUBLIC_DIR="$ROOT_DIR/app/client/public"
OUTPUT_FILE="$PUBLIC_DIR/book-sam-resume.pdf"

if ! command -v latexmk >/dev/null 2>&1; then
  echo "latexmk is required to build the resume PDF." >&2
  exit 1
fi

mkdir -p "$PUBLIC_DIR"

(
  cd "$LATEX_DIR"
  latexmk -xelatex resume.tex
)

cp "$LATEX_DIR/build/resume.pdf" "$OUTPUT_FILE"
echo "Wrote $OUTPUT_FILE"
