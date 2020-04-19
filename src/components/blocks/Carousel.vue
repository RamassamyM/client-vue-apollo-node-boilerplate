<template>
  <v-carousel
    :id="blockId"
    class="primary--text"
    :hide-delimiter-background="hideDelimiters"
    :hide-delimiters="hideDelimiters"
    :height="height"
  >
    <v-carousel-item
      v-for="(item,i) in images"
      :src="item.src"
      :key="i">
      <div class="carousel__content headline pb-10 d-flex flex-column justify-center align-center text-center">
        <h1 class="white--text mb-4">
          <span>{{ item.headline }}</span>
        </h1>
        <p class=" headline white--text title mb-4">
          <span>{{ item.subheader }}</span>
        </p>
        <v-hover v-slot:default="{ hover}">
          <v-btn depressed hover
            :elevation="hover ? 10 : 0"
            :to="item.buttonlink"
            x-large
            class="error white--text mb-4">
            {{ item.buttontext }}
            <v-icon
              right
              dark>{{ item.icon }}</v-icon>
          </v-btn>
        </v-hover>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    blockId: {
      type: String,
      default () {
        return "Carousel"
      },
    },
    height: {
      type: String,
      default () {
        return "500px"
      },
    },
    hideDelimiters: {
      type: Boolean,
      default () {
        return false
      },
    },
  },
  data: () => ({
    images: [
      {
        src: "https://images.pexels.com/photos/2751115/pexels-photo-2751115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        headline: "Power Audio",
        subheader: "You can choose freedom and the best amazing sound on the market",
        buttontext: "Buy now",
        buttonlink: "/buy",
        icon: "mdi-cart",
        textcolor: "accent--text"
      },
      {
        src: "https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        headline: "Power Audio",
        subheader: "You can choose freedom and the best amazing sound on the market",
        buttontext: "Buy now",
        buttonlink: "/buy",
        icon: "mdi-cart",
        textcolor: "accent--text"
      },
      {
        src: "https://images.pexels.com/photos/838696/pexels-photo-838696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        headline: "Power Audio",
        subheader: "You can choose freedom and the best amazing sound on the market",
        buttontext: "Buy now",
        buttonlink: "/buy",
        icon: "mdi-cart",
        textcolor: "accent--text"
      }
    ]
  }),
};
</script>

<style lang="scss" scoped>

.carousel__content {
  padding-top: 180px;
  padding-bottom: 100px;
  height: 100%;
  background-image: linear-gradient(180deg, rgba(0,0,0,0), rgba(38, 50, 56, 1));
  // &:hover {
  //   background-image: linear-gradient(180deg, rgba(0,0,0,0), rgba(33,150,243, 0.8));
  // }
}

</style>
