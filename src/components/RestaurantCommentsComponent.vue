<script>
import { dateFromNowFilter } from '../utils/mixins'

const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  mixins: [dateFromNowFilter],

  props: {
    restaurantComments: {
      type: Array,
      required: true
    }
  },

  data: function() {
    return {
      currentUser: dummyUser.currentUser
    }
  },

   methods: {
    handleDeleteButtonClick(commentId) {
      console.log('handleDeleteButtonClick', commentId)
      // TODO: 請求 API 伺服器刪除 id 為 commentId 的評論
      // 觸發父層事件 - $emit( '事件名稱' , 傳遞的資料 )
      this.$emit('after-delete-comment', commentId)
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
              <router-link to="#">
                {{ comment.User.name }}
              </router-link>
            </h3>
            <p>{{ comment.text }}</p>
          </div>
          <div>
            <button type="button" class="btn btn-danger float-right mb-2" v-if="currentUser.isAdmin" @click.stop.prevent="handleDeleteButtonClick(comment.id)" v-o>
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
