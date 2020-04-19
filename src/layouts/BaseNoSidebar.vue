<template>
  <v-app id="inspire">
    <Home-Navbar :hasDrawer="false"/>
    <v-content app>
      <!-- <v-container
        transition="slide-x-transition"
        fluid
        pa-0
        ma-0> -->
        <slot/>
      <!-- </v-container> -->
    </v-content>
  </v-app>
</template>

<script>
import HomeNavbar from '../partials/HomeNavBarDrawerOnlyForMobile.vue'

export default {
  components: {
    HomeNavbar
  },
}
</script>
