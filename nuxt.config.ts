import { rmSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxtjs/color-mode'],

  // Dark by default; the header toggle switches the stored preference.
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },

  css: ['~/assets/css/main.css'],

  // Pin the static preset. CF Workers Builds injects WORKERS_CI, which
  // otherwise makes Nitro auto-switch to `cloudflare-module`, generate its
  // own wrangler config, and `wrangler deploy` then fails on a missing
  // entry-point instead of publishing the static assets.
  nitro: {
    preset: 'static',
  },

  // CF's build-output cache can restore a `.wrangler/deploy/config.json`
  // redirect left over from an older cloudflare-module build; it would
  // hijack `wrangler deploy` away from the assets-only wrangler.jsonc.
  hooks: {
    'build:before'() {
      rmSync('.wrangler/deploy', { recursive: true, force: true })
    },
  },

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
