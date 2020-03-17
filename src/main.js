/*
 * @Author: your name
 * @Date: 2020-03-09 23:04:12
 * @LastEditTime: 2020-03-16 15:05:59
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \todo-list\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@vant/touch-emulator";

Vue.config.productionTip = false;

window.app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
