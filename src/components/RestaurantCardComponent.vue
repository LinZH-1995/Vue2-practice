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
          if (response.data.status !== 'success') throw new Error(response.data.message)
          this.restaurant.isFavorited = !this.restaurant.isFavorited
          return
        }

        // if isFavorited = false , call add
        const response = await restaurantsApi.addFavorite(restaurantId)
        if (response.data.status !== 'success') throw new Error(response.data.message)
        this.restaurant.isFavorited = !this.restaurant.isFavorited

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法將餐廳加入/刪除最愛，請稍後再試!' })
        console.error(error)
      }
    },
    async toggleLike(restaurantId) {
      try {
        // if isLiked = true , call detele
        if (this.restaurant.isLiked) {
          const response = await restaurantsApi.deleteLike(restaurantId)
          if (response.data.status !== 'success') throw new Error(response.data.message)
          this.restaurant.isLiked = !this.restaurant.isLiked
          return
        }

        // if isLiked = false , call add
        const response = await restaurantsApi.addLike(restaurantId)
        if (response.data.status !== 'success') throw new Error(response.data.message)
        this.restaurant.isLiked = !this.restaurant.isLiked
        
      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法將餐廳加入/刪除喜歡，請稍後再試!' })
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img class="card-img-top" :src="restaurant.image" alt="Card image cap" width="286px" height="180px">
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">{{ restaurant.name }}</router-link>
        </p>
        <span class="badge rounded-pill text-bg-secondary mb-2">{{ restaurant.Category.name }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <template>
          <button type="button" class="btn btn-danger btn-border favorite me-2 my-2" v-if="restaurant.isFavorited"
            @click.stop.prevent="toggleFavorite(restaurant.id)">
            移除最愛
          </button>
          <button type="button" class="btn btn-primary btn-border favorite me-2 my-2" v-else
            @click.stop.prevent="toggleFavorite(restaurant.id)">
            加到最愛
          </button>
        </template>
        <template>
          <button type="button" class="btn btn-danger like me-2 my-2" v-if="restaurant.isLiked"
            @click.stop.prevent="toggleLike(restaurant.id)">
            Unlike
          </button>
          <button type="button" class="btn btn-primary like me-2 my-2" v-else @click.stop.prevent="toggleLike(restaurant.id)">
            Like
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
