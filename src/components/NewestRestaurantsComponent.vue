<script>
import moment from 'moment'

export default {
  props: {
    restaurants: {
      type: Array,
      required: true
    }
  },

  filters: {
    dateFromNow(datetime) {
      if (!datetime) {
        return '--'
      }
       return moment(datetime).fromNow()
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
          <router-link to="#" class="me-2">{{ restaurant.name }}</router-link>
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
