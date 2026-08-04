<template>
  <header class="border-b border-neutral-200 bg-white">
    <div class="w-full max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold tracking-tight hover:text-neutral-600 transition-colors">
        wslbn<span class="text-neutral-400">.space</span>
      </NuxtLink>
      <nav class="flex items-center gap-5 text-sm">
        <NuxtLink to="/" class="hover:text-neutral-500 transition-colors">Posts</NuxtLink>
        <NuxtLink to="/about" class="hover:text-neutral-500 transition-colors">About</NuxtLink>
        <a
          href="https://github.com/weselben"
          target="_blank"
          rel="noopener"
          class="hover:text-neutral-500 transition-colors"
        >GitHub</a>
      </nav>
    </div>
  </header>
</template>
