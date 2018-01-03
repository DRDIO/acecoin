module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'acecoin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Acecoin' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/vuetify/dist/vuetify.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  modules: ['@nuxtjs/apollo', '@nuxtjs/dotenv'],

  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },

  plugins: ['~plugins/vuetify.js'],

  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'd3', 'vuetify'],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: { fix: true }
        })
      }
    }
  }
}
