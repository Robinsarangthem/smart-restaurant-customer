import React from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from '../ui/skeleton'
import { useStore } from '../context'
import { Button } from '../ui/button'

export default function FilterChabora({ product, isLoading }) {
	const { addToCart, deleteCart, cart } = useStore()
	const isAlreadyAddedToCart = cart.some((item) => item._id === product._id)

	return (
		<div className='p-2 bg-customWhite shadow-md rounded-md   	'>
			<Link to={`/food/${product._id}`}>
				<div className='relative'>
					{isLoading ? (
						<Skeleton className='w-full h-48 rounded-lg' />
					) : (
						<img
							className='w-full h-48 object-cover rounded-lg drop-shadow-md transform-gpu hover:scale-105 transition-transform duration-200'
							src={product.image || 'https://via.placeholder.com/200'}
							alt={product.name}
							width={200}
							height={200}
						/>
					)}
				</div>
			</Link>
			<div className='p-2 mobile:p-2  md:p-3 gap-[10px] md:gap-3 grid grid-rows-2 justify-between'>
				<h2 className='text-sm pt-1 md:text-xl font-medium capitalize text-gray-800 drop-shadow-md'>
					{product.name}
				</h2>
				<p className='text-[13px] md:text-base text-slate-500 h-[55px] pb-[20px]'>
					{product.description.substring(0, 60)}...
				</p>
				<div className='grid grid-cols-2 place-items-center gap-2 justify-items-stretch	'>
					<span className='text-sm mobile:md drop-shadow-md md:text-lg font-semibold text-customPurple'>
						₹ {product.price}
					</span>
					{isAlreadyAddedToCart ? (
						<Button
							onClick={() => {
								deleteCart(product._id)
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
}
