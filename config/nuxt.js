const {resolve} = require('path')
const pkg = require('../package')


module.exports = {
    mode: 'universal',

    dev: process.env.NODE_ENV === 'development',
    srcDir: resolve(__dirname, '..', 'resources'),

    /*
    ** Headers of the page
    */
    head: {
        title: "Blog",
        titleTemplate: 'Joshua Welford - %s',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: pkg.description}
        ],
        link: [
            {rel: 'icon', type: 'image/png', href: 'https://api.welford.me/images/icons/icon-192x192.png'}
        ]
    },

    manifest: {
        name: "Joshua Welford",
        short_name: "Josh Welford",
        description: "My home page!",
        background_color: "#1c3d5a",
        theme_color: "#1c3d5a",
        lang: "en"
    },

    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},

    /*
    ** Global CSS
    */
    css: [
        '~/assets/css/tailwind.css',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '~plugins/io', ssr: false},
        {src: '~/plugins/font-awesome'},
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/auth',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/amp'
    ],
    /*
    ** Axios module configuration
    */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
    },

    auth: {
        redirect: {
            login: '/login',
            logout: '/',
            home: '/dashboard'
        },

        strategies: {
            local: {
                endpoints: {
                    login: { url: 'https://api.welford.dev/wp-json/jwt-auth/v1/token', method: 'post', propertyName: 'token' },
                    logout: false,
                    user: { url: 'https://api.welford.dev/wp-json/wp/v2/users/me', method: 'get', propertyName: 'id' }
                },
            }
        },

        plugins: [
            {src: '~plugins/client', srr: false}
        ]
    },

    workbox: {
        runtimeCaching: [
            {
                urlPattern: 'https://api.welford.me/.*',
            },
            {
                urlPattern: 'https://cdn.welford.me/.*',
            }
        ]
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
    }
}
