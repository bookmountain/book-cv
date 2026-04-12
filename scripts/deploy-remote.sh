#!/usr/bin/env bash
set -euo pipefail

DEFAULT_ROOT="/work/book-cv"
if [[ ! -d "${DEFAULT_ROOT}" ]]; then
  DEFAULT_ROOT="$HOME/work/book-cv"
fi

ROOT_DIR="${1:-$DEFAULT_ROOT}"

cd "${ROOT_DIR}"

docker compose up -d --build --remove-orphans
docker compose ps
