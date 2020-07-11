<template>
  <div>
    <v-card
      :fullscreen="$vuetify.breakpoint.xsOnly"
      max-width="700px"
      class="mx-auto"
    >
      <v-app-bar dark color="purple"
        ><br />
        <v-chip color="purple"> Playlist: {{ playlistTitle }} </v-chip>
        <v-spacer></v-spacer>
        <v-toolbar-title class="my-2">
          <div class="black">
            <v-chip
              color="black"
              @click="decrement"
              :disabled="playListIndex <= 0"
              class="ma-2"
            >
              <v-icon small color="grey darken-1">$backward</v-icon>
            </v-chip>
            <v-chip
              color="black"
              @click="increment"
              :disabled="playListIndex >= playlistIdArray.length"
              class="ma-2"
            >
              <v-icon small color="grey darken-1">$next</v-icon>
            </v-chip>
          </div>
        </v-toolbar-title>
      </v-app-bar>
    </v-card>
  </div>
</template>
<script>
import { mapState} from "vuex";
import{mapActions} from "vuex"
export default {
  name: "ContainerPlaylistToolbar",
  comments: {},
  data() {
    return {
      dialog: false
    };
  },
  props: {},
  updated() {},
  watch: {},
  computed: {
    ...mapState(["playlistTitle", "playlistIdArray", "playListIndex"])
  },
  methods: mapActions([
  'increment',
  'decrement',

  ])
};
</script>
<style scoped></style>
