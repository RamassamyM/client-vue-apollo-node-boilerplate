<template>
  <v-app v-cloak>
    <!-- No Side Bar For Home Page -->
    <home-nav-bar navColor="blue-grey darken-4" logoName="logo.png" signupModalEventName="toggleSignup" loginModalEventName="toggleLogin"/>
    <v-dialog v-model="signupDialog" max-width="500">
      <Signup @close="signupDialog = false" @closeAndLogin="closeSignUpAndOpenLogin"/>
    </v-dialog>

    <v-dialog v-model="loginDialog" max-width="500">
      <Login @close="loginDialog = false" @closeAndSignUp="closeLoginAndOpenSignUp"/>
    </v-dialog>
    <v-content app>
      <!-- <v-container
        transition="slide-x-transition"
        fluid
        pa-0
        ma-0> -->
        <slot/>
      <!-- </v-container> -->
    </v-content>
    <!-- <home-footer/> -->

  </v-app>
</template>

<script>
import EventBus from '@/event-bus'
// import AppFooter from "../partials/AppFooter.vue";
import HomeNavBar from "@/partials/HomeNavBarDrawerOnlyForMobile";
// import HomeFooter from "@/components/footers/HomeFooter";
import Signup from '@/components/forms/Signup'
import Login from '@/components/forms/Login'

export default {
  components: {
    Signup,
    HomeNavBar,
    Login,
    // HomeFooter,
  },
  data: () => ({
    signupDialog: false,
    loginDialog: false,
  }),
  mounted() {
    const self = this
    EventBus.$on("toggleSignup", () => { self.signupDialog = !self.signupDialog } )
    EventBus.$on("toggleLogin", () => { self.loginDialog = !self.loginDialog } )
  },
  methods: {
    closeSignUpAndOpenLogin () {
      this.signupDialog = false
      this.loginDialog = true
      return
    },
    closeLoginAndOpenSignUp () {
      this.loginDialog = false
      this.signupDialog = true
      return
    },
  },
}
</script>
