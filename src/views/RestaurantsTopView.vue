<script>
import NavTabsComponent from '../components/NavTabsComponent.vue'
import RestaurantsTopComponent from '../components/RestaurantsTopComponent.vue'
import SpinnerComponent from '../components/SpinnerComponent.vue'
import { restaurantsApi } from '../apis/restaurants'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    NavTabsComponent,
    RestaurantsTopComponent,
    SpinnerComponent
  },

  data: function () {
    return {
      restaurants: [],
      isLoading: true
    }
  },

  methods: {
    async fetchTopRestaurants() {
      try {
        const response = await restaurantsApi.getTopRestaurants()
        this.restaurants = response.data.restaurants
        this.isLoading = false // stop loading

      } catch (error) {
        this.isLoading = false // stop loading
        Toast.fire({ icon: 'error', titleText: '無法取得餐廳資料，請稍後再試!' })
        console.error(error)
      }
    }
  },

  created() {
    this.fetchTopRestaurants()
  }
}
</script>

<template>
  <div class="container py-5">
    <NavTabsComponent />
    <SpinnerComponent v-if="isLoading" />

    <template v-else>
      <h1 class="mt-5">
        人氣餐廳
      </h1>
      <hr>
      <RestaurantsTopComponent v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
    </template>
  </div>
</template>
