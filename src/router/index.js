import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFoundView from '../views/NotFoundView.vue'
import SignInView from '../views/SignInView.vue'
import RestaurantsView from '../views/RestaurantsView.vue'
import { pinia } from '../main'
import { useUserStore } from '../stores/user'

Vue.use(VueRouter)

const authenticateIsAdmin = (to, from, next) => {
  const userStore = useUserStore(pinia)
  if (!userStore.currentUser.isAdmin || !userStore.isAuthenticated) {
    return next('not-found')
  }
  next()
}

const router = new VueRouter({
  mode: 'hash',
  linkExactActiveClass: 'active',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignInView
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
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import('../views/EditUserProfileView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      redirect: '/admin/restaurants',
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/restaurants',
      name: 'admin-restaurants',
      component: () => import('../views/AdminView.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('../views/AdminCategoriesView.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/AdminUsersView.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/restaurants/new',
      name: 'admin-restaurant-new',
      component: () => import('../views/AdminAddRestaurantView.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/restaurants/:id',
      name: 'admin-restaurant',
      component: () => import('../views/AdminRestaurantView.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '/admin/restaurants/:id/edit',
      name: 'admin-restaurant-edit',
      component: () => import('../views/AdminEditRestaurantView.vue'),
      beforeEnter: authenticateIsAdmin
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFoundView
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  try {
    const userStore = useUserStore(pinia)
    const localStorageToken = localStorage.getItem('token') // get token from localStorage
    const StoreToken = userStore.token // get token from userStore

    // localStorageToken is not empty and is not the same as StoreToken
    // (refresh will cause store become empty, router redirect won't)
    // if refresh, sent request to server again
    if (localStorageToken && localStorageToken !== StoreToken) {
      await userStore.fetchCurrentUser()
    }

    // signup page do not need authentication
    if (to.path === '/signup') return next()

    // if isAuthenticated = true but try to go signin page , redirect to home page
    if (to.path === '/signin' && userStore.isAuthenticated) return next('/restaurants')

    // if isAuthenticated = false and try to go other page , redirect to signin page
    if (to.path !== '/signin' && !userStore.isAuthenticated) return next('/signin')

    next()
  } catch (error) {
    console.error(error)
  }
})

export default router
