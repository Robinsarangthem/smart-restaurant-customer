import { Axios } from '@/utils/axiosSetup'
import { useQuery } from '@tanstack/react-query'
import { error } from 'console'
import React from 'react'
import { useLocation } from 'react-router'
import { Skeleton } from '../ui/skeleton'
import { useStore } from '../context'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { PlusCircle } from 'lucide-react'
import { Button } from '../ui/button'
import FoodCardSkeleton from '../FoodDisplay/FoodCardSkeleton'
import QuantityButton from '@/Element/QuantityButton'

const fetchSearchResults = async (foodName) => {
	try {
		const response = await Axios.get(`/api/food/find?foodName=${foodName}`)
		console.log(response.data)

		return response.data?.food
	} catch (error) {
		console.error('Error fetching search results:', error)
		throw new Error('Error fetching search results')
	}
}

export default function SearchResults() {
	const location = useLocation()
	const queryParams = new URLSearchParams(location.search)
	const { addToCart, deleteCart, cart, removeFromCart } = useStore()

	const foodName = queryParams.get('foodName')
	console.log(foodName)

	const {
		data: searchResults,
		error,
		isLoading,
	} = useQuery({
		queryKey: ['searchResults ', foodName],
		queryFn: () => fetchSearchResults(foodName),

		enabled: !!foodName,
		staleTime: 1000 * 60 * 5, // 5 minutes - data is considered fresh for 5 minutes
		cacheTime: 1000 * 60 * 10, // 10 minutes - cached data is kept for 10 minutes before it’s garbage collected
		refetchOnWindowFocus: false, // Don't refetch when the window regains focus
		retry: 1,
	})
	console.log('search Results', searchResults)
	if (error) {
		return <div>{error.message} </div>
	}
	return (
		<div className='p-2'>
			<h1 className='px-4 md:px-5 py-5 font-semibold text-lg md:text-2xl flex gap-3'>
				Search Results:
				<p className='uppercase flex gap-3 items-center text-orange-600'>
					{foodName}
					<span className='text-orange-600'>({searchResults?.length})</span>
				</p>
			</h1>
			{/* food items */}
			{isLoading ? (
				Array(4)
					.fill()
					.map((_, index) => <FoodCardSkeleton isLoading={true} key={index} />)
			) : (
				<div className='place-items-center grid grid-cols-2 mobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5 gap-4 p-2 mobile:p-5'>
					{searchResults?.map((results, idx) => {
						const isAlreadyAddedToCart = cart.some(
							(item) => item._id === results._id
						)
						const productCart = cart.find((items) => items._id === results._id)

						return (
							<div
								key={idx}
								className='p-1 bg-customWhite shadow-md rounded-lg   	'
							>
								<Link to={`/food/${results._id}`}>
									<div className='relative aspect-w-16 aspect-h-9'>
										{isLoading ? (
											<Skeleton
												variant='rectangle'
												className='w-full h-48 rounded-[10px]'
											/>
										) : (
											<img
												className='w-full h-48 object-cover rounded-sm shadow-md'
												src={results.image || 'https://via.placeholder.com/200'}
												alt={results.name}
												loading='lazy'
												width={200}
												height={200}
											/>
										)}
									</div>
								</Link>
								<div className='p-1 mobile:p-2  md:p-3 gap-[10px] md:gap-3 grid grid-rows-2 justify-between'>
									<h2 className='text-sm  md:text-[17px] font-medium capitalize text-orange-800 drop-shadow-md'>
										{results.name}
									</h2>
									<p className='text-[13px] md:text-base text-slate-500 h-[55px]  '>
										{results.description.substring(0, 60)}...
									</p>
									<div className='flex justify-between items-center gap-2 min-h-[40px] md:min-h-[70px]'>
										<span className='text-lg mobile:md drop-shadow-md md:text-lg font-semibold text-orange-700'>
											₹ {results.price}
										</span>
										{isAlreadyAddedToCart ? (
											<QuantityButton
												item={productCart}
												onDecrease={removeFromCart}
												onIncrease={addToCart}
											/>
										) : (
											<Button
												className='bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-md min-w-[40px] mobile:min-w-[100px] '
												onClick={() => {
													addToCart(results)
													toast.success('Added to Cart')
												}}
											>
												<div className='flex items-centers gap-2'>
													<PlusCircle size={17} /> Add
												</div>
											</Button>
										)}
									</div>
								</div>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}
