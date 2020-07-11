<template>
  <div>
    <v-card
      max-width="700px"
      class="  mx-auto"
    >
      <v-container
                           class="white darken-4">
        <v-row class="grey darken-4" dense>
          <v-col v-for="(d, index) in videoList" v-bind:key="d.url" cols="12"
            ><div v-if="showIndex === index">
              <v-btn color="primary" dark @click.stop="dialog = true">
                Current Video Information
              </v-btn>
            </div>
            <v-dialog v-model="dialog" max-width="600" :retain-focus="false">
              <v-card>
                <v-card-title class="headline">{{ title }}</v-card-title>
                <v-card-text>
                  <div class="">
                    <a
                      href="https://www.youtube.com/channel/' + d + '"
                      target="_BLANK"
                      ><span id="user-img"></span>
                      <span class="">{{ channelTitle }}</span></a
                    >
                    <h4 class="pull-right">{{ viewCount }}</h4>
                  </div>
                  <div class="">
                    <i class="fa fa-clock-o">
                      <span>{{ newPublishedAt }}</span>
                      <br></i
                    ><br><i class="fa fa-thumbs-down pull-right"
                      >{{ dislikeCount }} Dislike</i
                    >
                    {{ likeCount }}<i class="fa fa-thumbs-up pull-right"></i>
                    <hr />
                    {{ desc }}<br />
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div  @click="showIndex = index">
              <v-hover v-slot:default="{ hover }">
                <v-card  :class="{'px-0': $vuetify.breakpoint.xsOnly}"  :height="playlistItemHeight" :width="playlistItemWidth" dark>
                  <div
                    class="play d-flex flex-no-wrap justify-space-between"

                    :class="{ 'vid-active': index === 0,  }"
                    v-bind:index="index +1 "
                    v-bind:data-vvv="d.snippet.resourceId.videoId"
                  >
                    <div >
                      <v-card-title :class="{'px-0': $vuetify.breakpoint.xsOnly,'caption': $vuetify.breakpoint.xsOnly}"  >
                        <div :min="d.minute">
                          <div>
                            <span :class="[`vid-tm${index}`]"></span>
                          </div>
                          {{ d.snippet.title }}
                        </div>
                      </v-card-title>
                      <v-card-subtitle :class="{'caption': $vuetify.breakpoint.xsOnly}"
                        ><span class="float-left displayDuration">
                          <span class="min"></span>:<span
                            class="sec"
                          ></span> </span
                      ></v-card-subtitle>
                    </div>
                    <v-avatar class="ma-3" tile>
                      <v-img :src="d.snippet.thumbnails.default.url"></v-img>
                    </v-avatar>
                    <div class="durationId" :class="[`duration${index}`]">{{ d.snippet.resourceId.videoId }}</div>

                  </div>
                  <v-expand-transition>
                    <div
                      @click.prevent="playVideo"
                      v-if="hover"
                      class="d-flex pointer transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    ><div class="index"></div>
                      Play Me
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-hover>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "ContainerPlaylist",
  components: {},
  data() {
    return {
      showIndex: null,
      dialog: false,

    al:'',
    };
  },
  props: {},
  watch: {
    playlistTitle() {
      this.showIndex = 0;
    this.$store.commit(
      "setN", 1
    );
      const playClassTotal = document.querySelectorAll(".play");


      for (let i = 0; i < playClassTotal.length; i++) {
        playClassTotal[i].classList.remove("vid-active");
        playClassTotal[0].classList.add("vid-active");
      }
    }
  },
  mounted() {
    this.formatDurationTime();
  ///testing

  },

  updated() {

  this.formatDurationTime();
   this.addCommasVC(this.viewCount)
    this.addCommasLC(this.likeCount);
   this.addCommasDLC(this.dislikeCount)
  this.urlify(this.desc).replace(/\n/g, "<br />");

  },

  methods: {
    addCommas(nStr) {
      nStr += "";
      this.x = nStr.split(".");
      this.x1 = this.x[0];
      this.x2 = this.x.length > 1 ? "." + this.x[1] : "";
      this.rgx = /(\d+)(\d{3})/;
    },
  addCommasVC(nStr){
    this.addCommas(nStr)
  while (this.rgx.test(this.x1)) {
  this.x1 = this.x1.replace(this.rgx, "$1" + "," + "$2");
  this.$store.commit('setViewCount',this.x1 + this.x2)
  }
  },  addCommasLC(nStr){
  this.addCommas(nStr)
  while (this.rgx.test(this.x1)) {
  this.x1 = this.x1.replace(this.rgx, "$1" + "," + "$2");
  this.$store.commit('setLikeCount',this.x1 + this.x2)
  }
  },
  addCommasDLC(nStr){
  this.addCommas(nStr)
  while (this.rgx.test(this.x1)) {
  this.x1 = this.x1.replace(this.rgx, "$1" + "," + "$2");
  this.$store.commit('setDislikeCount',this.x1 + this.x2)
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
    },

    playVideo(event) {
      if (encodeURIComponent(this.$store.state.activeLink)) {
        encodeURIComponent(this.$store.state.activeLink).classList.remove(
          "vid-active"
        );
      }

      let els = this.$el.querySelectorAll(".play.vid-active");
      this.$store.commit('setPlayClassTotal',this.$el.querySelectorAll(".play"))

      this.$store.commit(
        "setEventTargetIndex", Array.from(this.$store.state.playClassTotal).indexOf(event.target.index) + 1);

      for (let i = 0; i < els.length; i++) {
        els[i].classList.remove("vid-active");
      }

      this.$store.commit("setActiveLink", event.target);

      event.target.previousElementSibling.classList.add("vid-active");
      this.$store.commit(
        "setVideoAttr",
        event.target.previousElementSibling.getAttribute("data-vvv")
      );

      this.$store.commit(
        "setVideoId",
        event.target.previousElementSibling.getAttribute("data-vvv")
      );
    this.$store.commit(
      "setN",
      event.target.previousElementSibling.getAttribute("index")
    );
      this.$store.commit(
        "setPageTokenUrl",
        "http://youtube.com/embed/" + this.$store.state.videoId
      );
      // this.playYoutubeVideo();
      this.$store.dispatch("playYoutubeVideo");

      this.$store.dispatch("youtube_det");
      console.log(this.$store.state.eventTargetIndex)
    },
    formatDurationTime() {
      const vidTotal = this.$el.querySelectorAll(".play");
      for (let i = 0; i < vidTotal.length; i++) {
        this.$store.commit(
          "setNewId",
          this.$el.getElementsByClassName("durationId")[i].innerHTML
        );
        axios
          .get(
            "https://www.googleapis.com/youtube/v3/videos?id=" +
              this.$store.state.newId +
              "&key=AIzaSyCaAkPkdu44TjKTkidbByOkFJcHdBy_4CM&part=contentDetails"
          )
          .then(response => {
            this.$store.commit("setContentDetailsArray", response.data.items);

            this.$store.commit(
              "setVideoDuration",
              response.data.items[0].contentDetails.duration
            );
            if (this.$store.state.videoDuration.match(/M/g)) {
              this.$store.commit(
                "setVideoData",
                this.$store.state.videoDuration.split("M")
              );
              this.$store.commit(
                "setMinute",
                this.$store.state.videoData[0].replace("PT", "")
              );
              if (this.$store.state.videoData[1] != "") {
                this.$store.commit(
                  "setSeconds",
                  this.$store.state.videoData[1].replace("S", "")
                );
              } else {
                this.$store.commit("setSeconds", "00");
              }
            } else {
              this.$store.commit(
                "setVideoData",
                this.$store.state.videoDuration.split("PT")
              );
              this.$store.commit("setMinute", "00");
              this.$store.commit(
                "setSeconds",
                this.$store.state.videoData[1].replace("S", "")
              );
            }

            this.$el.getElementsByClassName("min")[
              i
            ].innerHTML = this.$store.state.minute;
            this.$el.getElementsByClassName("sec")[
              i
            ].innerHTML = this.$store.state.seconds;
          });
      }
    this.$store.commit('setNewPublishedAt', this.timeSince(new Date(this.$store.state.publishedAt).getTime()))
    }
  },
  computed: {

    ...mapGetters([
      "videoAttr",
      "title",
      "viewCount",
      "newPublishedAt",
      "publishedAt",
      "likeCount",
      "dislikeCount",
      "desc",
      "videoList",
      "channels_title",
      "channels_name",
      "channelsHref",
      "pageTokenUrl",
      "playlistTitle",
      "channelTitle",
      "eventTargetIndex"
    ]),
  // eslint-disable-next-line vue/return-in-computed-property
  playlistItemHeight () {
  switch (this.$vuetify.breakpoint.name) {
  case 'xs':
  return '70px'
  case 'sm':
  return '120px'
  case 'md':
  return '120px'
  case 'lg':
  return '140px'
  }
  // eslint-disable-next-line vue/return-in-computed-property
  },  playlistItemWidth () {
  switch (this.$vuetify.breakpoint.name) {
  case 'xs':
  return '100vw'
  case 'sm':
  return '400px'
  case 'md':
  return '600px'
  case 'lg':
  return '800px'
  case 'xl':
  return '1000px'
  }
  },
  // eslint-disable-next-line vue/return-in-computed-property
  fontSize () {
  switch (this.$vuetify.breakpoint.name) {
  case 'xs':
  return '5rem'
  case 'sm':
  return '45rem'
  case 'md':
  return '600px'
  case 'lg':
  return '30px'
  case 'xl':
  return '30px !important'
  }
  },

  }
};
</script>
<style scoped>
.durationId {
  border: 1px solid red;
  display: none;
}

.displayDuration {
  color: white;
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}

.pointer {
  cursor: pointer;
}
</style>
