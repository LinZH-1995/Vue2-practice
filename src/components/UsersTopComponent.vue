<script>
export default {
  props: {
    initUser: {
      type: Object,
      required: true
    }
  },

  data: function () {
    return {
      user: this.initUser
    }
  },

  methods: {
    toggleFollow() {
      this.user.isFollowed = !this.user.isFollowed
    }
  }
}
</script>

<template>
  <div class="col-3">
    <a href="#">
      <img :src="user.image ?? 'http://via.placeholder.com/300x300?text=No+Image'" width="140px" height="140px">
    </a>
    <h2>{{ user.name }}</h2>
    <span class="badge rounded-pill text-bg-secondary">追蹤人數：{{  user.FollowerCount }}</span>
    <p class="mt-3">
      <button type="button" class="btn btn-danger mx-2" v-if="user.isFollowed" @click.stop.prevent="toggleFollow">
        取消追蹤
      </button>
      <button type="button" class="btn btn-primary" v-else @click.stop.prevent="toggleFollow">
        追蹤
      </button>
    </p>
  </div>
</template>
