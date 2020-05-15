<template>
  <v-container text-center fluid class="black">
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
            @click="moveBackwards(n--)"
            :disabled="n <= 1"
            class="ma-2"
          >
            <v-icon small color="grey darken-1">$backward</v-icon>
          </v-chip>
          <v-chip
            color="black"
            @click="moveForward(n++)"
            :disabled="n >= this.eachVideo.length"
            class="ma-2"
          >
            <v-icon small color="grey darken-1">$next</v-icon>
          </v-chip>
        </div>
      </v-toolbar-title>
      <v-card width="100%" color="black" class="white--text"
        >{{ new Date().getFullYear() }} — <strong>Vuetify</strong></v-card
      >
    </v-row>
  </v-container>
</template>
<script>
import videojs from "video.js";

export default {
  name: "VideoPlayerFooter",
  props: {
    playVideo: Function,
    pageTokenUrl: String,
    eventTargetIndex: Number,
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null,
      n: 1,
      videoPlayerIndexProp: this.eventTargetIndex
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
  watch: {
    eventTargetIndex() {
      this.videoPlayerIndexProp = this.eventTargetIndex;
    },
    videoPlayerIndexProp() {
      this.n = this.videoPlayerIndexProp;
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    moveForward(n) {
      this.eachVideo[n - 1].classList.remove("vid-active");
      this.eachVideo[n].classList.add("vid-active");
      //this.playMusic(this.n);

      this.youtube_det();
    },
    moveBackwards(n) {
      this.eachVideo[n - 1].classList.remove("vid-active");
      this.eachVideo[n - 2].classList.add("vid-active");
      //this.playMusic(this.n - 2);
      this.youtube_det();
    },
    // playMusic() {
    //   this.videoAttr = this.eachVideo[this.n].getAttribute("data-vvv");
    //   this.videoId = this.eachVideo[this.n].getAttribute("data-vvv");
    //playYourTubeVideo() add this function later!!!!!!!!

    //this.pageTokenUrl = "https://www.youtube.com/embed/" + this.videoAttr;
    //document.getElementById("vid1_youtube_api").src = this.pageTokenUrl+"?controls=0&modestbranding=1&rel=0&showinfo=0&loop=0&fs=0&hl=en&iv_load_policy=1&enablejsapi=1&origin=http%3A%2F%2Flocalhost%3A8080&widgetid=1"
    // },

    //vuex
    youtube_det() {
      return this.$store.dispatch("youtube_det");
    }
  },
  computed: {
    eachVideo() {
      return this.$store.state.eachVideo;
    }
  }
};
</script>
<style scoped></style>
