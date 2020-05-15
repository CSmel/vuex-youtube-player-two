<template>
  <div>
    <v-card
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="700px"
      class="mx-auto"
    >
      <v-container class="grey darken-4">
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
                      <span>{{ newPublishedAt }}</span></i
                    ><i class="fa fa-thumbs-down pull-right"
                      >{{ dislikeCount }} Dislike</i
                    ><br />
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
            <div @click="showIndex = index">
              <v-hover v-slot:default="{ hover }">
                <v-card height="120" dark>
                  <div
                    class="play d-flex flex-no-wrap justify-space-between"
                    :class="{ 'vid-active': index === 0 }"
                    v-bind:index="index"
                    v-bind:data-vvv="d.snippet.resourceId.videoId"
                  >
                    <div>
                      <v-card-title class="subtitle-2">
                        <div :min="d.minute">
                          <div>
                            <span :class="[`vid-tm${index}`]"></span>
                          </div>
                          {{ d.snippet.title }}
                        </div>
                      </v-card-title>
                      <v-card-subtitle
                        ><span class="float-left displayDuration">
                          <span class="min"></span>:<span
                            class="sec"
                          ></span> </span
                      ></v-card-subtitle>
                    </div>
                    <v-avatar class="ma-3" size="100" tile>
                      <v-img :src="d.snippet.thumbnails.default.url"></v-img>
                    </v-avatar>
                    <div class="durationId" :class="[`duration${index}`]">
                      {{ d.snippet.resourceId.videoId }}
                    </div>
                  </div>
                  <v-expand-transition>
                    <div
                      @click.prevent="playVideo"
                      v-if="hover"
                      class="d-flex pointer transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
                      style="height: 100%;"
                    >
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
import axios from "axios";
export default {
  name: "ContainerPlaylist",
  components: {},
  data() {
    return {
      showIndex: null
    };
  },
  props: {},
  watch: {
    playlistTitle() {
      this.showIndex = 0;
    }
  },
  mounted() {
    this.formatDurationTime();
  },

  updated() {
    this.formatDurationTime();
  },

  methods: {
    playVideo(event) {
      if (encodeURIComponent(this.$store.state.activeLink)) {
        encodeURIComponent(this.$store.state.activeLink).classList.remove(
          "vid-active"
        );
      }
      let els = this.$el.querySelectorAll(".play.vid-active");
      const playClassTotal = this.$el.querySelectorAll(".play");
      this.$store.commit(
        "setEventTargetIndex",
        Array.from(playClassTotal).indexOf(event.target) + 1
      );

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
        "setPageTokenUrl",
        "https://www.youtube.com/embed/" + this.$store.state.videoId
      );
      // this.playYoutubeVideo();
      this.$store.dispatch("playYoutubeVideo");

      this.$store.dispatch("youtube_det");
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
              "&key=AIzaSyChhn0kj1g-rFE69Gb-lRJgbjwtQyKkjp4&part=contentDetails"
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
    }
  },
  computed: {
    dialog() {
      return this.$store.state.dialog;
    },
    // /showIndex(){
    // return this.$store.state.showIndex
    //
    // },
    videoAttr() {
      return this.$store.state.videoAttr;
    },
    title() {
      return this.$store.state.title;
    },
    viewCount() {
      return this.$store.state.viewCount;
    },
    newPublishedAt() {
      return this.$store.state.newPublishedAt;
    },
    likeCount() {
      return this.$store.state.likeCount;
    },
    dislikeCount() {
      return this.$store.state.dislikeCount;
    },
    desc() {
      return this.$store.state.desc;
    },
    videoList() {
      return this.$store.state.videoList;
    },
    //playVideo() {

    //},
    channels_title() {
      return this.$store.state.channels_title;
    },
    channels_name() {
      return this.$store.state.channels_name;
    },
    channelsHref() {
      return this.$store.state.channelsHref;
    },
    pageTokenUrl() {
      return this.$store.state.pageTokenUrl;
    },
    playlistTitle() {
      return this.$store.state.playlistTitle;
    },
    channelTitle() {
      return this.$store.state.channelTitle;
    }
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
