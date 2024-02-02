<script>
export default {
  props: {
    followers: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <div class="card mb-3">
    <div class="card-header">
      <strong>{{ followers.length }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link v-for="follower in followers" :key="follower.id"
        :to="{ name: 'user', params: { id: follower.id } }">
        <img :src="follower.image ?? 'http://via.placeholder.com/300x300?text=No+Image'" width="60" height="60" class="me-1">
      </router-link>
    </div>
  </div>
</template>
