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
      restaurant: this.initialRestaurant,
      isProcessingFavorite: false,
      isProcessingLike: false
    }
  },

  methods: {
    async toggleFavorite(restaurantId) {
      try {
        // start processing
        this.isProcessingFavorite = true

        // if isFavorited = true , call detele
        if (this.restaurant.isFavorited) {
          const response = await restaurantsApi.deleteFavorite(restaurantId)
          if (response.data.status !== 'success') {
            this.isProcessingFavorite = false // stop processing
            return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
          }

          this.restaurant.isFavorited = !this.restaurant.isFavorited
          this.isProcessingFavorite = false // stop processing
          return
        }

        // if isFavorited = false , call add
        const response = await restaurantsApi.addFavorite(restaurantId)
        if (response.data.status !== 'success') {
          this.isProcessingFavorite = false // stop processing
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }

        this.restaurant.isFavorited = !this.restaurant.isFavorited
        this.isProcessingFavorite = false // stop processing

      } catch (error) {
        this.isProcessingFavorite = false // stop processing
        Toast.fire({ icon: 'error', titleText: '無法將餐廳加入/刪除最愛，請稍後再試!' })
        console.error(error)
      }
    },

    async toggleLike(restaurantId) {
      try {
        // start processing
        this.isProcessingLike = true

        // if isFavorited = true , call detele
        if (this.restaurant.isLiked) {
          const response = await restaurantsApi.deleteLike(restaurantId)
          if (response.data.status !== 'success') {
            this.isProcessingLike = false // stop processing
            return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
          }

          this.restaurant.isLiked = !this.restaurant.isLiked
          this.isProcessingLike = false // stop processing
          return
        }

        // if isFavorited = false , call add
        const response = await restaurantsApi.addLike(restaurantId)
        if (response.data.status !== 'success') {
          this.isProcessingLike = false // stop processing
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }
        
        this.restaurant.isLiked = !this.restaurant.isLiked
        this.isProcessingLike = false // stop processing

      } catch (error) {
        this.isProcessingLike = false // stop processing
        Toast.fire({ icon: 'error', titleText: '無法將餐廳加入/刪除喜歡，請稍後再試!' })
        console.error(error)
      }
    }
  },

  watch: {
    initialRestaurant(newData) {
      this.restaurant = { ...this.restaurant, ...newData }
    }
  }
}
</script>

<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1 class="fw-bolder">{{ restaurant.name }}</h1>
      <p class="badge rounded-pill text-bg-secondary my-1">
        {{ restaurant.Category.name }}
      </p>
    </div>
    <div class="col-lg-4">
      <img class="img-responsive center-block" :src="restaurant.image" style="width: 250px;margin-bottom: 25px;">
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li class="mb-1">
            <strong>Opening Hour:</strong>
            {{ restaurant.opening_hours }}
          </li>
          <li class="mb-1">
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li class="mb-1">
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <router-link class="btn btn-primary btn-border me-2"
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }">Dashboard</router-link>

      <button type="submit" class="btn btn-primary" v-if="isProcessingFavorite" disabled>處理中...</button>
      <template v-else>
        <button type="button" class="btn btn-danger btn-border me-2" v-if="restaurant.isFavorited"
          @click.stop.prevent="toggleFavorite(restaurant.id)">
          移除最愛
        </button>
        <button type="button" class="btn btn-primary btn-border me-2" v-else
          @click.stop.prevent="toggleFavorite(restaurant.id)">
          加到最愛
        </button>
      </template>

      <button type="submit" class="btn btn-primary" v-if="isProcessingLike" disabled>處理中...</button>
      <template v-else>
        <button type="button" class="btn btn-danger like me-2" v-if="restaurant.isLiked" @click.stop.prevent="toggleLike(restaurant.id)">
          Unlike
        </button>
        <button type="button" class="btn btn-primary like me-2" v-else @click.stop.prevent="toggleLike(restaurant.id)">
          Like
        </button>
      </template>

      <p class="mt-3">{{ restaurant.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>
