import { axiosInstance } from '../utils/axios'

export const commentsApi = {
  createComment (restaurantId, text) {
    return axiosInstance.post('/comments', { restaurantId, text })
  },

  deleteComment(commentId) {
    return axiosInstance.delete(`/comments/${commentId}`)
  }
}