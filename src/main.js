import { createApp, provide, ref } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

// css global
import "@/css/base.css";

library.add(faTwitter, faPhone);

var isLogin;
var arrayHomestayFavourites = ref([]);
router.beforeEach((to, from, next) => {
  const pageTitle = to.meta.title;
  if (pageTitle) {
    document.title = pageTitle;
  }
  next();
});
isLogin = localStorage.getItem("user");

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(store)
  .use(router)
  .use(Antd)
  .provide("isLogin", isLogin)
  .mount("#app");
