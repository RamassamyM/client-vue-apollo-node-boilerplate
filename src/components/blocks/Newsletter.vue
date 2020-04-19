<template>
  <v-container :id="blockId" :class="backgroundColor + ' newsletter__container'" fluid>
    <v-row>
      <v-col class="col-10 offset-1 offset-md-2 col-md-8 text-center">
        <h2 :class="dark === true ? 'white--text' : 'blue-grey--text text--darken-4'" class="headline">To receive all our news and promo, subscribe to our newsletter</h2>
        <p :class="dark === true ? 'blue-grey--text text--lighten-5' : 'blue-grey--text text--darken-2'" class="subtitle-1">We will not communicate your email to third parties.</p>
      </v-col>
      <v-col class="col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <div class="newsletter__form_block">
          <Newsletter-Form/>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NewsletterForm from '@/components/forms/NewsletterForm.vue'

export default {
  name: "Newsletter",
  components: {
    NewsletterForm,
  },
  props: {
    blockId: {
      type: String,
      default() {
        return 'newsletter'
      }
    },
    backgroundColor: {
      type: String,
      default() {
        return 'blue'
      }
    },
    dark: {
      type: Boolean,
      default() {
        return true
      }
    },
  },
  data: () => ({

  })
}
</script>
<style lang="scss" scoped>

.newsletter__container {
  padding: 80px 10px;
  h2 {
    font-family: $headers-font;
    font-weight: 400;
  }
  p {
    font-family: $body-font;
    font-weight: 300;
  }
}

.newsletter__form_block {
  border-radius: 4px;
  padding: 10px 14px 6px 22px;
  background-color: white;
  margin: 20px;
}

</style>
