//   I want scss variables to be accessible from all the components without manually importing, so I import variables.scss here.
const globalSassFiles = [
    '@/assets/css/variables.scss'
    // '~@/styles/App.scss'
]

module.exports = {
    devServer: {
      port: 8080,
      proxy: process.env.API_GRAPHQL_URI
    },
    configureWebpack: {
      module: {
        rules: [
          {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
          },
        ]
      }
    },
    css: {
        loaderOptions: {
            sass: {
                data: globalSassFiles.map((src)=>'@import "' + src + '";').join('\n')
            }
        }
    },
    chainWebpack: config => {
        ["vue-modules", "normal-modules", "normal"].forEach((match) => {
            config.module.rule('sass').oneOf(match).use('sass-loader')
                .tap(opt => {
                    delete opt.data;
                    return opt;
                })
        })
        config.module
          .rule('vue')
          .use('vue-loader')
          .loader('vue-loader')
          .tap(options => {
            options.transpileOptions = {
              transforms: {
                dangerousTaggedTemplateString: true,
              },
            }
            return options
          })
    }
  }

// Because there is a problem with vuetify using sass and our app using scss and the semicolon syntax, we had to add
// a config with different loader.
