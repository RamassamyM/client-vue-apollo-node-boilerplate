<template>
  <v-footer
    :id="blockId"
    :color="backgroundColor"
    padless
    :app="app == 'true' ? true : false"
    :dark="dark == 'true' ? true : false"
  >
    <v-row
      justify="center"
      no-gutters
    >
      <v-btn
        v-for="(link, id) in links"
        :key="id"
        :color="fontColor"
        text
        rounded
        class="my-2"
        :href="link.url"
      >
        {{ link.name }}
      </v-btn>
      <v-col
        :class="fontColorVariation.split(' ')[0] + '--text ' + 'text--' + fontColorVariation.split(' ')[1] + ' ' + backgroundColorVariation + ' py-4 text-center'"
        cols="12"
      ><span>© {{ year }} {{ domain }} ® {{ appName }}™</span>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
  export default {
    props: {
      blockId: {
        type: String,
        default () {
          return "Footer"
        },
      },
      dark: {
        type: String,
        default() {
          return "true"
        }
      },
      app: {
        type: String,
        default() {
          return "false"
        }
      },
      fontColor: {
        type: String,
        default() {
          return "blue-grey lighten-2"
        }
      },
      fontColorVariation: {
        type: String,
        default() {
          return "blue-grey lighten-2"
        }
      },
      backgroundColor: {
        type: String,
        default() {
          return "blue-grey darken-3"
        }
      },
      backgroundColorVariation: {
        type: String,
        default() {
          return "blue-grey darken-4"
        }
      },
      appName: {
        type: String,
        default() { return 'MyApp' }
      },
      domain: {
        type: String,
        default() {
          return 'myapp.com'
        }
      },
      links: {
        type: Array,
        default() {
          return [
            { name: 'Home', url: "#" },
            { name: 'About', url: "#" },
            { name: 'Features', url: "#" },
            { name: 'Products', url: "#" },
            { name: 'News', url: "#" },
            { name: 'Contact Us', url: "#" },
            { name: 'Terms of services', url: "#" },
            { name: 'Privacy', url: "#" }
          ]
        }
      }
    },
    data: () => ({
      year: new Date().getFullYear(),
    }),
  }
</script>
