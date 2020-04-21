<template>
  <div id="dashboard" class="dashboard__content">
    <v-tabs
      :centered="true"
      :grow="true"
      v-model="tab"
      background-color="grey lighten-4 accent-4"
      center-active
      show-arrows
    >
      <v-tab >Tab 1 ({{number}})</v-tab>
      <v-tab class="ml-0">Tab 2</v-tab>
      <v-tab >Tab 3</v-tab>
      <v-tab >Tab 4</v-tab>

      <v-tabs-items v-model="tab">
        <v-tab-item>
        </v-tab-item>
        <v-tab-item class="pa-8">
        </v-tab-item>
        <v-tab-item class="pa-8">
        </v-tab-item>
        <v-tab-item class="pa-8">
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </div>
</template>
<script>

// import gql from 'graphql-tag'

export default {
  components: {
  },
  name: "",
  data: () => ({
    tab: null,
    number: 3,
  }),

}
</script>
<style lang="scss" scoped>

.dashboard__content {
  width: 100%;
  height: 100%;
  background-color: white;
}

</style>
