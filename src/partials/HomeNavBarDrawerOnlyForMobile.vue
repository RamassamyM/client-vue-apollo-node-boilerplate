<template>
  <div>
    <v-app-bar :color="navColor" :dark="dark" elevate-on-scroll app>
      <v-app-bar-nav-icon v-if="toggleDrawerEventName" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-items>
        <v-btn text tile color="transparent" to="/">
          <img class="mr-3" :src="require('../assets/images/' + logoName)" :height="logoHeight"/>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-title class="headline">{{ appName }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-md-flex">
        <v-btn v-for="(link, id) in links" :key="id" :href="link.href" :to="link.to" small text>{{ link.name }}</v-btn>
        <v-menu bottom left offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" text>
              <!-- <v-icon>mdi-dots-vertical</v-icon> -->
              <v-icon>mdi-arrow-down-drop-circle</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="(profileItem, i) in profileItems" :key="i" link>
              <v-list-item-icon>
                <v-icon v-text="profileItem.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title small>
                {{ profileItem.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text x-small @click.stop="toggleSignup">Signup</v-btn>
        <v-btn text x-small @click.stop="toggleLogin" >Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items  class="d-md-none" >
        <v-btn icon @click.stop="drawer = !drawer" text>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer app class="d-md-none" right temporary v-model="drawer">
      <v-list >
        <v-list-item
        v-for="(link, id) in links"
        :key="id"
        link
        :to="link.to" :href='link.href'
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
            >
              {{ link.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-account-plus</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="toggleSignup">Signup</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon><v-icon>mdi-login</v-icon></v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title @click="toggleLogin">Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import EventBus from '@/event-bus'

export default {
  props: {
    logoName: {
      type: String,
      default() {
        return 'logo.png'
      }
    },
    dark: {
      type: Boolean,
      default() {
        return true
      }
    },
    hasDrawer: {
      type: Boolean,
      default() {
        return false
      }
    },
    navColor: {
      type: String,
      default() {
        return 'blue'
      }
    },
    appName: {
      type: String,
      default() {
        return 'MyApp'
      }
    },
    logoHeight: {
      type: Number,
      default() {
        return 30
      }
    },
    links: {
      type: Array,
      default() {
        return [
          { name: 'Home', icon: 'mdi-home', href: '#homeBanner', to:'' },
          { name: 'About', icon: 'mdi-account-group', href: '', to:'dashboard' },
          { name: 'Features', icon: 'mdi-head-cog', href: '#Features', to:'' },
          { name: 'Pricing', icon: 'mdi-shopping', href: '#', to:'' },
          { name: 'News', icon: 'mdi-newspaper-variant-multiple', href: '#', to:'' },
          { name: 'Contact', icon: 'mdi-card-account-phone', href: '#Footer', to:'' }
        ]
      }
    },
    profileItems: {
      type: Array,
      default() {
        return [{title: 'Mon profil', icon: 'mdi-face-profile'}, {title: 'Mon compte', icon: 'mdi-account'}, {title: 'Langue', icon: 'mdi-flag'}]
      }
    },
    toggleDrawerEventName: {
      type: String,
      default() {
        return undefined
      }
    },
    signupModalEventName: {
      type: String,
      default() {
        return 'toggleSignup'
      }
    },
    loginModalEventName: {
      type: String,
      default() {
        return 'toggleLogin'
      }
    },
  },
  data: () => ({
    drawer: false,
  }),
  // created() {
  //   /* Emit On a Child Component If You Want This To Be Visible */
  //   this.$on("header-extension-visible", visibility => {
  //     this.extension = visibility
  //   })
  // },
  methods: {
    toggleDrawer() {
      EventBus.$emit(this.toggleDrawerEventName)
    },
    toggleSignup() {
      EventBus.$emit(this.signupModalEventName)
    },
    toggleLogin() {
      EventBus.$emit(this.loginModalEventName)
    },
  }
}
</script>


<style lang="scss" scoped>

.log-btn {
  height: 30px!important;
}
</style>
