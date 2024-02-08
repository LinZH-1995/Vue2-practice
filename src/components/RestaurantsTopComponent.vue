<script>
import { restaurantsApi } from '../apis/restaurants'
import { Toast } from '../utils/sweetalert'

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },

  data: function () {
    return {
      restaurant: this.initialRestaurant
    }
  },

  methods: {
    async toggleFavorite(restaurantId) {
      try {
        // if isFavorited = true , call detele
        if (this.restaurant.isFavorited) {
          const response = await restaurantsApi.deleteFavorite(restaurantId)
          if (response.data.status !== 'success') {
            return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
          }
          this.restaurant.isFavorited = !this.restaurant.isFavorited
          this.restaurant.FavoriteCount -= 1
          return
        }

        // if isFavorited = false , call add
        const response = await restaurantsApi.addFavorite(restaurantId)
        if (response.data.status !== 'success') {
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }
        this.restaurant.isFavorited = !this.restaurant.isFavorited
        this.restaurant.FavoriteCount += 1

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法將餐廳加入/刪除最愛，請稍後再試!' })
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <div class="card mb-3" style="max-width: 540px;margin: auto;">
    <div class="row g-0">
      <div class="col-md-4">
        <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }" class="">
          <img class="card-img h-100 w-100" :src="restaurant.image">
        </router-link>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ restaurant.name }}</h5>
          <span class="badge rounded-pill text-bg-secondary mb-2">收藏數：{{ restaurant.FavoriteCount }}</span>
          <p class="card-text">
            {{ restaurant.description }}
          </p>
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }"
            class="btn btn-primary me-2">Show</router-link>

          <button type="button" class="btn btn-danger me-2" v-if="restaurant.isFavorited"
            @click.stop.prevent="toggleFavorite(restaurant.id)">
            移除最愛
          </button>
          <button type="button" class="btn btn-primary" v-else @click.stop.prevent="toggleFavorite(restaurant.id)">
            加到最愛
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
