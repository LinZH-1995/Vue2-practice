<script>
import { usersApi } from '../apis/users'
import { Toast } from '../utils/sweetalert'

export default {
  props: {
    initialUser: {
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

  data: function () {
    return {
      isFollowed: this.initialIsFollowed,
      user: this.initialUser
    }
  },

  methods: {
    async toggleFollow(userId) {
      try {
        // if isFollowed = true , call detele
        if (this.isFollowed) {
          const response = await usersApi.deleteFollowing(userId)
          if (response.data.status !== 'success') {
            return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
          }
          this.isFollowed = !this.isFollowed
          this.user.followersCounts -= 1
          return
        }

        // if isFollowed = false , call add
        const response = await usersApi.addFollowing(userId)
        if (response.data.status !== 'success') {
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }
        this.isFollowed = !this.isFollowed
        this.user.followersCounts += 1

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法加入/刪除追蹤，請稍後再試!' })
        console.error(error)
      }
    }
  },

  watch: {
    initialIsFollowed(newData) {
      this.isFollowed = newData
    },

    initialUser(newData) {
      this.user = newData
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
            <button v-if="isFollowed" type="button" class="btn btn-danger" @click.stop.prevent="toggleFollow(user.id)">
              取消追蹤
            </button>
            <button v-else type="button" class="btn btn-primary" @click.stop.prevent="toggleFollow(user.id)">
              追蹤
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
