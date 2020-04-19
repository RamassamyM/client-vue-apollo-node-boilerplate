import { API_URI } from './config'

module.exports = {
    client: {
      service: {
        name: 'client',
        // URL to the GraphQL API
        url: API_URI,
      },
      // Files processed by the extension
      includes: [
        'src/**/*.vue',
        'src/**/*.js',
      ],
    },
  }
