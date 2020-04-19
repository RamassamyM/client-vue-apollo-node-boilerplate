<template>
  <div id="navigation__set">

    <Navigation-Drawer :drawer="drawer" :items="drawerItems" @logout="logout"/>

    <Navbar @displayDrawer="drawer = !drawer" @showSignup="signupDialog = !signupDialog" @showLogin="loginDialog = !loginDialog"/>

    <v-dialog v-model="signupDialog" max-width="500">
      <Signup @close="signupDialog = false" @closeAndLogin="closeSignUpAndOpenLogin"/>
    </v-dialog>

    <v-dialog v-model="loginDialog" max-width="500">
      <Login @close="loginDialog = false" @closeAndSignUp="closeLoginAndOpenSignUp"/>
    </v-dialog>

  </div>
</template>

<script>
import Navbar from '@/components/navigation/Navbar'
import NavigationDrawer from '@/components/navigation/NavigationDrawer'
import Signup from '@/components/forms/Signup'
import Login from '@/components/forms/Login'
import { logoutLocal } from '@/utils/helpers'

export default {
  components: {
    Navbar,
    NavigationDrawer,
    Signup,
    Login,
  },
  name: "Navigation",
  data: () => ({
    drawerItems: [
      { title: 'Profil', icon: 'mdi-magnify'},
      { title: 'Compte', icon: 'mdi-heart'},
    ],
    drawer: false,
    loginDialog: false,
    signupDialog: false,
  }),
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
    logout () {
      logoutLocal()
      // this.$store.dispatch('auth/logout')
      // .then(() => {
        // this.$router.push({name: 'home'})
      // })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
