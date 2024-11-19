import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Skeleton } from '../ui/skeleton'
import { useStore } from '../context'
import { Button } from '../ui/button'
import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import { PlusCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import QuantityButton from '@/Element/QuantityButton'
export default function FilterChabora({ product }) {
	const { addToCart, deleteCart, cart, removeFromCart } = useStore()
	const isAlreadyAddedToCart = cart.some((item) => item._id === product._id)
	const [isLoading, setIsloading] = useState(true)
	useEffect(() => {
		const img = new Image()
		img.src = product.image
		img.onload = () => {
			setIsloading(false)
		}
	}, [product.image])
	const productCart = cart.find((items) => items._id === product._id)
	return (
		<div className='p-1 bg-customWhite shadow-md rounded-lg '>
			<Link to={`/food/${product._id}`}>
				<div className='relative'>
					<img
						className='w-full h-48 object-cover rounded-lg drop-shadow-md transform-gpu 	 transition-transform duration-200'
						src={product.image || 'https://via.placeholder.com/200'}
						alt={product.name}
						loading='lazy'
						width={200}
						height={200}
					/>
				</div>
			</Link>
			<div className='p-3 mobile:p-4  md:p-3 gap-[10px] md:gap-3 grid grid-rows-2 	'>
				<h2 className='text-sm  md:text-base font-medium capitalize text-orange-800 drop-shadow-md'>
					{product.name}
				</h2>
				<p className=' hidden md:block text-xs md:text-sm text-slate-500 line-clamp-2'>
					{product.description.substring(0, 60)}...
				</p>
				<div className='flex justify-between items-center gap-3 min-h-[40px] mobile:min-h-[50px]'>
					<span className='text-[16px] mobile:md drop-shadow-md md:text-lg font-semibold text-orange-700'>
						₹ {product.price}
					</span>
					{isAlreadyAddedToCart ? (
						<QuantityButton
							item={productCart}
							onDecrease={removeFromCart}
							onIncrease={addToCart}
						/>
					) : (
						<Button
							className='bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-md text-sm mobile:text-base py-1 px-3 mobile:px-4 '
							onClick={() => {
								addToCart(product)
								toast.success('Added to Cart')
							}}
						>
							<div className='flex items-center gap-2'>
								<PlusCircle size={17} /> Add
							</div>
						</Button>
					)}
				</div>
			</div>
		</div>
		// </Carousel>
	)
}
