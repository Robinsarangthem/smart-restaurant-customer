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
			<div className='p-1 mobile:p-2 md:p-3 grid grid-rows-2 justify-between '>
				{/* name and description  */}
				{/* <div className='flex flex-col '> */}
				<h2 className='text-lg md:text-xl  font-medium capitalzize  text-gray-800 drop-shadow-md '>
					{name}
				</h2>
				<p className='text-[13px] md:text-base text-slate-500 h-[60px] '>
					{description.substring(0, 60)}...
				</p>
				{/* </div> */}
				{/* end */}
				{/* price and add items */}
				<div className='grid grid-cols-2 	place-items-center gap-2 md:justify-items-start '>
					{/* Minimum width for the price tag */}
					{/* <p className='text-sm mobile:md md:text-lg font-semibold text-red-500 '> */}

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
							className='bg-customPurple hover:bg-customDarkblue text-white  rounded-lg shadow-md min-w-[50px] mobile:min-w-[100px]'
						>
							Add Item
						</Button>
					)}
					<span className='text-sm mobile:md drop-shadow-md md:text-lg font-semibold text-customPurple'>
						₹ {price}
					</span>
				</div>
			</div>
		</div>
	)
}

export default FoodCard
