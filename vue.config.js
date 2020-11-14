const path = require("path");
module.exports = {
    publicPath: "/bq/",
    css: {
      loaderOptions: {
        scss: {}
      }
    },

    configureWebpack: {
        resolve: {
            alias: {
                src: path.resolve(__dirname, "src")
            }
        }
    },
    transpileDependencies: [
        "vuetify"
    ],
    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: true
      }
    }
}