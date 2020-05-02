<template>
  <v-parallax
    :id="blockId"
    dark
    :src="imageUrl"
    class="home__banner_parallax"
  >
    <v-container fluid dark class="home__banner_parallax-container d-flex align-center">
      <v-row>
        <v-col class="home__banner_col col-12 offset-sm-1 col-sm-10 col-md-6 offset-lg-2 col-lg-5 pa-10 d-flex flex-column align-center justify-center">
          <img class="mb-10 home__banner_logo" src="../../assets/images/logo.png"/>
          <h1 class="text-center mb-10">La meilleure application pour résoudre votre problème</h1>
          <div class="d-flex justify-space-around">
            <v-hover v-slot="{ hover }">
              <v-btn
                :elevation="hover ? 10 : 1"
                dark
                x-large
                class="error"
                @click.stop="toggleSignup"
              >
                Commencer gratuitement
              </v-btn>
            </v-hover>
          </div>
        </v-col>
        <v-col class="col-12 col-md-4 col-lg-3 d-flex pa-10 justify-center align-center">
          <v-hover v-slot="{ hover }">
            <v-img contain @click.stop="videoDialog = true" class="home__banner_image-phone" src="../../assets/images/phonemock2.png"></v-img>
          </v-hover>
        </v-col>
        <v-dialog
          v-model="videoDialog"
          max-width="800"
        >
          <YoutubeBlock youtubeid="bTqVqk7FSmY" @close="videoDialog = false"/>
        </v-dialog>
      </v-row>
    </v-container>
  </v-parallax>
</template>

<script>
import YoutubeBlock from '@/components/medias/YoutubeBlock'
import EventBus from '@/event-bus'

export default {
  props: {
    blockId: {
      type: String,
      default() {
        return 'homeBanner'
      }
    },
    imageUrl: {
      type: String,
      default() {
        // return "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=960&w=1080"
        return "https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
      }
    },
    signupModalEventName: {
      type: String,
      default() {
        return 'toggleSignup'
      }
    },
  },
  name: "",
  components: {
    YoutubeBlock,
  },
  data: () => ({
    videoDialog: false,
  }),
  methods: {
    toggleSignup() {
      EventBus.$emit(this.signupModalEventName)
    },
  }
}
</script>

<style lang="scss" scoped>

.home__banner_parallax {
  height: 100%;
  min-height: 100vh;
  position: relative;
  margin-top: -64px;
}

.home__banner_parallax-container {
  min-height: 100vh;
  width: 100%;
  background-image: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0,0.9));
  h1 {
    font-family: $headers-font;
    font-size: 32px;
    font-weight: 400;
    color: white;
  }
}

.home__banner_image-phone {
  transition: opacity 0.2s ease-in-out;
  height: 400px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.home__banner_logo {
  height: 100px;
}

@media (max-width: 960px) {
  .home__banner_col {
    margin-top: 200px;
  }
  .home__banner_image-phone {
    height: 300px;
  }
  .home__banner_logo {
    height: 80px;
  }
}

</style>
