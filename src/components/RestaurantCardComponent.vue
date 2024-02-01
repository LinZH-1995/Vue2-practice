<script>
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
    toggleFavorite() {
      this.restaurant.isFavorited = !this.restaurant.isFavorited
    },
    toggleLike() {
      this.restaurant.isLiked = !this.restaurant.isLiked
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
          <router-link to="#">{{ restaurant.name }}</router-link>
        </p>
        <span class="badge rounded-pill text-bg-secondary mb-2">{{ restaurant.Category.name }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <template>
          <button type="button" class="btn btn-danger btn-border favorite me-2 my-2" v-if="restaurant.isFavorited"
            @click.stop.prevent="toggleFavorite">
            移除最愛
          </button>
          <button type="button" class="btn btn-primary btn-border favorite me-2 my-2" v-else
            @click.stop.prevent="toggleFavorite">
            加到最愛
          </button>
        </template>
        <template>
          <button type="button" class="btn btn-danger like me-2 my-2" v-if="restaurant.isLiked"
            @click.stop.prevent="toggleLike">
            Unlike
          </button>
          <button type="button" class="btn btn-primary like me-2 my-2" v-else @click.stop.prevent="toggleLike">
            Like
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
