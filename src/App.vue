<template>
  <v-app id="inspire">
    <v-content class="grey darken-4">
      <v-container fluid>
        <v-row
          >
          <ContainerFavorite class="grey darken-4"></ContainerFavorite>
        </v-row>
        <v-col :class="{'px-0': $vuetify.breakpoint.xsOnly }" class="grey darken-4 text-center">
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
import { mapGetters } from "vuex";



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
            src: "https://www.youtube.com/embed/dp58R7BEhrw",
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
  this.createVideoArray();
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


  },
  computed: {
  ...mapGetters([
    'playListId',
    'playListIndex',
    'videoAttr'
  ]),


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
