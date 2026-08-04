<script setup lang="ts">
const { data: posts } = await useAsyncData('posts-index', () =>
  queryCollection('posts')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all(),
)

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
    <p class="text-neutral-600 mb-8">
      Stuff that is interesting to me, written down so I don't forget it.
    </p>

    <p v-if="!posts?.length" class="text-neutral-500 italic">
      No posts yet.
    </p>

    <div v-else>
      <PostCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
  </section>
</template>
