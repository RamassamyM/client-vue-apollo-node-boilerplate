<template>
  <v-container :id="blockId" :class="backgroundColor" fluid :dark="dark">
    <v-row class="px-5 cta__row  d-flex flex-column justify-center align-center">
        <v-card-text class="headline text-center mb-3">
          <h4 :class="fontColor + '--text' + ' text--' + fontColorVariation" >
            I would like to save Hours Of Prototyping and Scaffolding My Next Big Idea
          </h4>
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
    fontColor: {
      type: String,
      default () {
        return "white--text"
      },
    },
    fontColorVariation: {
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

<style lang="scss" scoped>

.cta__row {
  min-height: 400px;
  h4 {
    font-family: $headers-font;
    font-weight: 500;
  }
}

</style>
