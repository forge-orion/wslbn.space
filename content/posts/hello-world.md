---
title: "Hello, wslbn.space"
description: "Why this blog exists, how posts are written, and what the Markdown pipeline can do."
date: "2025-08-04"
tags: ["meta", "first-post"]
draft: false
---

This is the first post on `wslbn.space`. Posts live as plain Markdown under
`content/posts/` — drop a file, commit, push, and the next deploy pulls it in.
No admin UI, no login, no database.

## Markdown with superpowers (MDC)

The content pipeline is `@nuxt/content` with MDC. On top of normal Markdown
you get:

- **Inline HTML** — raw tags pass straight through: <mark>highlight</mark>,
  <kbd>Ctrl</kbd>+<kbd>C</kbd>, <sup>1</sup>.
- **Vue components inside Markdown** — any component in `components/content/`
  is usable via `::component-name` blocks.
- **Syntax highlighting** — see below.

```ts
// fenced code blocks get highlighted by Shiki
export function fibonacci(n: number): number {
  let [a, b] = [0, 1]
  for (let i = 0; i < n; i++) [a, b] = [b, a + b]
  return a
}
```

## Images

Images go in `public/img/` and reference by root path:

![Sample image placeholder](/img/sample.svg)

## The writing loop

1. Create `content/posts/<slug>.md` with front matter (see `AGENTS.md`).
2. `npm run dev` and check it at `http://localhost:3000/posts/<slug>`.
3. Commit, push, redeploy the stack in Portainer.

Delete this post once real content exists.
