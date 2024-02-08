import { axiosInstance } from '../utils/axios'

export const restaurantsApi = {
  getRestaurants({ page, categoryId }) {
    return axiosInstance.get('/restaurants', {
      params: { page, categoryId },  // http://localhost:3000/api/restaurants?params1=xxx&params2=xxx
    })
  },

  getRestaurant (restaurantId) {
    return axiosInstance.get(`/restaurants/${restaurantId}`)
  },

  getRestaurantsFeeds() {
    return axiosInstance.get('/restaurants/feeds')
  },

  addFavorite(restaurantId) {
    return axiosInstance.post(`/favorite/${restaurantId}`, null)
  },

  deleteFavorite(restaurantId) {
    return axiosInstance.delete(`/favorite/${restaurantId}`)
  },

  addLike(restaurantId) {
    return axiosInstance.post(`/like/${restaurantId}`, null)
  },

  deleteLike(restaurantId) {
    return axiosInstance.delete(`/like/${restaurantId}`)
  },

  getTopRestaurants() {
    return axiosInstance.get('/restaurants/top')
  }
}