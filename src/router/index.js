import { createRouter, createWebHistory } from "vue-router";

// Lazy-loaded views
const HomeView = () => import("../views/HomeView.vue");
const DetailView = () => import("../views/DetailView.vue");
const NotFoundView = () => import("../views/NotFoundView.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { title: "Fayze.co" },
  },
  {
    path: "/post/:id",
    name: "post",
    component: DetailView,
    meta: { title: "Post Detail" },
  },
  {
    path: "/404",
    name: "not-found",
    component: NotFoundView,
    meta: { title: "404 – Page not found" },
  },
  //Redirect all unknown paths to 404
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
});

//update the doc title after each navigation.
router.afterEach((nav) => {
  document.title = nav.meta.title ?? "Fayze Blog";
});

export default router;
