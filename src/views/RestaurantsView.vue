<script>
import NavTabsComponent from '../components/NavTabsComponent.vue'
import RestaurantCardComponent from '../components/RestaurantCardComponent.vue'
import RestaurantsNavPillsComponent from '../components/RestaurantsNavPillsComponent.vue'
import RestaurantPaginationComponent from '../components/RestaurantPaginationComponent.vue'
import { restaurantsApi } from '../apis/restaurants'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    NavTabsComponent,
    RestaurantCardComponent,
    RestaurantsNavPillsComponent,
    RestaurantPaginationComponent
  },

  data: function () {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1
    }
  },

  methods: {
    async fetchRestaurants({ page, categoryId }) {
      try {
        const response = await restaurantsApi.getRestaurants({ page, categoryId })

        this.restaurants = response.data.restaurants
        this.categories = response.data.categories
        this.categoryId = response.data.categoryId
        this.currentPage = response.data.page
        this.totalPage = response.data.totalPage
        this.previousPage = response.data.prev
        this.nextPage = response.data.next

        console.log('response', response)
      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法取得餐廳資料，請稍後再試!' })
        console.error(error)
      }
    }
  },

  beforeRouteUpdate(to, _from, next) {
    const { page, categoryId } = to.query
    this.fetchRestaurants({ page, categoryId })
    next()
  },

  created() {
    const { page, categoryId } = this.$route.query
    this.fetchRestaurants({ page, categoryId })
  }
}
</script>

<template>
  <div class="container py-5">
    <NavTabsComponent />
    <RestaurantsNavPillsComponent :categories="categories" />

    <div class="row">
      <RestaurantCardComponent v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
    </div>

    <RestaurantPaginationComponent class="px-auto" v-if="totalPage.length > 1" :current-page="currentPage"
      :total-page="totalPage" :category-id="categoryId" :previous-page="previousPage" :next-page="nextPage" />
  </div>
</template>
