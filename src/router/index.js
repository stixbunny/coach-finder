import { createRouter, createWebHistory } from 'vue-router';
import { useMainStore } from '../stores/main';

const CoachDetail = () => import('../views/coaches/CoachDetail.vue');
const CoachesList = () => import('../views/coaches/CoachesList.vue');
const CoachRegistration = () => import('../views/coaches/CoachRegistration.vue');
const ContactCoach = () => import('../views/requests/ContactCoach.vue');
const RequestsReceived = () => import('../views/requests/RequestsReceived.vue');
const NotFound = () => import('../views/NotFound.vue');
const UserAuth = () => import('../views/auth/UserAuth.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/coaches',
      name: 'index',
    },
    {
      path: '/coaches',
      component: CoachesList,
      name: 'coaches',
    },
    {
      name: 'coach-detail',
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [
        {
          name: 'contact',
          path: 'contact',
          component: ContactCoach,
        },
      ],
    },
    {
      name: 'register',
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    },
    {
      name: 'requests',
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    },
    {
      name: 'auth',
      path: '/auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    },
    {
      name: 'not-found',
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = useMainStore();
  if (to.meta.requiresAuth && !user.isAuthenticated()) {
    next({ name: 'auth' });
  } else if (to.meta.requiresUnauth && user.isAuthenticated()) {
    next({ name: 'coaches' });
  } else {
    next();
  }
});

export default router;
