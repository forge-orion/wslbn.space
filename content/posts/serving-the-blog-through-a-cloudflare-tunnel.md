---
title: "Serving the blog through a Cloudflare Tunnel"
description: "No open ports on the server: a cloudflared sidecar dials out to Cloudflare and routes wslbn.space to the nginx container next door."
date: "2026-10-18"
tags: ["demo", "meta"]
draft: false
---

The blog never exposes a port to the internet. Instead, a `cloudflared`
container connects outbound to Cloudflare, and requests to `wslbn.space`
travel back through that tunnel to the nginx container. This post walks
through how the two compose files in this repo wire that up.

## Two services, one network

`docker-compose.yml` defines the blog itself: the image built by the
`Dockerfile`, with a healthcheck that probes nginx every 30 seconds.
`docker-compose.cloudflared.yml` adds the tunnel sidecar on the same
Docker network:

```yaml
services:
  cloudflared:
    image: cloudflare/cloudflared:latest
    restart: unless-stopped
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=${TUNNEL_TOKEN:?TUNNEL_TOKEN missing}
    depends_on:
      blog:
        condition: service_healthy
```

Two details do the heavy lifting. The `:?` in the environment line makes
compose fail fast if `TUNNEL_TOKEN` is unset instead of starting a tunnel
that cannot authenticate. And `condition: service_healthy` means
cloudflared only starts once nginx actually answers its healthcheck, so
the tunnel never comes up pointing at a dead origin.

## Routing

The tunnel is remote-managed from the Cloudflare Zero Trust dashboard. Its
public hostname entry maps `wslbn.space` to `http://blog:80` — the Docker
network's DNS name for the blog container. Using `http://localhost:80`
there would be wrong: inside the cloudflared container, localhost is the
connector itself, not nginx.

## Starting it

```bash
docker compose -f docker-compose.yml -f docker-compose.cloudflared.yml up -d
```

The token comes from Cloudflare's tunnel setup screen and lives in the
Portainer stack environment or a gitignored `.env` — never in the repo. If
it ever leaks, Cloudflare's dashboard can reset it, which invalidates the
old token immediately.
