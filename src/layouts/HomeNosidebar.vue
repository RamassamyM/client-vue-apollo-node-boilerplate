<template>
  <v-app v-cloak>
    <!-- No Side Bar For Home Page -->
    <home-nav-bar navColor="blue-grey darken-4" logoName="logo.png" signupModalEventName="toggleSignup" loginModalEventName="toggleLogin"/>
    <v-dialog v-model="signupDialog" max-width="500">
      <Signup @close="signupDialog = false" @closeAndLogin="closeSignUpAndOpenLogin"/>
    </v-dialog>

    <v-dialog v-model="loginDialog" max-width="500">
      <Login @close="loginDialog = false" @closeAndSignUp="closeLoginAndOpenSignUp" @closeLoginAndOpenForgottenPassword="closeLoginAndOpenForgottenPassword"/>
    </v-dialog>

    <v-dialog v-model="forgottenPasswordDialog" max-width="500">
      <Forgotten-Password @close="forgottenPasswordDialog = false" @closeForgottenPasswordAndOpenLogin="closeForgottenPasswordAndOpenLogin"/>
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
    <notif-bar :color="notifColor" :text="notifText" :displayNotif="displayNotif" :notifx="notifx" :notify="notify" :mode="notifMode" @close="displayNotif = false"/>
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
import ForgottenPassword from '@/components/forms/ForgottenPassword'
import notifBar from '@/components/notifications/notifBar'

export default {
  components: {
    Signup,
    HomeNavBar,
    Login,
    ForgottenPassword,
    notifBar,
    // HomeFooter,
  },
  data: () => ({
    signupDialog: false,
    loginDialog: false,
    forgottenPasswordDialog: false,
    notifColor: 'success',
    notifText: '',
    displayNotif: false,
    notifx: '',
    notify: '',
    notifMode: '',
  }),
  mounted() {
    const self = this
    EventBus.$on("toggleSignup", () => { self.signupDialog = !self.signupDialog } )
    EventBus.$on("toggleLogin", () => { self.loginDialog = !self.loginDialog } )
    EventBus.$on("toggleForgottenPassword", () => { self.forgottenPasswordDialog = !self.forgottenPasswordDialog } )
    EventBus.$on("displayNotifBar", ({ color, text, x, y, mode }) => {
      self.notifColor = color || 'success'
      self.notifText = text || 'This is a notification!'
      self.displayNotif = true
      self.notifx = x || ''
      self.notify = y || ''
      self.notifMode = mode || ''
    })
    // To use it :
    // EventBus.$emit('displayNotifBar', { text: message, color: 'blue', x:'right', y:'top', mode: '' })
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
    closeForgottenPasswordAndOpenLogin() {
      this.forgottenPasswordDialog = false
      this.loginDialog = true
      return
    },
    closeLoginAndOpenForgottenPassword() {
      this.loginDialog = false
      this.forgottenPasswordDialog = true
      return
    },
  },
}
</script>
