<script>
import { usersApi } from '../apis/users'
import { Toast } from '../utils/sweetalert'
import { useUserStore } from '../stores/user'

export default {
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },

  props: {
    initUser: {
      type: Object,
      required: true
    }
  },

  data: function () {
    return {
      user: this.initUser,
      isProcessingFollow: false
    }
  },

  methods: {
    async toggleFollow(userId) {
      try {
        // start processing
        this.isProcessingFollow = true

        // if isFollowed = true , call detele
        if (this.user.isFollowed) {
          const response = await usersApi.deleteFollowing(userId)
          if (response.data.status !== 'success') {
            this.isProcessingFollow = false // stop processing
            return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
          }
          this.user.isFollowed = !this.user.isFollowed
          this.user.FollowerCount -= 1
          this.isProcessingFollow = false // stop processing
          return
        }

        // if isFollowed = false , call add
        const response = await usersApi.addFollowing(userId)
        if (response.data.status !== 'success') {
          this.isProcessingFollow = false // stop processing
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }
        this.user.isFollowed = !this.user.isFollowed
        this.user.FollowerCount += 1
        this.isProcessingFollow = false // stop processing

      } catch (error) {
        this.isProcessingFollow = false // stop processing
        Toast.fire({ icon: 'error', titleText: '無法加入/刪除追蹤，請稍後再試!' })
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <div class="col-3 mb-3">
    <router-link :to="{ name: 'user', params: { id: user.id } }">
      <img :src="user.image ?? 'http://via.placeholder.com/300x300?text=No+Image'" width="140px" height="140px">
    </router-link>
    <h2>{{ user.name }}</h2>
    <span class="badge rounded-pill text-bg-secondary">追蹤人數：{{ user.FollowerCount }}</span>
    <p class="mt-3">
      <template v-if="userStore.currentUser.id !== user.id">
        <button type="submit" class="btn btn-primary" v-if="isProcessingFollow" disabled>處理中...</button>
        <template v-else>
          <button type="button" class="btn btn-danger mx-2" v-if="user.isFollowed"
            @click.stop.prevent="toggleFollow(user.id)">
            取消追蹤
          </button>
          <button type="button" class="btn btn-primary" v-else @click.stop.prevent="toggleFollow(user.id)">
            追蹤
          </button>
        </template>
      </template>
    </p>
  </div>
</template>
