import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import vuetify from "./plugins/vuetify"; // path to vuetify exportimport
import { store } from "./store.js";
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure you are using css-loader
require("../node_modules/video.js/dist/video.js");
require("../node_modules/videojs-youtube/dist/Youtube.min.js");
Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  vuetify,
  store: store,
  render: h => h(App)
}).$mount("#app");
