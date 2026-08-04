<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`post-${route.path}`, () =>
  queryCollection('posts').path(route.path).first(),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useSeoMeta({
  title: `${post.value.title} — wslbn.space`,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogType: 'article',
  ogUrl: `https://wslbn.space${post.value.path}`,
  articlePublishedTime: post.value.date,
  articleTag: post.value.tags,
})
</script>

<template>
  <article v-if="post">
    <header class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight">{{ post.title }}</h1>
      <div class="mt-2 flex items-center gap-3 text-sm text-neutral-500">
        <time :datetime="post.date">
          {{ new Date(post.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </time>
        <span v-for="tag in post.tags" :key="tag" class="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-xs">
          {{ tag }}
        </span>
      </div>
    </header>

    <ContentRenderer
      :value="post"
      class="prose prose-neutral max-w-none"
    />
  </article>
</template>
