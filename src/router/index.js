import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from '../views/coaches/CoachDetail.vue';
import CoachesList from '../views/coaches/CoachesList.vue';
import CoachRegistration from '../views/coaches/CoachRegistration.vue';
import ContactCoach from '../views/requests/ContactCoach.vue';
import RequestsReceived from '../views/requests/RequestsReceived.vue';
import NotFound from '../views/NotFound.vue';
import UserAuth from '../views/auth/UserAuth.vue';

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
    },
    {
      name: 'requests',
      path: '/requests',
      component: RequestsReceived,
    },
    {
      name: 'auth',
      path: '/auth',
      component: UserAuth,
    },
    {
      name: 'not-found',
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
});

export default router;
