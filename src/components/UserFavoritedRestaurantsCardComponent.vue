<script>
export default {
  props: {
    favoritedRestaurants: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-header">
      <strong>{{ favoritedRestaurants.length }}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <router-link v-for="restaurant in favoritedRestaurants" :key="restaurant.id"
        :to="{ name: 'restaurant', params: { id: restaurant.id } }">
        <img :src="restaurant.image ?? 'http://via.placeholder.com/300x300?text=No+Image'" width="60" height="60"
          class="me-1">
      </router-link>
    </div>
  </div>
</template>
