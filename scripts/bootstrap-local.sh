#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "${ROOT_DIR}"

if [ ! -f .env ]; then
  cp .env.example .env
fi

if [ ! -d app/server/.venv ]; then
  python3 -m venv app/server/.venv
fi

app/server/.venv/bin/python -m pip install --upgrade pip
app/server/.venv/bin/pip install -r app/server/requirements.txt

(
  cd app/client
  if [ -f package-lock.json ]; then
    npm ci
  else
    npm install
  fi
)
