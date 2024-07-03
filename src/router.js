import { createRouter, createWebHistory } from "vue-router";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachRegister from "./pages/coaches/CoachRegister.vue";
import ContactCoach from "./pages/request/ContactCoach.vue";
import RequestReceived from "./pages/request/RequestReceived";
import UserAuth from "./pages/auth/UserAuth";
import NotFound from "./pages/NotFound.vue";
import store from "./store/index.js";

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
    { path: "/register", component: CoachRegister , meta:{ requiresAuth:true}},
    { path: "/request", component: RequestReceived, meta:{ requiresAuth:true} },
    { path: "/auth", component: UserAuth ,meta:{ requiresUnAuth:true} },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});
router.beforeEach(function(to,from,next){
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/auth');
  }else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
    next('/coaches');
  }else{
    next();
  }
});
export default router;
