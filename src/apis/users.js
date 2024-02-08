import { axiosInstance } from '../utils/axios'
import { crypto } from '../utils/crypto'

const getToken = () => crypto.decrypted() // get token from localStorage and decrypt

export const usersApi = {
  signIn({ email, password }) {
    return axiosInstance.post('/signin', { email, password })
  },

  signUp(data) {
    return axiosInstance.post('/signup', data)
  },

  getCurrentUser() {
    return axiosInstance.get('/get_current_user', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  getUser(userId) {
    return axiosInstance.get(`/users/${userId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  getTopUsers() {
    return axiosInstance.get('/users/top', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  addFollowing(userId) {
    return axiosInstance.post(`/following/${userId}`, null, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  deleteFollowing(userId) {
    return axiosInstance.delete(`/following/${userId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  }
}