module.exports = {
  mode: 'spa',
  server: {
    port: 3001
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'Future Leaders Parliament',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Future Leaders Parliament'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/api.js',
    '~/plugins/vue-croppa.js',
    { src: '~plugins/chart.js', ssr: false }
  ],

  router: {
    middleware: ['auth']
  },
  /*
   ** Nuxt.js modules
   */
  modules: ['nuxt-buefy', '@nuxt/http'],
  http: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:5001/',
      pathRewrite: { '^/api': '' }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // config.module.rules.push({
      //   enforce: 'pre',
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   exclude: /(node_modules)/,
      //   options: {
      //     fix: true
      //   }
      // });
      config.node = {
        fs: 'empty'
      }
    }
  }
}
