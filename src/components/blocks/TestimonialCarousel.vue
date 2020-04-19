<template>
  <v-carousel
    :id="blockId"
    class="primary--text"
    height="100%"
    hide-delimiter-background hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :src="item.src"
      :key="i" class="mb-0">
      <v-container fluid class="testimonial__container  pa-0 ma-0">
        <v-row class="pa-0 ma-0">
          <v-col class="col-12 col-sm-6 pa-0 ma-0">
            <v-card tile class="left-block d-flex flex-column justify-center align-center text-center" :color="item.color">
              <h2 :class="item.fontColor + '--text' + ' text--' + item.fontColorVariation + ' mb-4'">" {{ item.quote }} "</h2>
              <v-divider></v-divider>
              <h3 :class="item.fontColor + '--text' + ' text--' + item.fontColorVariation + ' mb-2'">{{ item.author }}</h3>
              <p :class="item.fontColor + '--text' + ' text--' + item.fontColorVariation + ' mb-6'">{{ item.company }} - {{ item.role }}</p>
              <v-hover v-slot:default="{ hover}">
                <v-btn :elevation="hover ? 5 : 0" v-if="item.link" :href="item.link" icon :color="item.fontColor + ' ' + item.fontColorVariation" outlined>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-hover>
            </v-card>
          </v-col>
          <v-col class="col-0 col-sm-6 pa-0 ma-0">
            <div class="right-block" :style="'background-image: linear-gradient(180deg, rgba(0,0,0,0), rgba(33,150,243, 0.8)), url(' + item.imageUrl + ');'">
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  props: {
    blockId: {
      type: String,
      default () {
        return "Testimonialcarousel"
      },
    },
    items: {
      type: Array,
      default() {
        return [
          {
            imageUrl: "https://images.pexels.com/photos/2751115/pexels-photo-2751115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=640",
            quote: "This app helped us increase our CA by 150%",
            author: "John Woo",
            company: "Microloft",
            role: "CTO",
            color: "blue",
            fontColor: "white",
            link: "#Testimonialcarousel"
          },
          {
            imageUrl: "https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=640",
            quote: "This app helped us increase our CA by 150%",
            author: "John Woo",
            company: "Microloft",
            role: "CTO",
            color: "blue-grey darken-3",
            fontColor: "white",
            link: "#Testimonialcarousel"
          },
          {
            imageUrl: "https://images.pexels.com/photos/838696/pexels-photo-838696.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=400&w=640",
            quote: "This app helped us increase our CA by 150%",
            author: "John Woo",
            company: "Microloft",
            role: "CTO",
            color: "white",
            fontColor: "blue-grey",
            fontColorVariation: "darken-3",
            link: "#Testimonialcarousel"
          }
        ]
      }
    }
  },
}
</script>

<style lang="scss" scoped>

.left-block {
  padding: 100px 50px;
  height: 400px;
  h2 {
    font-family: $headers-font;
    font-weight: 400;
    font-style: italic;
  }
  h3 {
    font-family: $headers-font;
    font-weight: 600;
  }
  p {
    font-family: $body-font;
  }
  // &:hover {
  //   background-image: linear-gradient(180deg, rgba(0,0,0,0), rgba(33,150,243, 0.8));
  // }
}

.right-block {
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  // background-image: linear-gradient(180deg, rgba(0,0,0,0), rgba(38, 50, 56, 1));

}

</style>
