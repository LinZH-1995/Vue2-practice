<script>
import moment from 'moment'

export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },

  filters: {
    dateFromNow(datetime) {
      if (!datetime) {
        return '--'
      }
      return moment(datetime).fromNow()
    }
  }
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      最新評論
    </div>

    <div class="card-body">
      <div v-for="comment in comments" :key="comment.id">
        <h4 class="mb-3">
          <a href="#">{{ comment.Restaurant.name }}</a>
        </h4>
        <p>{{ comment.text }}</p>
        by <a href="#">{{ comment.User.name }}</a> at {{ comment.createdAt | dateFromNow }}
        <hr>
      </div>
    </div>
  </div>
</template>
