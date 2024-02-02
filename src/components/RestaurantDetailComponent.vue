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
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1 class="fw-bolder">{{ restaurant.name }}</h1>
      <p class="badge rounded-pill text-bg-secondary my-1">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img class="img-responsive center-block" :src="restaurant.image" style="width: 250px;margin-bottom: 25px;">
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li class="mb-1">
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
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
      <router-link class="btn btn-primary btn-border me-2" to="#">Dashboard</router-link>

      <template>
        <button type="button" class="btn btn-danger btn-border me-2" v-if="restaurant.isFavorited" @click.stop.prevent="toggleFavorite">
          移除最愛
        </button>
        <button type="button" class="btn btn-primary btn-border me-2" v-else @click.stop.prevent="toggleFavorite">
          加到最愛
        </button>
      </template>

      <template>
        <button type="button" class="btn btn-danger like me-2" v-if="restaurant.isLiked" @click.stop.prevent="toggleLike">
          Unlike
        </button>
        <button type="button" class="btn btn-primary like me-2" v-else @click.stop.prevent="toggleLike">
          Like
        </button>
      </template>

      <p class="mt-3">{{ restaurant.description }}</p>
    </div>
  </div>
</template>
