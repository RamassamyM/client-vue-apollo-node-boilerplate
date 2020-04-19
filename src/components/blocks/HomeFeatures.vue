<template>
  <div :id="blockId" :class="backgroundColor">
    <v-container class="products__container">
      <v-row class="mb-8 d-flex justify-center blue-grey--text text--darken-1">
        <h1>Features</h1>
      </v-row>
      <v-row class="row">
        <v-col v-for="(item,index) in fourItems" :key="index" :class="colClass">
          <v-card hover flat class=" mx-2 my-6 pa-5 d-flex flex-column justify-space-around align-center">
            <v-img contain class="products__card_picture mb-4" :src="item.pictureUrl" :alt="item.alt"/>
            <h2 class="products__card_title">{{ item.title }}</h2>
            <p class="products__card_description text-center">{{ item.description }}</p>
            <!-- <v-btn depressed :href="item.href" class="error">{{ item.btnName }}</v-btn> -->
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
        return "Features"
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
                { title: 'Best satisfaction', description: 'This product is a best-seller in Business Insider' , pictureUrl: "https://image.flaticon.com/icons/svg/610/610333.svg", alt: 'Number one product image'},
                { title: 'Free shipping', description: 'We ship this product for free in 90 countries' , pictureUrl: 'https://image.flaticon.com/icons/svg/609/609361.svg', alt: 'Shipping image'},
                { title: 'Customer support', description: 'We provide 24h customer support with our call center' , pictureUrl: 'https://image.flaticon.com/icons/svg/2025/2025165.svg', alt: 'Customer support image'},
                { title: 'Eco-friendly', description: 'This product is 100% recyclable' , pictureUrl: 'https://image.flaticon.com/icons/svg/2634/2634413.svg', alt: 'Eco friendly image'}
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
