---
title: "How this blog is built"
description: "A tour of the stack: Nuxt 4 and Nuxt Content turn Markdown files into a fully static site that nginx serves from a single Docker image."
date: "2026-10-20"
tags: ["demo", "meta"]
draft: false
---

This is a seed post showing what the blog can do. The whole stack fits in
one sentence: Markdown files in, static HTML out, nginx serving the result.
Here is what each step looks like in this repo.

## From Markdown to static HTML

The content pipeline is `@nuxt/content` v3. Every file under
`content/posts/` becomes a page; front matter is validated against a Zod
schema in `content.config.ts`, so a typo in a post breaks the build instead
of shipping silently. Generating the site is one command:

```bash
npm run generate
# → .output/public/
```

Syntax highlighting is Shiki with the `github-dark` theme, configured in
`nuxt.config.ts` for bash, json, yaml, ts, js, vue, python, go, dockerfile
and markdown. The index page is a single `queryCollection('posts')` call
that filters `draft: false` and sorts by date, descending.

## One image, two stages

The `Dockerfile` is a two-stage build. The builder stage runs on
`node:22-alpine` and needs `python3 make g++` because `better-sqlite3`
(the SQLite driver `@nuxt/content` v3 uses for its cache) compiles native
code on Alpine:

```dockerfile
FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run generate

FROM nginx:alpine
COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
```

The final image is just nginx serving static files, with a `wget --spider`
healthcheck against `http://localhost/`. No Node process runs in
production — the site is fully pre-rendered.

## Getting it online

`docker-compose.yml` builds and runs that image, and a second compose file
adds a `cloudflared` container that exposes it through a Cloudflare Tunnel
— no open ports on the host. That part is covered in
[Serving the blog through a Cloudflare Tunnel](/posts/serving-the-blog-through-a-cloudflare-tunnel/).
