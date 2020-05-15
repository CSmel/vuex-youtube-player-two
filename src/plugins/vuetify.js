// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#3f51b5",
        secondary: "#b0bec5",
        anchor: "#8c9eff"
      }
    }
  },
  icons: {
    iconfont: "fa",
    values: {
      play: "fas fa-play",
      next: "fas fa-forward",
      backward: "fas fa-backward",
      breakpoint: {
        thresholds: {
          xs: 340,
          sm: 540,
          md: 800,
          lg: 1280
        },
        scrollBarWidth: 24
      }
    }
  }
});
