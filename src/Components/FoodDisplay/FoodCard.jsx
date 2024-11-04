import React, { useEffect, useState } from 'react'
import { useStore } from '../context'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

const FoodCard = React.memo(({ product, isLoading }) => {
	const { _id, image, description, name, price } = product
	const { addToCart, deleteCart, cart } = useStore()
	const isAlreadyAddedToCart = cart.some((item) => item._id === _id)

	return (
		<div className='p-2 bg-customWhite shadow-md rounded-md   	'>
			<Link to={`/food/${_id}`}>
				<div className='relative'>
					{isLoading ? (
						<Skeleton className='w-full h-48 rounded-lg' />
					) : (
						<img
							className='w-full h-48 object-cover rounded-lg drop-shadow-md transform-gpu hover:scale-105 transition-transform duration-200'
							src={image || 'https://via.placeholder.com/200'}
							alt={name}
							width={200}
							height={200}
						/>
					)}
				</div>
			</Link>
			<div className='p-1 mobile:p-2  md:p-3 gap-[10px] md:gap-3 grid grid-rows-2 justify-between'>
				<h2 className='text-sm md:text-xl font-medium capitalize text-gray-800 drop-shadow-md'>
					{name}
				</h2>
				<p className='text-[13px] md:text-base text-slate-500 h-[50px]'>
					{description.substring(0, 60)}...
				</p>
				<div className='grid grid-cols-2 place-items-center gap-2 justify-items-stretch	'>
					<span className='text-sm mobile:md drop-shadow-md md:text-lg font-semibold text-customPurple'>
						₹ {price}
					</span>
					{isAlreadyAddedToCart ? (
						<Button
							onClick={() => {
								deleteCart(_id)
								toast.error('Removed from cart')
							}}
							className='bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md min-w-[50px] mobile:min-w-[100px]'
						>
							Remove
						</Button>
					) : (
						<Button
							onClick={() => {
								addToCart(product)
								toast.success('Added to cart')
							}}
							className='bg-customPurple hover:bg-customDarkblue text-white rounded-lg shadow-md min-w-[50px] mobile:min-w-[100px]'
						>
							Add Item
						</Button>
					)}
				</div>
			</div>
		</div>
	)
})

export default FoodCard
