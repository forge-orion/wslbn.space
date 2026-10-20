<script setup lang="ts">
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <header class="border-b border-neutral-200 bg-white dark:border-stone-800 dark:bg-stone-950">
    <div class="w-full max-w-3xl mx-auto px-4 py-5 flex items-center justify-between">
      <NuxtLink to="/" class="text-xl font-bold tracking-tight hover:text-neutral-600 transition-colors dark:hover:text-stone-300">
        wslbn<span class="text-neutral-400 dark:text-stone-600">.space</span>
      </NuxtLink>
      <nav class="flex items-center gap-5 text-sm">
        <NuxtLink to="/" class="hover:text-neutral-500 transition-colors dark:hover:text-stone-400">Posts</NuxtLink>
        <NuxtLink to="/about" class="hover:text-neutral-500 transition-colors dark:hover:text-stone-400">About</NuxtLink>
        <a
          href="https://github.com/weselben"
          target="_blank"
          rel="noopener"
          class="hover:text-neutral-500 transition-colors dark:hover:text-stone-400"
        >GitHub</a>
        <button
          type="button"
          aria-label="Toggle dark mode"
          class="p-1.5 -m-1.5 rounded-md text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-400"
          @click="toggleTheme"
        >
          <svg class="size-4 dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg class="hidden size-4 dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
      </nav>
    </div>
  </header>
</template>
