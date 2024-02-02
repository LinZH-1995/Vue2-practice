<script>
import { dateFromNowFilter } from '../utils/mixins'

export default {
  mixins:[dateFromNowFilter],

  props: {
    comments: {
      type: Array,
      required: true
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
          <router-link :to="{ name: 'restaurant', params: { id: comment.Restaurant.id } }">{{ comment.Restaurant.name }}</router-link>
        </h4>
        <p>{{ comment.text }}</p>
        by <router-link :to="{ name: 'user', params: { id: comment.UserId } }">{{ comment.User.name }}</router-link> at {{ comment.createdAt | dateFromNow }}
        <hr>
      </div>
    </div>
  </div>
</template>
