import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "@/views/Home.vue";
// import TextFabric from "@/views/TextFabric.vue";
const context = require.context("../views", true, /\.vue$/); //true是否遍历文件的子目录
let routes: any = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  //   children: []
  // }
];
context.keys().forEach((item: any) => {
  const pathName = item.match(/\.\/(\S*)\.vue/)[1];
  if (pathName === "Home") {
    routes.push({
      path: "/",
      name: pathName,
      component: context(item).default,
      children: []
    });
  } else {
    routes.push({
      path: "/" + pathName,
      // path: "/Home/" + pathName,
      name: pathName,
      component: context(item).default
      // component: () => import("../views" + item.slice(1))
      // component: (resolve: any) =>
      //   require(["../views" + item.slice(1)], resolve)
    });
  }
});
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
