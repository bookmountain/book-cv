#!/usr/bin/env bash
set -euo pipefail

DEFAULT_ROOT="/work/book-cv"
if [[ ! -d "${DEFAULT_ROOT}" ]]; then
  DEFAULT_ROOT="$HOME/work/book-cv"
fi

ROOT_DIR="${1:-$DEFAULT_ROOT}"
ENV_FILE="${ROOT_DIR}/.env"
SYSTEM_ENV_FILE="/etc/book-cv.env"

cd "${ROOT_DIR}"

if [[ ! -e "${ENV_FILE}" && -f "${SYSTEM_ENV_FILE}" ]]; then
  ln -s "${SYSTEM_ENV_FILE}" "${ENV_FILE}"
fi

if [[ ! -e "${ENV_FILE}" ]]; then
  echo "Missing ${ENV_FILE}. Create it or provide ${SYSTEM_ENV_FILE} before deploying." >&2
  exit 1
fi

docker compose up -d --build --remove-orphans
docker compose ps
