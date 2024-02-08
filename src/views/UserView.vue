<script>
import UserProfileCardComponent from '../components/UserProfileCardComponent.vue'
import UserFollowingsCardComponent from '../components/UserFollowingsCardComponent.vue'
import UserFollowersCardComponent from '../components/UserFollowersCardComponent.vue'
import UserCommentsCardComponent from '../components/UserCommentsCardComponent.vue'
import UserFavoritedRestaurantsCardComponent from '../components/UserFavoritedRestaurantsCardComponent.vue'
import { usersApi } from '../apis/users'
import { Toast } from '../utils/sweetalert'
import { useUserStore } from '../stores/user'

export default {
  components: {
    UserProfileCardComponent,
    UserFollowingsCardComponent,
    UserFollowersCardComponent,
    UserCommentsCardComponent,
    UserFavoritedRestaurantsCardComponent
  },

  setup() {
    const userStore = useUserStore()
    return { userStore }
  },

  data: function () {
    return {
      user: {},
      isFollowed: false
    }
  },

  methods: {
    async fetchUser(userId) {
      try {
        const response = await usersApi.getUser(userId)
        const profile = response.data.profile

        this.isFollowed = response.data.isFollowed
        this.user = {
          ...profile,
          commentCounts: profile.Comments?.length,
          favoritedRestaurantsCounts: profile.FavoritedRestaurants?.length,
          followersCounts: profile.Followers?.length,
          followingsCounts: profile.Followings?.length
        }

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法取得使用者資料，請稍後再試!' })
        console.error(error)
      }
    }
  },

  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
  },

  beforeRouteUpdate(to, from, next) {
    const userId = to.params.id
    this.fetchUser(userId)
    next()
  }
}
</script>

<template>
  <div class="container py-5">
    <UserProfileCardComponent :initial-user="user" :is-current-user="userStore.currentUser.id === user.id"
      :initial-is-followed="isFollowed" />
    <div class="row">
      <div class="col-md-4">
        <UserFollowingsCardComponent :followings="user.Followings || []" />
        <UserFollowersCardComponent :followers="user.Followers || []" />
      </div>
      <div class="col-md-8">
        <UserCommentsCardComponent :comments="user.Comments || []" />
        <UserFavoritedRestaurantsCardComponent :favorited-restaurants="user.FavoritedRestaurants || []" />
      </div>
    </div>
  </div>
</template>
