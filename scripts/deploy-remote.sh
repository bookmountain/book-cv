#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-$HOME/work/book-cv}"

cd "${ROOT_DIR}"

docker compose up -d --build --remove-orphans
docker compose ps
