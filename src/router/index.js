import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Editing from "../views/Editing.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/editing/:id",
    component: Editing
  }
];

const router = new VueRouter({
  routes
});

export default router;
