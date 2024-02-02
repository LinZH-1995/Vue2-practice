<script>
export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },

  data: function() {
    return {
      restaurant: this.initialRestaurant
    }
  },

  methods: {
    toggleFavorite() {
      this.restaurant.isFavorited = !this.restaurant.isFavorited
    }
  }
}
</script>

<template>
  <div class="card mb-3" style="max-width: 540px;margin: auto;">
    <div class="row g-0">
      <div class="col-md-4">
        <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
          <img class="card-img" :src="restaurant.image">
        </router-link>
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ restaurant.name }}</h5>
          <span class="badge rounded-pill text-bg-secondary mb-2">收藏數：{{ restaurant.FavoriteCount }}</span>
          <p class="card-text">
            {{ restaurant.description }}
          </p>
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }" class="btn btn-primary me-2">Show</router-link>

          <button type="button" class="btn btn-danger me-2" v-if="restaurant.isFavorited" @click.stop.prevent="toggleFavorite">
            移除最愛
          </button>
          <button type="button" class="btn btn-primary" v-else @click.stop.prevent="toggleFavorite">
            加到最愛
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
