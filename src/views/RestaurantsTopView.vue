<script>
import NavTabsComponent from '../components/NavTabsComponent.vue'
import RestaurantsTopComponent from '../components/RestaurantsTopComponent.vue'
import { restaurantsApi } from '../apis/restaurants'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    NavTabsComponent,
    RestaurantsTopComponent
  },

  data: function () {
    return {
      restaurants: []
    }
  },

  methods: {
    async fetchTopRestaurants() {
      try {
        const response = await restaurantsApi.getTopRestaurants()
        this.restaurants = response.data.restaurants

      } catch (error) {
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
    <h1 class="mt-5">
      人氣餐廳
    </h1>
    <hr>
    <RestaurantsTopComponent v-for="restaurant in restaurants" :key="restaurant.id" :initial-restaurant="restaurant" />
  </div>
</template>
