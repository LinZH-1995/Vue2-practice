<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    isCurrentUser: {
      type: Boolean,
      required: true
    },
    initialIsFollowed: {
      type: Boolean,
      required: true
    }
  },

  data: function() {
    return {
      isFollowed: this.initialIsFollowed
    }
  },

  methods: {
    toggleFollowing(userId) {
      console.log('userId', userId)
      this.isFollowed = !this.isFollowed
    }
  }
}
</script>

<template>
  <div class="card mb-3">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="user.image ?? 'http://via.placeholder.com/300x300?text=No+Image'" width="300px" height="300px">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">
            {{ user.name }}
          </h5>
          <p class="card-text">
            {{ user.email }}
          </p>
          <ul class="list-unstyled">
            <li class="mb-1">
              <strong>{{ user.commentCounts }}</strong> 已評論餐廳
            </li>
            <li class="mb-1">
              <strong>{{ user.favoritedRestaurantsCounts }}</strong> 收藏的餐廳
            </li>
            <li class="mb-1">
              <strong>{{ user.followingsCounts }}</strong> followings (追蹤者)
            </li>
            <li class="mb-1">
              <strong>{{ user.followersCounts }}</strong> followers (追隨者)
            </li>
          </ul>
          <template v-if="isCurrentUser">
            <router-link :to="{ name: 'user-edit', params: { id: user.id } }" class="btn btn-primary">
              Edit
            </router-link>
          </template>
          <template v-else>
            <button v-if="isFollowed" type="button" class="btn btn-danger" @click.stop.prevent="toggleFollowing(user.id)">
              取消追蹤
            </button>
            <button v-else type="button" class="btn btn-primary" @click.stop.prevent="toggleFollowing(user.id)">
              追蹤
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
