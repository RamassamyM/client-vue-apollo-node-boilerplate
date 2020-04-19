<template>
  <div :id="blockId" :class="backgroundColor">
    <v-container class="products__container">
      <v-row class="mb-8 d-flex justify-center blue-grey--text text--darken-1">
        <h1>Choose your product</h1>
      </v-row>
      <v-row class="row">
        <v-col v-for="(item,index) in fourItems" :key="index" :class="colClass">
          <v-card :href="item.href" :img="require('../../assets/images/' + item.pictureUrlName)" hover flat class="products__card mx-2 my-6">
            <div class="products__card_overlay pa-4 d-flex flex-column justify-end align-start">
              <h2 class="products__card_title">{{ item.title }}</h2>
              <p class="products__card_description">{{ item.description }}</p>
            </div>
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
        return "Products"
      },
    },
    backgroundColor: {
      type: String,
      default() {
        return 'white'
      }
    },
    fourItems: {
      type: Array,
      default() {
        return [
                { title: 'Super product', description: 'Discover our amazing product' , pictureUrlName: 'product.jpg', alt: 'product image', btnHref: '#'},
                { title: 'Super product', description: 'Discover our amazing product' , pictureUrlName: 'product.jpg', alt: 'product image', btnHref: '#'},
                { title: 'Super product', description: 'Discover our amazing product' , pictureUrlName: 'product.jpg', alt: 'product image', btnHref: '#'},
                { title: 'Super product', description: 'Discover our amazing product' , pictureUrlName: 'product.jpg', alt: 'product image', btnHref: '#'}
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


.products__card_overlay {
  height: 300px;
  background-image: linear-gradient(180deg, rgba(0,0,0,0), rgba(0,0,0, 0.8));
  &:hover {
    background-image: linear-gradient(180deg, rgba(0,0,0,0), rgba(33,150,243, 0.8));
  }
}


.products__card_title {
    color: $light-gray;
}

.products__card_description {
    color: $medium-light-gray;
}

</style>
