<template>
  <v-sheet class="mx-auto" elevation="8" max-width="100%">
    <v-slide-group
      class="pa-4"
      next-icon="mdi-plus"
      prev-icon="mdi-minus"
      show-arrows
    >
      <v-slide-item
        :key="n.src"
        v-for="n in items"
        v-slot:default="{ active, toggle }"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-card
              :artistChannelName="n.artistChannelName"
              :color="n.color"
              @click="toggle"
              @click.prevent="updateArtist"
              class="ma-4"
              height="150"
              v-on="on"
              width="150"
            >
              <v-img :src="n.src"></v-img>
              <v-row align="center" class="fill-height" justify="center">
                <v-scale-transition>
                  <v-icon
                    size="48"
                    v-if="active"
                    v-text="'mdi-close-circle-outline'"
                  ></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </template>
          <span>{{ n.artist }}</span>
        </v-tooltip>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>
<script>
export default {
  name: "ContainerFavorite",
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src:
          "https://yt3.ggpht.com/a/AATXAJxC_8OjSN8NLtxFctXu2X49PSZSqQ_hnCdwmw=s288-c-k-c0xffffffff-no-rj-mo",

        artist: "Eric Prydz",
        artistChannelName: "EricPrydzTV"
      },
      {
        color: "#952175",
        src:
          "https://yt3.ggpht.com/a/AATXAJz8OfzGwM0UBNE-5XEhPWiqYkWxpMZEESUMYA=s288-c-k-c0xffffffff-no-rj-mo",
        artist: "Above & Beyond",
        artistChannelName: "aboveandbeyondtv"
      },
      {
        color: "#952175",
        src:
          "https://yt3.ggpht.com/a/AATXAJxtFIhLe_LJoEWGhDBqFsYlnzVzGtHxbSMpDg=s288-c-k-c0xffffffff-no-rj-mo",
        artist: "KMFDM",
        artistChannelName: "officialkmfdm"
      },
      {
        color: "#952175",
        src:
          "https://yt3.ggpht.com/a/AATXAJxDvHGyUnFvX37aCheQYCCqdJX9vmt3U1hQNg=s176-c-k-c0x00ffffff-no-rj",
        artist: "808 State",
        artistChannelName: "808StateOfficial"
      },
      {
        color: "#952175",
        src:
          "https://yt3.ggpht.com/a/AATXAJwWNQ0z_qIgPQXjQ8aXh1MpqGOxDSNvJ-jMiQ=s288-c-k-c0xffffffff-no-rj-mo",
        artist: "Deftones",
        artistChannelName: "deftones"
      },
      {
        color: "#952175",
        src:
          "https://yt3.ggpht.com/a/AATXAJwdS7YDOcATS_bU2s_Krotc7mH9N5bO1WZzIA=s100-c-k-c0xffffffff-no-rj-mo",
        artist: "Nine Inch Nails",
        artistChannelName: "ninofficial"
      }
    ]
  }),
  props: {},
  methods: {
    updateArtist(event) {
      this.$store.commit(
        "setChannels_name",
        event.currentTarget.getAttribute("artistChannelName")
      );
      this.$store.dispatch("connectYoutube");
    }
  }
};
</script>
<style scoped></style>
