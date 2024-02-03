import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue'
import SignInView from '../views/SignInView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  linkExactActiveClass: 'active',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/restaurants'
    },
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
      path: '/restaurants',
      name: 'restaurants',
      component: RestaurantsView
    },
    {
      path: '/restaurants/feeds',
      name: 'restaurants-feeds',
      component: () => import('../views/RestaurantsFeedsView.vue')
    },
    {
      path: '/restaurants/top',
      name: 'restaurants-tops',
      component: () => import('../views/RestaurantsTopView.vue')
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant',
      component: () => import('../views/RestaurantView.vue')
    },
    {
      path: '/restaurants/:id/dashboard',
      name: 'restaurant-dashboard',
      component: () => import('../views/RestaurantDashboardView.vue')
    },
    {
      path: '/users/top',
      name: 'users-top',
      component: () => import('../views/UsersTopView.vue')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('../views/UserView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/restaurants'
    },
    {
      path: '/admin/restaurants',
      name: 'admin-restaurants',
      component: () => import('../views/AdminView.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundView,
    }
  ]
})

export default router
