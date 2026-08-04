# wslbn.space

Personal blog of **weselben** — posts are plain Markdown files. Drop a file,
commit, push. No admin UI, no database, no login.

Built with Nuxt 4 + `@nuxt/content` (MDC + Shiki) → static site → nginx →
Cloudflare Tunnel.

## Writing a post

Create a Markdown file under `content/posts/` with front matter:

```markdown
---
title: "My Post"
description: "One sentence shown in the index and used for SEO."
date: "2025-08-05"
tags: ["tag1"]
draft: false
---

Body. **Markdown**, raw HTML, and Vue components (from `components/content/`)
all work. Syntax highlighting via Shiki.
```

- `draft: true` hides it from the production site.
- Filename is the slug → URL: `/posts/<slug>/`.
- Images go in `public/img/`, reference as `![alt](/img/foo.jpg)`.

Full authoring rules (including AI-content guidelines) live in `AGENTS.md`.

## Local preview

```bash
npm install
npm run dev
# → http://localhost:3000
```

Or via Docker (no native Node needed):

```bash
docker compose up --build blog
# → http://localhost:8080
```

## Deploy (Portainer + Cloudflare Tunnel)

- `docker-compose.yml` — the blog (nginx serving the static build)
- `docker-compose.cloudflared.yml` — the Cloudflare Tunnel overlay

1. Cloudflare Zero Trust → Networks → Tunnels → new tunnel (remote-managed).
   Copy the token.
2. Set `TUNNEL_TOKEN=<token>` in the Portainer stack env (see `.env.example`).
3. Tunnel public-hostname entry: hostname `wslbn.space`, service
   `http://blog:80`.
4. Portainer stack: git-sync this repo, build from `docker-compose.yml` +
   `docker-compose.cloudflared.yml`.

TLS terminates at the Cloudflare edge — no ports need opening on the host.

## Repo layout

```
content/posts/        # Markdown posts — what you edit
public/img/           # Images referenced as /img/<file>
pages/                # Nuxt routes (index, about, posts/[...slug])
components/           # Shared Vue components (AppHeader, PostCard, ...)
components/content/   # Components callable from Markdown via MDC
nuxt.config.ts        # Nuxt + content module config
content.config.ts     # Post schema (zod-enforced front matter)
assets/css/main.css   # Tailwind v4 + typography plugin
Dockerfile            # npm ci → nuxt generate → nginx
docker-compose.yml
docker-compose.cloudflared.yml
docker/nginx.conf
.github/workflows/build.yml   # CI: docker build + smoke test
```

Canonical domain: [wslbn.space](https://wslbn.space). Repo:
[weselben/wslbn.space](https://github.com/weselben/wslbn.space).
