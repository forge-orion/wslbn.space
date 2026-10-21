---
title: "Writing posts in plain Markdown"
description: "Posts are Markdown files with a small front matter block; this seed post shows the schema, the draft flag, and the MDC extras."
date: "2026-10-19"
tags: ["demo", "meta"]
draft: false
---

Publishing here means creating one file: `content/posts/<slug>.md`. The
filename becomes the URL, so `writing-posts-in-plain-markdown.md` lives at
`/posts/writing-posts-in-plain-markdown/`. No database, no admin UI, no
login — a commit is a publish.

## The front matter

Every post starts with five fields, enforced by the Zod schema in
`content.config.ts` — anything extra or malformed fails the build:

```yaml
---
title: "A specific title without clickbait"
description: "One full sentence, between 120 and 160 characters."
date: "2026-10-19"
tags: ["demo", "meta"]
draft: false
---
```

`tags` are lowercase and kebab-case, and reusing an existing tag matters:
mismatched casing would split one topic into two buckets on the index.

## Drafts

Set `draft: true` while writing. Draft posts render in the dev server but
are excluded from the production build — the index queries
`draft = false`, and `npm run generate` skips them entirely. Flip the flag
to `false` when the post is ready.

## Markdown with extras

On top of standard Markdown, the MDC pipeline in `@nuxt/content` passes
inline HTML straight through: <mark>highlighted text</mark>,
<kbd>Ctrl</kbd>+<kbd>C</kbd>, footnotes via <sup>1</sup>. Fenced code
blocks get Shiki highlighting, and any Vue component dropped into
`components/content/` becomes callable from a post as an
`::component-name` block. The site layout itself — header, post cards,
footer — is a handful of small Vue components styled with Tailwind v4.
