<template>
  <div :id="blockId" :class="backgroundColor">
    <v-container class="products__container">
      <v-row class="mb-8 d-flex justify-center white--text">
        <h1>Choose your product</h1>
      </v-row>
      <v-row class="row">
        <v-col v-for="(item,index) in fourItems" :key="index" :class="colClass">
          <v-card flat class=" mx-2 my-6 pa-5 d-flex flex-column justify-space-around align-center">
            <h2 class="products__card_title">{{ item.title }}</h2>
            <p class="products__card_description">{{ item.description }}</p>
            <v-img class="products__card_picture mb-4" v-bind:src="require('../../assets/images/' + item.pictureUrlName)" :alt="item.alt"/>
            <v-hover v-slot:default="{ hover}">
              <v-btn :elevation="hover ? 10 : 0" depressed :href="item.href" class="error">{{ item.btnName }}</v-btn>
            </v-hover>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  props: {
    blockId: {
      type: String,
      default () {
        return "ProductCards"
      },
    },
    backgroundColor: {
      type: String,
      default() {
        return 'blue'
      }
    },
    fourItems: {
      type: Array,
      default() {
        return [
                { title: 'Super product', description: 'Discover our amazing product' , pictureUrlName: 'product.jpg', alt: 'product image', btnName: 'Choose', btnHref: '#'},
                { title: 'Super product', description: 'Discover our amazing product' , pictureUrlName: 'product.jpg', alt: 'product image', btnName: 'Choose', btnHref: '#'},
                { title: 'Super product', description: 'Discover our amazing product' , pictureUrlName: 'product.jpg', alt: 'product image', btnName: 'Choose', btnHref: '#'},
                { title: 'Super product', description: 'Discover our amazing product' , pictureUrlName: 'product.jpg', alt: 'product image', btnName: 'Choose', btnHref: '#'}
              ]
      },
    },
  },
  name: "ItemsBlock",
  computed: {
    colClass() {
      if (this.fourItems.length == 3) {
        return 'col-12 col-md-4'
      }
      if (this.fourItems.length == 2) {
        return 'col-12 col-sm-6'
      }
      return 'col-12 col-sm-6 col-lg-3'
    }
  },
  data: () => ({
  })
}
</script>

<style lang="scss" scoped>

.products__container {
  padding-top: 100px;
  padding-bottom: 100px;
  h1, h2 {
    font-family: $headers-font;
    font-weight: 400;
  }
}

.products__card_picture {
  height: 150px;
}

.products__card_title {
    color: $gray;
}

</style>
