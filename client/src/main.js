import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.config.productionTip = false;
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import SocketIO from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import store from "./store";

Vue.use(
  new VueSocketIO({
    // debug: true,
    connection: SocketIO("http://localhost:5000"), //options object is Optional
    vuex: {
      store,
      mutationPrefix: "SOCKET_",
    },
  })
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
