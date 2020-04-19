<template>
    <v-card>
      <vue-plyr :emit="['ready','error', 'playing', 'ended']">
        <div
          data-plyr-provider="youtube"
          :data-plyr-embed-id="youtubeid"
          controls
          data-plyr-config='{"youtube": { "noCookie": "false", "rel": "0", "showinfo": "0", "iv_load_policy": "3", "modestbranding": "1" }, "resetOnEnd": "true", "controls": ["play", "play-large", "fullscreen", "volume", "mute", "progress"], "hideControls" : "true"}'
        >
        </div>
      </vue-plyr>
    </v-card>
</template>
<script>
export default {
  name: 'YoutubeBlock',
  props: {
    youtubeid: String,
  },
  data: () => ({
  }),
  computed: {


  }
}
</script>
<style lang="scss" scoped>
</style>
