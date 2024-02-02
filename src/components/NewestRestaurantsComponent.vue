<script>
import { dateFromNowFilter } from '../utils/mixins'

export default {
  mixins: [dateFromNowFilter],

  props: {
    restaurants: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      最新餐廳
    </div>

    <div class="card-body">
      <div v-for="restaurant in restaurants" :key="restaurant.id">
        <h4 class="mb-3">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }" class="me-2">{{ restaurant.name }}</router-link>
          <small>{{ restaurant.Category?.name ?? '未分類' }}</small>
        </h4>
        <p>{{ restaurant.description }}</p>
        {{ restaurant.createdAt | dateFromNow }}
        <hr>
      </div>
    </div>
  </div>
</template>

<style scoped>
small {
  font-size: 14px;
}
</style>
