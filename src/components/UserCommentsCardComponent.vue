<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-header">
      <strong>{{ comments.length }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <h4 v-if="comments.length === 0">暫無資料</h4>
      <router-link v-for="comment in comments" :key="comment.id"
        :to="{ name: 'restaurant', params: { id: comment.RestaurantId } }">
        <img :src="comment.Restaurant.image ?? 'http://via.placeholder.com/300x300?text=No+Image'" width="60" height="60"
          class="me-1 mb-1">
      </router-link>
    </div>
  </div>
</template>
