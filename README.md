# book-cv

Monorepo for Book Sam's CV and personal website.

## Structure

- `latex/`: LaTeX source for the resume and supporting assets
- `app/`: application workspace for the personal website
- `app/client/`: Next.js frontend
- `app/server/`: Django backend and admin
- `docker-compose.yml`: Docker Compose stack for client, server, and PostgreSQL
- `scripts/`: local bootstrap and remote deploy helpers
- `.github/workflows/deploy.yml`: CI/CD workflow for `master`

## Resume

Build the LaTeX output directly from the `latex/` directory:

```bash
cd latex
latexmk -xelatex resume.tex
```

The generated PDF is written to `latex/build/resume.pdf`.

To regenerate the public download used by the site:

```bash
bash scripts/build-resume-pdf.sh
```

This copies the latest LaTeX build to `app/client/public/book-sam-resume.pdf`.

## Website

### Local setup

```bash
cp .env.example .env
./scripts/bootstrap-local.sh
```

The repo root `.env` is the canonical local env file. Django loads it automatically, and Next.js reads it through `app/client/next.config.ts`.

For direct local runs, keep PostgreSQL available on `127.0.0.1:5432` or adjust `.env` to match your machine. The bootstrap script installs packages, then runs migrations and seeds portfolio content when PostgreSQL is reachable.

If Docker is available locally, bring the full stack up from the repo root:

```bash
docker compose up --build
```

If you want to run each service directly:

```bash
cd app/server
source .venv/bin/activate
python manage.py runserver 0.0.0.0:8000
```

```bash
cd app/client
npm ci
npm run dev
```

Default local endpoints:

- frontend: `http://localhost:3000`
- backend admin: `http://localhost:8000/admin`
- backend API health: `http://localhost:8000/api/health/`

### Production on `192.168.4.106`

The production server uses the same `docker-compose.yml` file and a separate `.env` file derived from `.env.production.example`.

Manual deploy on the server:

```bash
cd /work/book-cv
bash scripts/deploy-remote.sh
```

Production env handling:

- canonical env file on `.106`: `/etc/book-cv.env`
- repo path: `/work/book-cv/.env` should point to `/etc/book-cv.env`

Public hostnames:

- frontend: `https://me.bookmountain.work`
- Django admin and API: `https://me-admin.bookmountain.work`

### GitHub Actions deploy

The workflow at `.github/workflows/deploy.yml` validates the frontend and backend, then deploys on pushes to `master`.

Required GitHub Actions secret:

- `DEPLOY_SSH_KEY`: private SSH key that can connect to `book@192.168.4.106`

The workflow syncs the repo to `/work/book-cv`, preserves the server-side `.env`, and runs `bash scripts/deploy-remote.sh`.

### Cloudflare tunnel

The tunnel config on `.106` should expose:

- `me.bookmountain.work -> http://192.168.4.106:3000`
- `me-admin.bookmountain.work -> http://192.168.4.106:8000`

After editing `/etc/cloudflared/config.yml`, validate and reload:

```bash
sudo cloudflared tunnel ingress validate
sudo systemctl restart cloudflared
sudo systemctl status cloudflared --no-pager
```
