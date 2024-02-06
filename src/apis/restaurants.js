import { axiosInstance } from '../utils/axios'
import { crypto } from '../utils/crypto'

const getToken = () => crypto.decrypted() // get token from localStorage and decrypt
const headers = { 'Authorization': `Bearer ${getToken()}` }

export const restaurantsApi = {
  getRestaurants({ page, categoryId }) {
    return axiosInstance.get('/restaurants', {
      params: { page, categoryId },  // http://localhost:3000/api/restaurants?params1=xxx&params2=xxx
      headers
    })
  },

  getRestaurantsFeeds() {
    return axiosInstance.get('/restaurants/feeds', { headers })
  },

  addFavorite(restaurantId) {
    return axiosInstance.post(`/favorite/${restaurantId}`, null, { headers })
  },

  deleteFavorite(restaurantId) {
    return axiosInstance.delete(`/favorite/${restaurantId}`, { headers })
  },

  addLike(restaurantId) {
    return axiosInstance.post(`/like/${restaurantId}`, null, { headers })
  },

  deleteLike(restaurantId) {
    return axiosInstance.delete(`/like/${restaurantId}`, { headers })
  }
}