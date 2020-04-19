<template>
  <div id="pageCircularProgress">
    <v-overlay
          :absolute="absolute"
          :opacity="opacity"
          :value="preloading"
          :z-index="zIndex"
          :color="overlayColor"
        >
        <v-progress-circular
        :indeterminate="progressIndeterminate"
        :rotate="progressRotate"
        :size="progressSize"
        :value="progressValue"
        :width="progressWidth"
        color="red"
        >
        </v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({
    preloading: 0,
    absolute: false,
    opacity: 1,
    overlayColor: '#FFF',
    zIndex: 100,
    progressIndeterminate: true,
    progressRotate: 0,
    progressSize: 150,
    progressValue: 0,
    progressWidth: 15,
  })
}
</script>
<style lang="scss" scoped>
</style>
