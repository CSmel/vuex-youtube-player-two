<template>
  <v-container :fullscreen="$vuetify.breakpoint.mobile"  text-center fluid class="black">
    <v-row>
      <video
        id="vid1"
        ref="videoPlayer"
        class="video-js vjs-default-skin vjs-static-controls"
        controls
        height="30px"
        width="600px"
        autoplay
      ></video>
      <v-toolbar-title class="my-2">
        <div>
          <v-chip
            color="black"
            @click="moveBackwards"
            :disabled="n <= 1"
            class="ma-2"
          >
            <v-icon small color="grey darken-1">$backward</v-icon>
          </v-chip>
          <v-chip
            color="black"
            @click="moveForward"
            :disabled="this.n >= this.eachVideo.length"
            class="ma-2"
          >

            <v-icon small color="grey darken-1">$next</v-icon>
          </v-chip>
        </div>
      </v-toolbar-title>
      <v-card width="100%" color="black" class="white--text"
        >{{ new Date().getFullYear() }} — <strong>Vuetify/Vuex Vue Player</strong></v-card
      >
    </v-row>
  </v-container>
</template>
<script>
import videojs from "video.js";
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "VideoPlayerFooter",
  props: {
    playVideo: Function,
    pageTokenUrl: String,
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted: function() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,

      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
  updated() {},
  watch: {},
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: mapActions(["moveForward", "moveBackwards", "youtube_det"]),
  computed: {
    ...mapGetters(["eachVideo", "n","eventTargetIndex"])
  }
};
</script>
<style scoped></style>
