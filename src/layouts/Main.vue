<template>
  <v-app
    v-cloak
    id="inspire">
    <left-side-bar/>
    <!-- <app-nav-bar/> -->
    <v-content app>
      <!-- <v-container
        transition="slide-x-transition"
        fluid
        pa-0
        ma-0> -->
        <slot/>
      <!-- </v-container> -->
    </v-content>
    <!-- <app-footer/> -->
  </v-app>
</template>

<script>
// import AppFooter from "../partials/AppFooter.vue";
// import AppNavBar from "../partials/AppNavBar.vue";
import LeftSideBar from "../partials/LeftSideBar.vue";

export default {
  components: {
    // AppFooter,
    // AppNavBar,
    LeftSideBar
  }
};
</script>
