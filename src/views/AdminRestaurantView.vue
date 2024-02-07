<script>
import { adminApi } from '../apis/admin'
import { Toast } from '../utils/sweetalert'

export default {
  data: function () {
    return {
      restaurant: {}
    }
  },

  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const response = await adminApi.getRestaurant(restaurantId)
        this.restaurant = response.data.restaurant

      } catch (error) {
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
    <div class="row">
      <div class="col-md-12">
        <h1>{{ restaurant.name }}</h1>
        <span class="badge rounded-pill text-bg-secondary mt-1 mb-3">
          {{ restaurant.Category.name }}
        </span>
      </div>
      <div class="col-md-4">
        <img class="img-responsive center-block"
          :src="restaurant.image ?? 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'"
          style="width: 250px;margin-bottom: 25px;">
        <div class="well">
          <ul class="list-unstyled">
            <li class="mb-1">
              <strong>Opening Hour:</strong>
              {{ restaurant.opening_hours }}
            </li>
            <li class="mb-1">
              <strong>Tel:</strong>
              {{ restaurant.tel }}
            </li>
            <li>
              <strong>Address:</strong>
              {{ restaurant.address }}
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-8">
        <p>{{ restaurant.description }}</p>
      </div>
    </div>
    <hr>
    <button type="button" class="btn btn-link" @click="$router.back()">回上一頁</button>
  </div>
</template>
