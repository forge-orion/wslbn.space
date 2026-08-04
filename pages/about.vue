<script setup lang="ts">
useSeoMeta({
  title: 'About — wslbn.space',
  description: 'About wslbn.space and its author.',
  ogTitle: 'About — wslbn.space',
  ogUrl: 'https://wslbn.space/about',
})
</script>

<template>
  <article class="prose prose-neutral max-w-none">
    <h1>About</h1>
    <p>
      Personal blog of <strong>weselben</strong>. Posts are Markdown files in
      a Git repo — no CMS, no database, no admin panel.
    </p>
    <p>
      Topics: whatever is interesting at the time. Expect code, infrastructure,
      and the occasional rabbit hole.
    </p>
    <p>
      Canonical domain: <a href="https://wslbn.space">wslbn.space</a>.
      Source: <a href="https://github.com/weselben">github.com/weselben</a>.
    </p>
  </article>
</template>
