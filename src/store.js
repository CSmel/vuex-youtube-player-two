import Vue from "vue";

import Vuex from "vuex";
import axios from "axios";
import videojs from "video.js";

Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    title: "",
    desc: "",
    channelTitle: "",
    newPublishedAt: "",
    viewCount: "",
    likeCount: "",
    dislikeCount: "",
    videoId: "",
    apikey: "AIzaSyChhn0kj1g-rFE69Gb-lRJgbjwtQyKkjp4",

    appPlaylistIndex: 0,
    eventTargetIndex: 1,
    pageToken: "",
    uploadsId: "",
    channels_title: "",
    channels_name: "ninofficial",
    channelsHref: "",
    thumbnailUrl: "",
    eachVideo: [],
    playListId: "",
    playlistTitle: "",
    pageTokenUrl: "",
    nextpageToken: "",
    channelId: [],
    videoList: [],
    videoUploads: [],
    playListIndex: 0,
    playlistIdArray: [],
    activeLink: "",
    playClassTotal: "",
    videoAttr: "",
    newId: "",
    videoDuration: "",
    seconds: "",
    minute: "",
    videoData: "",
    contentDetailsArray: [],
    visible: false
  },
  mutations: {
  increment(state) {
  state.playListIndex++;
  },
  decrement(state) {
  state.playListIndex--;
  },
    setActiveLink(state, setActiveLink) {
      state.setActiveLink = setActiveLink;
    },
    setPlayClassTotal(state, setPlayClassTotal) {
      state.setPlayClassTotal = setPlayClassTotal;
    },
    setVideoAttr(state, setVideoAttr) {
      state.setVideoAttr = setVideoAttr;
    },

    setApikey(state, apikey) {
      state.apikey = apikey;
    },
    setNewPublishedAt(state, newPublishedAt) {
      state.newPublishedAt = newPublishedAt;
    },
    setViewCount(state, viewCount) {
      state.viewCount = viewCount;
    },
    setDislikeCount(state, dislikeCount) {
      state.dislikeCount = dislikeCount;
    },
    setLikeCount(state, likeCount) {
      state.likeCount = likeCount;
    },
    setPublishedAt(state, publishedAt) {
      state.publishedAt = publishedAt;
    },

    setTitle(state, title) {
      state.title = title;
    },
    setDesc(state, desc) {
      state.desc = desc;
    },
    setChannelTitle(state, channelTtitle) {
      state.channelTitle = channelTtitle;
    },
    setChannels_name(state, channels_name) {
      state.channels_name = channels_name;
    },
    setVideoId(state, videoId) {
      state.videoId = videoId;
    },
    setPlayListId(state, playListId) {
      state.playListId = playListId;
    },
    setAppPlayListIndex(state, appPlayListIndex) {
      state.appPlayListIndex = appPlayListIndex;
    },
    setPlayListIndex(state, playListIndex) {
      state.playListIndex = playListIndex;
    },
    setEventTargetIndex(state, eventTargetIndex) {
      state.eventTargetIndex = eventTargetIndex;
    },
    setPageToken(state, pageToken) {
      state.pageToken = pageToken;
    },
    setUploadsId(state, uploadsId) {
      state.uploadsId = uploadsId;
    },
    setChannels_title(state, channels_title) {
      state.channels_title = channels_title;
    },
    setChannelsHref(state, channelsHref) {
      state.channelsHref = channelsHref;
    },
    setThumbnailUrl(state, thumbnailUrl) {
      state.thumbnailUrl = thumbnailUrl;
    },
    setEachVideo(state, eachVideo) {
      state.eachVideo = eachVideo;
    },
    setPlaylistTitle(state, playlistTitle) {
      state.playlistTitle = playlistTitle;
    },
    setPageTokenUrl(state, pageTokenUrl) {
      state.pageTokenUrl = pageTokenUrl;
    },
    setNextpageToken(state, nextpageToken) {
      state.nextpageToken = nextpageToken;
    },
    setChannelId(state, channelId) {
      state.channelId = channelId;
    },
    setVideoList(state, videoList) {
      state.videoList = videoList;
    },
    setVideoUploads(state, videoUploads) {
      state.videoUploads = videoUploads;
    },
    setVisible(state, visible) {
      state.visible = visible;
    },
    setPlaylistIdArray(state, playlistIdArray) {
      state.playlistIdArray = playlistIdArray;
    },
    setNewId(state, newId) {
      state.newId = newId;
    },
    setVideoDuration(state, videoDuration) {
      state.videoDuration = videoDuration;
    },
    setSeconds(state, seconds) {
      state.seconds = seconds;
    },
    setMinute(state, minute) {
      state.minute = minute;
    },
    setVideoData(state, videoData) {
      state.videoData = videoData;
    },
    setContentDetailsArray(state, contentDetailsArray) {
      state.contentDetailsArray = contentDetailsArray;
    },
    setDialog(state, dialog) {
      state.dialog = dialog;
    }
    // setShowIndex(state, showIndex) {
    // state.showIndex = showIndex;
    // }
  },
  //axios calls
  actions: {
  increment: ({ commit }) => commit('increment'),
  decrement: ({ commit }) => commit('decrement'),

    // 1 connect
    connectYoutube: function({ commit, state }, payload) {
      //this.channels_name = "massiveattack"; //example
      this.channelsHref =
        "https://www.youtube.com/user/" +
        encodeURIComponent(state.channels_name);
      //this.channels_title = "jQuery plugin by @bachors";

      axios
        .get(
          "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&snippet&contentOwnerDetails&forUsername=" +
            encodeURIComponent(state.channels_name) +
            "&key=" +
            encodeURIComponent(state.apikey),
          {
            crossDomain: true,
            dataType: "json",
            payload
          }
        )
        .then(response => {
          commit("setVideoUploads", response.data);
          commit(
            "setUploadsId",
            response.data.items[0].contentDetails.relatedPlaylists.uploads
          );
          commit("setChannelId", response.data.items[0].id);
          commit("setPageToken", "");
          this.dispatch("getPlaylistId");
        });
    },

    //Get Information about current Video.
    youtube_det({ commit, state }, payload) {
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/videos?id=" +
            encodeURIComponent(state.videoId) +
            "&key=" +
            encodeURIComponent(state.apikey) +
            "&part=snippet,statistics,contentDetails",
          payload
        )
        .then(response => {
          commit("setViewCount", response.data.items[0].statistics.viewCount);
          commit(
            "setDislikeCount",
            response.data.items[0].statistics.dislikeCount
          );
          commit("setLikeCount", response.data.items[0].statistics.likeCount);
          commit("setPublishedAt", response.data.items[0].snippet.publishedAt);
          //this.category = ""
          commit("setTitle", response.data.items[0].snippet.localized.title);
          commit(
            "setDesc",
            response.data.items[0].snippet.localized.description
          );
          console.log('response data', response.data)
          //this.channelTitle = response.data.items[0].snippet.channelTitle;
          // this.addCommas(this.viewCount);
          //this.addCommas(this.likeCount);
          //  this.addCommas(this.dislikeCount);
          //this.urlify(this.desc).replace(/\n/g, "<br />");
          // commit('setNewPublishedAt', this.timeSince(
          //   new Date(this.publishedAt).getTime()
          // ))
        });
    }, /// get the playlist ID
    getPlaylistId({ commit, state }, payload) {
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&maxResults=50&channelId=" +
            encodeURIComponent(state.channelId) +
            "&key=" +
            encodeURIComponent(state.apikey) +
            "&pageToken=",
          payload
          // this.pageToken
        )
        .then(response => {
          commit("setPlaylistIdArray", response.data.items);
          commit(
            "setPlaylistTitle",
            response.data.items[encodeURIComponent(state.playListIndex)].snippet
              .title
          );
          commit(
            "setPlayListId",
            response.data.items[encodeURIComponent(state.playListIndex)].id
          );
          this.dispatch("displayPlayListIdList");
          console.log('playListIdArray', response.data)
        });
    },
    // get the entire playlist
    displayPlayListIdList({ commit, state }, payload) {
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=2&key=" +
            encodeURIComponent(state.apikey) +
            "&playlistId=" +
            encodeURIComponent(state.playListId),
          payload
          // this.pageToken
        )
        .then(response => {
          commit("setVideoList", response.data.items);
          commit(
            "setVideoId",
            response.data.items[0].snippet.resourceId.videoId
          );
          commit(
            "setPageTokenUrl",
            "https://www.youtube.com/embed/g1rz_QXQt34" + state.videoId
          );

          //this.displayPlayListIdListArray = response.data;
          this.dispatch("youtube_det");
        });
    },

    //-------------------------------testing

    playYoutubeVideo({ state }) {
      let ytplayer = videojs("vid1");
      ytplayer.src({ type: "video/youtube", src: state.pageTokenUrl });
    },

    // end of testing -------------------------------
    createVideoArray({ commit }) {
      const playArray = document.querySelectorAll(".play");
      commit("setEachVideo", Array.prototype.slice.call(playArray));
    }
  },

  getters: {
    title: state => state.title,
    newPublishedAt: state => state.newPublishedAt,
    viewCount: state => state.viewCount,
    likeCount: state => state.likeCount,
    dislikeCount: state => state.dislikeCount,
    publishedAt: state => state.publishedAt,
    desc: state => state.title,
    channelTitle: state => state.channelTitle,
    videoId: state => state.videoId,
    playListId: state => state.playListId,
    apikey: state => state.apikey,
    appPlaylistIndex: state => state.appPlaylistIndex,
    eventTargetIndex: state => state.eventTargetIndex,
    activeLink: state => state.activeLink,
    playClassTotal: state => state.playClassTotal,
    videoAttr: state => state.videoAttr,
    pageToken: state => state.pageToken,
    uploadsId: state => state.uploadsId,
    channels_title: state => state.channels_title,

    channels_name: state => state.channels_name,
    channelsHref: state => state.channelsHref,
    thumbnailUrl: state => state.thumbnailUrl,

    eachVideo: state => state.eachVideo,
  contentDetailsArray: state => state.contentDetailsArray,
    playlistTitle: state => state.playlistTitle,
    pageTokenUrl: state => state.pageTokenUrl,
    nextpageToken: state => state.nextpageToken,
    channelId: state => state.channelId,
    videoList: state => state.videoList,
    videoUploads: state => state.videoUploads,
    visible: state => state.visible,
    playlistIdArray: state => state.playlistIdArray
  }
});
