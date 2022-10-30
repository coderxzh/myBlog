import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home", 
    component: () => import("../components/containner/items/home.vue"),
    meta: {path:'/home',title: "工作台" },
  },
  {
    path: "/addEssay",
    name: "addEssay", 
    component: () => import("../components/containner/items/addEssay.vue"),
    meta: { path:'/addEssay', title: "文章编写" },
  },
  {
    path: "/essayList",
    name: "essayList", 
    component: () => import("../components/containner/items/essayList.vue"),
    meta: {path:'/essayList', title: "文章列表" },
  },
  {
    path: "/editEssay",
    name: "editEssay", 
    component: () => import("../components/containner/items/editEssay.vue"),
    meta: { path:'/editEssay', title: "编辑文章" },
  },
  {
    path: "/link",
    name: "link", 
    component: () => import("../components/containner/items/Link.vue"),
    meta: { path:'/link', title: "友链" },
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  linkExactActiveClass: "active"
});
export default router;
