<template>
  <v-parallax
    :id="blockId"
    dark
    :src="imageUrl"
    :height="height"
  >
    <v-container fluid dark class="cta_container d-flex justify-center">
      <v-row class="px-5 d-flex flex-column justify-center align-center">
          <v-card-text class="headline text-center white--text mb-3">
            <h4>I would like to save Hours Of Prototyping and Scaffolding My Next Big Idea</h4>
          </v-card-text>
          <v-hover v-slot="{ hover }">
            <v-btn
              :elevation="hover ? 10 : 1"
              dark
              depressed
              x-large
              color="error"
              :href="link"
            >
              <span class="white--text">Start free</span>
              <!-- <v-icon
              right
              dark>mdi-plus</v-icon> -->
            </v-btn>
          </v-hover>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>

export default {
  props: {
    blockId: {
      type: String,
      default () {
        return "cta"
      },
    },
    height: {
      type: String,
      default () {
        return "400"
      },
    },
    imageUrl: {
      type: String,
      default () {
        return "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      },
    },
    fontColor: {
      type: String,
      default () {
        return "white--text"
      },
    },
    fontColorVaiation: {
      type: String,
      default () {
        return ""
      },
    },
    dark: {
      type: Boolean,
      default () {
        return false
      },
    },
    backgroundColor: {
      type: String,
      default() {
        return 'blue-grey darken-4'
      }
    },
  },
  data: () => ({
    link: ""
  }),
}
</script>

<style lang="scss">

.cta_container {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.7));
  h4 {
    font-family: $headers-font;
    font-weight: 500;
  }
}

.v-parallax__content {
  padding: 0px;
}

</style>
