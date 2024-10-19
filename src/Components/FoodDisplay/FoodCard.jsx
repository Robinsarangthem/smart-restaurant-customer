import { useState } from 'react'
import { useStore } from '../context'
import { baseURL } from '../../utils/axiosSetup'
import { Link } from 'react-router-dom'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Cart from '@/Pages/cart/Cart'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'

function FoodCard({ product }) {
	const { _id, image, description, name, price, quantity } = product
	const { addToCart, deleteCart, cart } = useStore()
	const isAlreadyAddedToCart = cart.some((item) => item._id === _id)
	return (
		<div className=' p-2 '>
			<Link to={`/food/${_id}`}>
				<div className='relative'>
					<img
						className=' w-full h-48  object-cover rounded-lg drop-shadow-md'
						// src={`${baseURL}${image}`}
						src={image}
						alt={name}
						width={200}
						height={200}
					/>
				</div>
			</Link>
			{/* in card details name and description */}
			<div className='p-1 mobile:p-2 md:p-3 flex flex-col justify-between '>
				<div className='flex flex-col '>
					<h2 className='text-lg md:text-xl font-semibold capitalize  text-gray-800 drop-shadow-md min-w-[140px] min-h-[50px]'>
						{name}
					</h2>
					<p className='text-[13px] md:text-base text-slate-500 h-20 '>
						{description.substring(0, 60)}...
					</p>
				</div>
				{/* price and add items */}
				<div className='flex flex-row  items-center justify-between mt-4 '>
					{/* Minimum width for the price tag */}
					<p className='text-sm mobile:md md:text-lg font-semibold text-red-500 '>
						₹ <span>{price}</span>
					</p>

					{/* Minimum width for the button */}
					{isAlreadyAddedToCart ? (
						<Button
							onClick={() => {
								deleteCart(_id)
								toast.error('Removed from cart')
							}}
							className='bg-red-600 hover:bg-red-700 text-white  rounded-md shadow-md min-w-[50px] mobile:min-w-[100px]'
						>
							Remove
						</Button>
					) : (
						<Button
							onClick={() => {
								addToCart(product)
								toast.success('Added to cart')
							}}
							type='button'
							className='bg-blue-500 hover:bg-blue-600 text-white  rounded-md shadow-md min-w-[50px] mobile:min-w-[100px]'
						>
							Add Item
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}

export default FoodCard
