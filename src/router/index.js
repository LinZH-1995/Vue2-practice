import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue'
import SignInView from '../views/SignInView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/signin',
      name: 'sign-in',
      component: SignInView,
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundView,
    }
  ]
})

export default router
