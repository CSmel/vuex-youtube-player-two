<template>
  <v-app id="inspire">
    <v-content class="grey darken-4">
      <v-container fluid>
        <v-row
          >{{ this.$store.state.channels_name }}
          <ContainerFavorite class="grey darken-4"></ContainerFavorite>
        </v-row>
        <v-col class="grey darken-4 text-center">
          <container-playlist-toolbar></container-playlist-toolbar>
          <container-playlist></container-playlist>
        </v-col>
      </v-container>
    </v-content>
    <v-footer app fixed class="font-weight-medium black">
      <video-player-footer :options="videoOptions" />
    </v-footer>
  </v-app>
</template>
<script>
import ContainerPlaylistToolbar from "./components/ContainerPlaylistToolbar";
import ContainerPlaylist from "./components/ContainerPlaylist";
import ContainerFavorite from "./components/ContainerFavorite";
import VideoPlayerFooter from "./components/VideoPlayerFooter.vue";

export default {
  name: "App",
  components: {
    ContainerPlaylistToolbar,
    ContainerFavorite,
    ContainerPlaylist,
    VideoPlayerFooter
  },
  data() {
    return {
      videoOptions: {
        loadingSpinner: false,
        autoplay: false,
        controlBar: {
          fullscreenToggle: false,
          disablePictureInPicture: true
        },
        sources: [
          {
            src: "https://www.youtube.com/embed/ehNXOIpRr6c",
            type: "video/youtube"
          }
        ]
      }
    };
  },
  props: {},
  watch: {
    playListIndex() {
      this.connectYoutube();
    },
    playlistTitle() {
      this.createVideoArray();
    }
  },
  updated() {
    this.$store.state.playListIndex;
  },
  mounted() {
    this.$nextTick(function() {
      this.connectYoutube();
      this.createVideoArray();
    });
  },
  methods: {
    // Vuex Store Methods

    connectYoutube() {
      return this.$store.dispatch("connectYoutube");
    },
    youtube_det() {
      return this.$store.dispatch("youtube_det");
    },
    createVideoArray() {
      return this.$store.dispatch("createVideoArray");
    },

    // detect which video is active abd play it.

    //  // playVideo(event) {
    // //  if (this.activeLink) {
    // //  this.activeLink.classList.remove("vid-active");
    //   }
    //   let els = document.querySelectorAll(".play.vid-active");
    //   this.playClassTotal = document.querySelectorAll(".play");
    //   this.eventTargetIndex =
    //     Array.from(this.playClassTotal).indexOf(event.target) + 1;
    //   for (let i = 0; i < els.length; i++) {
    //   els[i].classList.remove("vid-active");
    //   }
    //   this.activeLink = event.target;
    //   this.activeLink.previousElementSibling.classList.add("vid-active");
    //   this.videoAttr = event.target.previousElementSibling.getAttribute(
    //     "data-vvv"
    //   );
    //   this.videoId = event.target.previousElementSibling.getAttribute(
    //     "data-vvv"
    //   );
    //   this.pageTokenUrl = "https://www.youtube.com/embed/" + this.videoAttr;
    //
    //   this.playYoutubeVideo();
    //   console.log(this.videoId);
    //   this.$store.dispatch('youtube_det');
    //   },

    addCommas(nStr) {
      nStr += "";
      this.x = nStr.split(".");
      this.x1 = this.x[0];
      this.x2 = this.x.length > 1 ? "." + this.x[1] : "";
      this.rgx = /(\d+)(\d{3})/;
      while (this.rgx.test(this.x1)) {
        this.x1 = this.x1.replace(this.rgx, "$1" + "," + "$2");
        this.viewCount = this.x1 + this.x2;
      }
    },
    timeSince(a) {
      let s = Math.floor((new Date() - a) / 1000),
        i = Math.floor(s / 31536000);
      if (i > 1) {
        return i + " years ago";
      }
      i = Math.floor(s / 2592000);
      if (i > 1) {
        return i + " months ago";
      }
      i = Math.floor(s / 86400);
      if (i > 1) {
        return i + " days ago";
      }
      i = Math.floor(s / 3600);
      if (i > 1) {
        return i + " hours ago";
      }
      i = Math.floor(s / 60);
      if (i > 1) {
        return i + " minutes ago";
      }
      return Math.floor(s) + " seconds ago";
    },
    urlify(b) {
      let c = /(https?:\/\/[^\s]+)/g;
      return b.replace(c, function(a) {
        return (
          '<a href="' + a + '" rel="nofollow" target="_BLANK">' + a + "</a>"
        );
      });
    }
  },
  computed: {
    playListId() {
      return this.$store.state.playListId;
    },
    playListIndex() {
      return this.$store.state.playListIndex;
    }
  }
};
</script>
<style src="video.js/dist/video-js.css">
/* global styles */
</style>
<style>
@import url("https://fonts.googleapis.com/css?family=family=Roboto:100,300,400,500,700,900|Material+Icons");
button {
  height: 200px;
  width: 300px;
  background-color: blue;
}

#vid1 {
  margin-top: 10px;
}
.vjs-default-skin.vjs-paused .vjs-big-play-button {
  display: none;
}

.vjs-default-skin.vjs-paused .vjs-control-bar {
  display: flex;
  width: 600px;
}
.vjs-default-skin.vjs-has-started .vjs-control-bar {
  visibility: visible !important;
  opacity: 1 !important;

  background-color: rgba(7, 20, 30, 1) !important;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* Custom your style */

html,
body {
  padding: 0;
  margin: 0;
}

i.fa span {
  font-size: 16px;
}

body * {
  text-shadow: none;
}

iframe,
input,
textarea,
button {
  border: 0;
}

.vid-active {
  background-color: #78909c;
}
</style>
