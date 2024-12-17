import { Axios } from '@/utils/axiosSetup'

export const getRestaurantBySlug = async (slug) => {
	const response = await Axios.get(`/api/restaurant/getBySlug/${slug}`)
	console.log('response', response)
	return response.data
}

export const getCategoryRestaurantId = async (restaurantId) => {
	const response = await Axios.get(`/api/category/list/${restaurantId}`)
	return response.data
}
export const getFoodListByRestaurantId = async (restaurantId) => {
	const response = await Axios.get(`/api/food/FoodList/${restaurantId}`)
	console.log(response)
	return response.data
}
