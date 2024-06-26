import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegister from "./pages/coaches/CoachRegister.vue";
import ContactCoach from "./pages/request/ContactCoach.vue";
import RequestReceived from "./pages/request/RequestReceived";
import UserAuth from "./pages/auth/UserAuth";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesList },
    {
      path: "/coaches/:id",
      component: CoachDetail,
      props:true,
      children: [
        { path: "contact", component: ContactCoach }
      ],  
    },
    { path: "/register", component: CoachRegister },
    { path: "/request", component: RequestReceived },
    { path: "/auth", component: UserAuth },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

export default router;
