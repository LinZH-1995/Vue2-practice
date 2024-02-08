<script>
import { commentsApi } from '../apis/comments'
import { Toast } from '../utils/sweetalert'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },

  data: function () {
    return {
      text: ''
    }
  },

  methods: {
    async handleSubmit() {
      try {
        // check whether text is empty
        const restaurantId = this.restaurantId
        const text = this.text.trim()
        if (text === '') return Toast.fire({ icon: 'warning', titleText: '評論不可為空!' })

        const response = await commentsApi.createComment(restaurantId, text)
        if (response.data.status !== 'success') {
          return Toast.fire({ icon: 'error', titleText: response.data.message || 'something wrong' })
        }

        // if create comment success , tell parent component refresh data
        this.$emit('after-create-comment', {
          commentId: response.data.commentId,
          restaurantId,
          text
        })

        this.text = '' // 將表單內的資料清空

      } catch (error) {
        Toast.fire({ icon: 'error', titleText: '無法新增評論，請稍後再試!' })
        console.error(error)
      }
    }
  }
}
</script>

<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text" class="mb-1">留下評論：</label>
      <textarea class="form-control" rows="3" name="text" v-model="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">回上一頁</button>
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<style scoped>
.form-group {
  margin: 21px 0 8px;
}
</style>
