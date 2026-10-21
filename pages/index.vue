<script setup lang="ts">
const query = ref('')

const { data: posts } = await useAsyncData('posts-index', () =>
  queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all(),
)

// Full-text sections per post, prerendered into the payload so the
// client-side filter also matches words from the post bodies.
const { data: sections } = await useAsyncData('posts-search', () =>
  queryCollectionSearchSections('posts'),
)

const results = computed(() => {
  const all = posts.value ?? []
  const q = query.value.trim().toLowerCase()
  if (!q) return all
  return all.filter((post) => {
    const meta = [post.title, post.description, ...(post.tags ?? [])]
      .join(' ')
      .toLowerCase()
    if (meta.includes(q)) return true
    return (sections.value ?? []).some(
      (s) => s.path === post.path && s.content?.toLowerCase().includes(q),
    )
  })
})

useSeoMeta({
  title: 'wslbn.space',
  description: 'Personal blog of weselben — posts on whatever is interesting right now.',
  ogTitle: 'wslbn.space',
  ogDescription: 'Personal blog of weselben — posts on whatever is interesting right now.',
  ogUrl: 'https://wslbn.space/',
})
</script>

<template>
  <section>
    <p class="text-neutral-600 mb-6 dark:text-stone-400">
      Stuff that is interesting to me, written down so I don't forget it.
    </p>

    <label class="block mb-8">
      <span class="sr-only">Search posts</span>
      <input
        v-model="query"
        type="search"
        placeholder="Search posts…"
        class="w-full px-3 py-2 rounded-md border border-neutral-200 bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-2 focus:outline-offset-0 focus:outline-neutral-400 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-200 dark:placeholder:text-stone-500 dark:focus:outline-stone-500"
      >
    </label>

    <p v-if="!results.length" class="text-neutral-500 italic dark:text-stone-500">
      No posts match "{{ query }}".
    </p>

    <div v-else>
      <PostCard v-for="post in results" :key="post.path" :post="post" />
    </div>
  </section>
</template>
