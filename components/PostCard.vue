<script setup lang="ts">
defineProps<{
  post: {
    path: string
    title: string
    description: string
    date: string
    tags: string[]
  }
}>()

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <article class="group">
    <NuxtLink :to="post.path" class="block py-4 border-b border-neutral-200 last:border-b-0">
      <div class="flex items-baseline justify-between gap-4">
        <h2 class="text-lg font-semibold group-hover:text-neutral-600 transition-colors">
          {{ post.title }}
        </h2>
        <time :datetime="post.date" class="shrink-0 text-sm text-neutral-500">
          {{ formatDate(post.date) }}
        </time>
      </div>
      <p class="mt-1 text-sm text-neutral-600 line-clamp-2">{{ post.description }}</p>
      <div v-if="post.tags?.length" class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600"
        >{{ tag }}</span>
      </div>
    </NuxtLink>
  </article>
</template>
