<template>
  <v-app>
    <PageCircularProgress v-if="preloading"/>
    <component :is="layout">
      <router-view></router-view>
    </component>
  </v-app>
</template>

<script>
import PageCircularProgress from '@/components/progress/PageCircularProgress'
import { resetSessionParams } from './utils/helpers'

const default_layout = 'home'

export default {
  name: 'App',
  components: {
    PageCircularProgress,
  },
  mounted: function () {
    window.addEventListener('storage', this.syncLogout)
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || default_layout) + '-layout'
    },
    preloading() {
      return (this.$route.meta.preloading || true)
    }
  },
  methods: {
    syncLogout (event) {
      if (event.key === 'logout') {
        // console.log('Logged out from storage!')
        resetSessionParams()
        .then(() => {
          this.$router.go('/')
        })
        // .catch((err) => {
        //     console.log(err)
        // })
      }
      if (event.key === 'login') {
        // console.log('Logged in from storage!')
        this.$router.push('/dashboard')
      }
      return
    },
  },
};
</script>

<style lang="scss">

body {
  color: #eff2f4;
  margin: 0;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  font-family: $body-font;
}

.white {
  color: $black;
  background: #fff;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0;
  padding: 8px 0;
}

ul, li {
  list-style-type: none;
  margin: 0;
}

textarea {
  outline: none;
  border: none;
  resize: none;
  font-size: inherit;
}


</style>
