<script>
export default {
  props: {
    followings: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-header">
      <strong>{{ followings.length }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <h4 v-if="followings.length === 0">暫無資料</h4>
      <router-link v-for="following in followings" :key="following.id"
        :to="{ name: 'user', params: { id: following.id } }">
        <img :src="following.image ?? 'http://via.placeholder.com/300x300?text=No+Image'" width="60" height="60" class="me-1">
      </router-link>
    </div>
  </div>
</template>
