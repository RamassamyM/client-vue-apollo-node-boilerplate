<template>
  <div id="home">
    <Home-Banner/>
    <Home-Products/>
    <Home-Carousel height="100vh" hideDelimiters/>
    <Home-Features/>
    <Home-Call-To-ActionParallax/>
    <Home-Product-Cards backgroundColor="blue-grey darken-4"/>
    <Home-Testimonial-Carousel/>
    <Home-Newsletter backgroundColor="blue-grey darken-4" dark/>
    <Home-Call-To-Action backgroundColor="white" fontColor="blue-grey" fontColorVariation="darken-2"/>
    <Footer app="false"/>
  </div>
</template>

<script>
import HomeBanner from "@/components/banners/HomeBannerParallax.vue";
import HomeFeatures from "@/components/blocks/HomeFeatures.vue";
import HomeProducts from "@/components/blocks/HomeProducts.vue";
import HomeProductCards from "@/components/blocks/HomeProductCards.vue";
import HomeCarousel from "@/components/blocks/Carousel.vue";
import HomeTestimonialCarousel from "@/components/blocks/TestimonialCarousel.vue";
import HomeCallToAction from "@/components/blocks/CallToAction.vue";
import HomeCallToActionParallax from "@/components/blocks/CallToActionParallax.vue";
import HomeNewsletter from "@/components/blocks/Newsletter.vue";
import Footer from "@/components/footers/Footer.vue"
import Toast from '@/components/notifications/toast'
import Alert from '@/components/modals/alert'

export default {
  components: {
    HomeBanner,
    HomeFeatures,
    HomeProducts,
    HomeProductCards,
    HomeCarousel,
    HomeTestimonialCarousel,
    HomeCallToAction,
    HomeCallToActionParallax,
    HomeNewsletter,
    Footer
  },
  name: "Home",
  data: () => ({
  }),
  mounted() {
    setTimeout(() => {
      Alert.fire({icon: 'success', title: 'Welcome', text: 'Do ou like our app ?'})
      .then((result) => {
        Toast.fire({icon: 'info', title: 'Thank you for your feedback', position:'top-end'})
      })
    }, 3000)
  }
}
</script>
<style lang="scss" scoped>

</style>
