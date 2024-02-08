<script>
import { dateFromNowFilter } from '../utils/mixins'
import { useUserStore } from '../stores/user'
import { commentsApi } from '../apis/comments'
import { Toast } from '../utils/sweetalert'

export default {
  mixins: [dateFromNowFilter],

  setup() {
    const userStore = useUserStore()
    return { userStore }
  },

  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },

  methods: {
    async handleDeleteButtonClick(commentId) {
      try {
        const response = await commentsApi.deleteComment(commentId)
        if (response.data.status !== 'success') throw new Error(response.data.message)

        // if delete comment success , tell parent component refresh data
        this.$emit('after-delete-comment', commentId)

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法新增評論，請稍後再試!' })
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <div>
    <h2 class="my-4 fw-medium">
      所有評論：
    </h2>

    <div v-for="comment in restaurantComments" :key="comment.id">
      <figure>
        <blockquote class="blockquote d-flex justify-content-between">
          <div>
            <h3>
              <router-link :to="{ name: 'user', params: { id: comment.UserId } }">
                {{ comment.User.name }}
              </router-link>
            </h3>
            <p>{{ comment.text }}</p>
          </div>
          <div>
            <button type="button" class="btn btn-danger float-right mb-2" v-if="userStore.currentUser.isAdmin"
              @click.stop.prevent="handleDeleteButtonClick(comment.id)">
              Delete
            </button>
          </div>
        </blockquote>
        <figcaption class="blockquote-footer">
          {{ comment.createdAt | dateFromNow }}
        </figcaption>
      </figure>
      <hr>
    </div>
  </div>
</template>
