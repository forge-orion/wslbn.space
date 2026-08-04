import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'wslbn.space',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Personal blog of weselben — posts on whatever is interesting right now.' },
        { property: 'og:site_name', content: 'wslbn.space' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'canonical', href: 'https://wslbn.space/' },
      ],
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: 'github-dark',
          langs: ['bash', 'json', 'yaml', 'ts', 'js', 'vue', 'python', 'go', 'dockerfile', 'markdown'],
        },
        toc: { depth: 3, searchDepth: 3 },
      },
    },
  },

  compatibilityDate: '2025-08-04',
})
