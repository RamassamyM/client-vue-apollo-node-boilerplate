<template>
  <v-navigation-drawer
      v-model="displayDrawer"
      :color="color"
      :expand-on-hover="expandOnHover"
      :mini-variant="miniVariant"
      :right="right"
      :src="bg"
      :dark="dark"
      absolute
      temporary
    >
      <v-list
        dense
        nav
        class="py-0"
      >
        <v-list-item two-line :class="miniVariant && 'px-0'">
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/men/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Application</v-list-item-title>
            <v-list-item-subtitle>Subtext</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
  name: "NavigationDrawer",
  props: {
    items: {
      type: Array,
      require: true,
    },
    color: {
      type: String,
      default: function() {
        return 'white'
      },
    },
    drawer: {
      type: Boolean,
      default: function() {
        return false
      },
    },
    dark: {
      type: Boolean,
      default: function() {
        return false
      },
    },
    expandOnHover: {
      type: Boolean,
      default: function() {
        return false
      },
    },
    miniVariant: {
      type: Boolean,
      default: function() {
        return false
      },
    },
    right: {
      type: Boolean,
      default: function() {
        return false
      },
    },
    background: {
      type: Boolean,
      default: function() {
        return false
      },
    },
    backgroundUrl: {
      type: String,
      default: function() {
        return 'https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg'
      },
    }
  },
  computed: {
    bg () {
      return this.background ? this.backgroundUrl : undefined
    },
  },
  watch: {
    drawer () {
      this.displayDrawer = !this.displayDrawer
    }
  },
  data: () => ({
    displayDrawer: false,
  })
}
</script>
<style lang="scss" scoped>
</style>
