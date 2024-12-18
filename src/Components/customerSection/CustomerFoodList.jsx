import {
	getCategoryRestaurantId,
	getFoodListByRestaurantId,
	getRestaurantBySlug,
} from '@/api/apiService'
import Category from '@/Pages/category/Category'
import FoodCard from '@/Pages/food-card/FoodCard'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router'

export default function CustomerFoodList() {
	const { restaurantSlug } = useParams()
	console.log(restaurantSlug)
	const { data, isLoading, isError } = useQuery({
		queryKey: ['restaurant', restaurantSlug],
		queryFn: () => getRestaurantBySlug(restaurantSlug),
	})
	console.log('restaurant', data)
	if (data?.restaurant) {
		localStorage.setItem('restaurantDetails', JSON.stringify(data.restaurant))
	}
	const { data: category } = useQuery({
		queryKey: ['categoryList'],
		queryFn: () => getCategoryRestaurantId(data?.restaurant?._id),
		enabled: !!data,
	})
	console.log('data', category)
	const { data: foodList } = useQuery({
		queryKey: ['foodList'],
		queryFn: () => getFoodListByRestaurantId(data?.restaurant?._id),
		enabled: !!data,
	})
	console.log('foodList', foodList)

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (isError) {
		return <div>error</div>
	}
	console.log('data', data)

	return (
		<div>
			<h2 className='text-xl font-medium p-3'>Menu</h2>
			<h2 className='px-3'>categories</h2>
			<Category restaurantId={data?.restaurant?._id} />
			<div className='  grid p-3 gap-3  grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				{foodList?.data?.map((food) => (
					<FoodCard food={food} key={food._id} />
				))}
			</div>
		</div>
	)
}
