#!/usr/bin/env node
// CI validator for content/posts/*.md — enforces the AGENTS.md rules:
// front-matter schema (title/description/date/tags/draft), slug format,
// no leftover TODOs, description length. Pure node, no deps.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'content/posts';
const errors = [];

// Validate the files passed as argv (CI passes the PR's changed .md files);
// with no args, validate everything (local full sweep).
const targets = process.argv.slice(2);

for (const arg of (targets.length ? targets : readdirSync(dir))) {
  const file = arg.replace(/^content\/posts\//, '');
  if (!file.endsWith('.md')) continue;
  const path = join(dir, file);
  let text;
  try {
    text = readFileSync(path, 'utf8');
  } catch {
    errors.push(`${path}: file not found`);
    continue;
  }

  // slug: kebab-case only
  if (!/^[a-z0-9-]+\.md$/.test(file)) {
    errors.push(`${path}: filename must be kebab-case [a-z0-9-]`);
  }

  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) {
    errors.push(`${path}: missing front matter block`);
    continue;
  }
  const fm = m[1];

  const field = (name) => {
    const fm2 = fm.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
    return fm2 ? fm2[1].trim() : undefined;
  };

  // title: quoted, <= 60 chars, no emoji/ALLCAPS-ending period handled loosely
  const title = field('title')?.replace(/^"|"$/g, '');
  if (!title) errors.push(`${path}: missing title`);
  else if (title.length > 60) errors.push(`${path}: title ${title.length} chars (max 60)`);
  else if (title.endsWith('.')) errors.push(`${path}: title must not end with a period`);

  // description: quoted, 120-160 chars
  const desc = field('description')?.replace(/^"|"$/g, '');
  if (!desc) errors.push(`${path}: missing description`);
  else if (desc.length < 120 || desc.length > 160)
    errors.push(`${path}: description ${desc.length} chars (must be 120-160)`);
  else if (!/\.$/.test(desc)) errors.push(`${path}: description must be a full sentence ending in '.'`);

  // date: ISO YYYY-MM-DD
  const date = field('date')?.replace(/^"|"$/g, '');
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date))
    errors.push(`${path}: date must be "YYYY-MM-DD" (got ${date})`);

  // tags: array of 1-5 kebab-case strings
  const tagsRaw = fm.match(/^tags:\s*\[(.*)\]\s*$/m)?.[1];
  if (!tagsRaw) {
    errors.push(`${path}: tags must be a ["tag", ...] array`);
  } else {
    const tags = tagsRaw.split(',').map((t) => t.trim().replace(/^"|"$/g, '')).filter(Boolean);
    if (tags.length < 1 || tags.length > 5) errors.push(`${path}: ${tags.length} tags (must be 1-5)`);
    for (const t of tags)
      if (!/^[a-z0-9-]+$/.test(t)) errors.push(`${path}: tag "${t}" not kebab-case`);
  }

  // draft: boolean
  const draft = field('draft');
  if (draft !== 'true' && draft !== 'false')
    errors.push(`${path}: draft must be true or false (got ${draft})`);

  // no leftover TODOs in body
  const body = text.slice(m[0].length);
  if (/TODO|FIXME|XXX/.test(body)) errors.push(`${path}: leftover TODO/FIXME in body`);
}

if (errors.length) {
  for (const e of errors) console.error(`::error::${e}`);
  process.exit(1);
}
console.log(`All posts valid.`);
