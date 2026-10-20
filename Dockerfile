FROM node:22-alpine AS builder
WORKDIR /app

# better-sqlite3 (pulled in by @nuxt/content v3) needs build tools on alpine.
RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json ./
# `npm ci` (not `install`): installs exactly from the committed lockfile.
# npm 10 on node:22-alpine crashes with `Cannot read properties of null
# (reading 'edgesOut')` when resolving this tree via `npm install`.
RUN npm ci --no-audit --no-fund

COPY . .
ENV CI=1 NUXT_NO_TTY=1
RUN npm run generate

# Caddy image has no curl/wget; curl is only needed for the healthcheck.
FROM caddy:2-alpine
RUN apk add --no-cache curl
COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/.output/public /srv
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -sf http://localhost/ || exit 1
