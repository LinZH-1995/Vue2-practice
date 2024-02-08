import { axiosInstance } from '../utils/axios'

export const usersApi = {
  signIn({ email, password }) {
    return axiosInstance.post('/signin', { email, password })
  },

  signUp(data) {
    return axiosInstance.post('/signup', data)
  },

  getCurrentUser() {
    return axiosInstance.get('/get_current_user')
  },

  getUser(userId) {
    return axiosInstance.get(`/users/${userId}`)
  },

  putUser(userId, formData) {
    return axiosInstance.put(`/users/${userId}`, formData)
  },

  getTopUsers() {
    return axiosInstance.get('/users/top')
  },

  addFollowing(userId) {
    return axiosInstance.post(`/following/${userId}`, null)
  },

  deleteFollowing(userId) {
    return axiosInstance.delete(`/following/${userId}`)
  }
}