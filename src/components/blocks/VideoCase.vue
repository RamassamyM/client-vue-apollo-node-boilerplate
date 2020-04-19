<template>
  <v-container>
    <v-row>
      <v-col
        xs12
        text-xs-center>
        <h1 class="primary--text">Watch Videos</h1>
        <h2 class="headline accent--text">Click The Image To Lazy Load The Video</h2>
      </v-col>
    </v-row>
    <v-row
      row
      justify-center>
      <v-col
        v-for="(video,key) in videos"
        :key="key"
        xs12
        sm12
        md4
        lg4
        xl4
        text-xs-center
        pa-2>
        <v-card>
          <div
            :style="{ backgroundImage: 'url(' + video.poster + ')', height: imageHeight, 'background-position': 'center', 'background-repeat': 'no-repeat' }"
            style="cursor:pointer;"
            @click="changeVideo(video)"
          />
          <v-card-title
            v-if="showVideoTitle"
            style="background-color: #607d8b;">
            <v-spacer/>
            <span class="headline white--text">{{ video.title }}</span>
            <v-spacer/>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      v-if="loaded"
      row
      wrap>
      <v-col
        xs12
        text-xs-center>
        <Youtube-Block
          :youtubeid="youtube_id"
          :player-width="youtubeWidth"
          :player-height="youtubeHeight"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import YoutubeBlock from '@/components/medias/YoutubeBlock.vue'

export default {
  components: {
    YoutubeBlock
  },
  data: () => ({
    videos: [
      {
        title: "One Piece 819",
        href: "https://www.youtube.com/watch?v=Pgmx7z49OEk",
        type: "text/html",
        youtube: "Pgmx7z49OEk",
        poster: "https://i.ytimg.com/vi/Pgmx7z49OEk/maxresdefault.jpg"
      },
      {
        title: "One Piece Commercial",
        href: "https://www.youtube.com/watch?v=weRHyjj34ZE",
        type: "text/html",
        youtube: "weRHyjj34ZE",
        poster: "https://i.ytimg.com/vi/weRHyjj34ZE/maxresdefault.jpg"
      },
      {
        title: "One Piece Coca Cola Ads",
        href: "https://www.youtube.com/watch?v=SV1Z2kpzjQk",
        type: "text/html",
        youtube: "Pgmx7z49OEk",
        poster: "https://i.ytimg.com/vi/Pgmx7z49OEk/maxresdefault.jpg"
      }
    ],
    youtube_id: "l-nKCcfSMHc",
    loaded: false
  }),
  computed: {
    imageHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100px";
        case "sm":
          return "100px";
        case "md":
          return "150px";
        case "lg":
          return "250px";
        case "xl":
          return "250px";
      }
    },
    youtubeHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "315px";
        case "sm":
          return "315px";
        case "md":
          return "450px";
        case "lg":
          return "750px";
        case "xl":
          return "864px";
      }
    },
    youtubeWidth() {
      let width = window.innerWidth;
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return `${width}px`;
        case "sm":
          return `${width}px`;
        case "md":
          return `${width}px`;
        case "lg":
          return `${width}px`;
        case "xl":
          return `${width}px`;
      }
    },
    showVideoTitle() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return true;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    }
  },
  methods: {
    changeVideo(video) {
      this.youtube_id = video.youtube;
      this.loaded = true;
    }
  }
};
</script>

<style>
</style>
