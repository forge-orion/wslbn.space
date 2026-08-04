FROM node:22-alpine AS builder
WORKDIR /app

# better-sqlite3 (pulled in by @nuxt/content v3) needs build tools on alpine.
RUN apk add --no-cache python3 make g++

COPY package.json ./
# `npm ci` fights registry drift on transient deps (`^` ranges). For a
# one-author blog, install is fine; lockfile is still committed and tracks
# package.json.
RUN npm install --no-audit --no-fund

COPY . .
ENV CI=1 NUXT_NO_TTY=1
RUN npm run generate

FROM nginx:alpine
COPY --from=builder /app/.output/public /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1
