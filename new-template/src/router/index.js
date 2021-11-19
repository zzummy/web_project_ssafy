import { createRouter, createWebHistory } from "vue-router";
import index from "../layouts/index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: index,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("../views/Home"),
      },
      {
        path: "/about",
        name: "About",
        component: () => import("../views/About"),
      },
      {
        path: "/contact",
        name: "Contact",
        component: () => import("../views/Contact"),
      },
      {
        path: "/auth",
        name: "login",
        component: () => import("../layouts/auth"),
        children: [
          {
            path: "login",
            name: "login",
            component: () => import("../views/login"),
          },
          {
            path: "signup",
            name: "SignUp",
            component: () => import("../views/SignUp"),
          }
        ]
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
