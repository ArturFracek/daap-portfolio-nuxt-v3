// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3001
  },
  vite: {
    server: {
      hmr: {
        host: 'localhost',
        protocol: 'ws',
        port: 3002,
        clientPort: 3002
      }
    }
  },
  css: ['~/assets/styles/main.scss'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  modules: ['@nuxtjs/i18n', '@nuxtjs/color-mode'],
  i18n: {
    locales: [
      { code: 'pl', iso: 'pl-PL', name: 'Polski', file: 'pl.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'pl',
    lazy: true,
    langDir: 'locales',
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts',
    bundle: {
      optimizeTranslationDirective: false
    }
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light'
  },
  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Unbounded:wght@400;500;600;700&display=swap'
        }
      ]
    }
  }
})
