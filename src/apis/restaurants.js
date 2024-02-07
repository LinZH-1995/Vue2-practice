import { axiosInstance } from '../utils/axios'
import { crypto } from '../utils/crypto'

const getToken = () => crypto.decrypted() // get token from localStorage and decrypt

export const restaurantsApi = {
  getRestaurants({ page, categoryId }) {
    return axiosInstance.get('/restaurants', {
      params: { page, categoryId },  // http://localhost:3000/api/restaurants?params1=xxx&params2=xxx
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  getRestaurantsFeeds() {
    return axiosInstance.get('/restaurants/feeds', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  addFavorite(restaurantId) {
    return axiosInstance.post(`/favorite/${restaurantId}`, null, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  deleteFavorite(restaurantId) {
    return axiosInstance.delete(`/favorite/${restaurantId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  addLike(restaurantId) {
    return axiosInstance.post(`/like/${restaurantId}`, null, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  deleteLike(restaurantId) {
    return axiosInstance.delete(`/like/${restaurantId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  },

  getTopRestaurants() {
    return axiosInstance.get('/restaurants/top', {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
  }
}