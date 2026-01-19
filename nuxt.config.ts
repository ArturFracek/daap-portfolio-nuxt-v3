// https://nuxt.com/docs/api/configuration/nuxt-config
import os from 'node:os'
import qrcode from 'qrcode-terminal'

const isDev = process.env.NODE_ENV !== 'production'

const getLocalIpv4s = () =>
  Object.values(os.networkInterfaces())
    .flat()
    .filter((iface) => iface && iface.family === 'IPv4' && !iface.internal)
    .map((iface) => iface?.address)
    .filter((address): address is string => Boolean(address))

const devQrPlugin = () => ({
  name: 'nuxt-dev-qr',
  configureServer(server: { httpServer?: { once: (event: string, cb: () => void) => void; address: () => any }; config: any }) {
    if (!server?.httpServer) return

    server.httpServer.once('listening', () => {
      const address = server.httpServer?.address()
      const port =
        typeof address === 'object' && address?.port
          ? address.port
          : server.config.server?.port || 3000
      const ips = getLocalIpv4s()
      const urls = ips.map((ip) => `http://${ip}:${port}/`)

      // eslint-disable-next-line no-console
      console.log('\nMobile access (same Wi-Fi):')
      // eslint-disable-next-line no-console
      console.log(urls.length ? urls.join('\n') : `http://localhost:${port}/`)

      if (urls[0]) {
        // eslint-disable-next-line no-console
        console.log('\nScan QR to open on phone:')
        qrcode.generate(urls[0], { small: true })
      }
    })
  }
})

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3001
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "~/assets/styles/variables" as *;\n' +
            '@use "~/assets/styles/mixins" as *;\n' +
            '@use "~/assets/styles/typography" as *;\n'
        }
      }
    },
    server: {
      host: true,
      hmr: {
        protocol: 'ws',
        port: 3002,
        clientPort: 3002
      }
    },
    plugins: isDev ? [devQrPlugin()] : []
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
