#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "${ROOT_DIR}"

if [ ! -f .env ]; then
  cp .env.example .env
fi

set -a
. ./.env
set +a

if [ ! -d app/server/.venv ]; then
  python3 -m venv app/server/.venv
fi

app/server/.venv/bin/python -m pip install --upgrade pip
app/server/.venv/bin/pip install -r app/server/requirements.txt

if command -v pg_isready >/dev/null 2>&1; then
  POSTGRES_HOST="${POSTGRES_HOST:-127.0.0.1}"
  POSTGRES_PORT="${POSTGRES_PORT:-5432}"
  POSTGRES_USER="${POSTGRES_USER:-postgres}"

  if pg_isready -h "${POSTGRES_HOST}" -p "${POSTGRES_PORT}" -U "${POSTGRES_USER}" >/dev/null 2>&1; then
    (
      cd app/server
      .venv/bin/python manage.py migrate --noinput
      .venv/bin/python manage.py seed_portfolio
    )
  fi
fi

(
  cd app/client
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
)
