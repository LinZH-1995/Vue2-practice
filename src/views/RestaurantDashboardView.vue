<script>
import SpinnerComponent from '../components/SpinnerComponent.vue'
import { restaurantsApi } from '../apis/restaurants'
import { Toast } from '../utils/sweetalert'

export default {
  components: {
    SpinnerComponent
  },

  data: function () {
    return {
      restaurant: {},
      isLoading: true
    }
  },

  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const response = await restaurantsApi.getRestaurant(restaurantId)
        this.restaurant = {
          ...response.data.restaurant,
          commentCounts: response.data.restaurant.Comments.length
        }
        this.isLoading = false // stop loading

      } catch (error) {
        this.isLoading = false // stop loading
        Toast.fire({ icon: 'error', titleText: '無法取得餐廳資料，請稍後再試!' })
        console.error(error)
      }
    }
  },

  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },

  beforeRouteUpdate(to, _from, next) {
    const restaurantId = to.params.id
    this.fetchRestaurant(restaurantId)
    next()
  }
}
</script>

<template>
  <div class="container py-5">
    <SpinnerComponent v-if="isLoading" />

    <template v-else>
      <div>
        <h1>{{ restaurant.name }}</h1>
        <span class="badge rounded-pill text-bg-secondary mt-1 mb-3">
          {{ restaurant.Category.name }}
        </span>
      </div>

      <hr>

      <ul>
        <li>評論數： {{ restaurant.commentCounts }} </li>
        <li>瀏覽次數： {{ restaurant.viewCounts }} </li>
      </ul>

      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
    </template>
  </div>
</template>
