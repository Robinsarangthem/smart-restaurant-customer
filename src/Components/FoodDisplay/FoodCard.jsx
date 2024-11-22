import React, { useEffect, useState } from 'react'
import { useStore } from '../context'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import QuantityButton from '@/Element/QuantityButton'
import { Skeleton } from '../ui/skeleton'
import LazyLoad from 'react-lazyload'

const FoodCard = ({ product }) => {
	const { _id, image, description, name, price } = product
	const { addToCart, deleteCart, cart, removeFromCart } = useStore()
	const [isLoading, setIsLoading] = useState(true)

	// Preload image when image URL is available
	useEffect(() => {
		if (image) {
			// Create a link element for preloading the image
			const link = document.createElement('link')
			link.rel = 'preload'
			link.as = 'image'
			link.href = image
			document.head.appendChild(link)

			const img = new Image()
			img.src = image
			img.onload = () => {
				setIsLoading(false)
			}
			// Cleanup: remove the link when the component unmounts or `image` changes
			return () => {
				document.head.removeChild(link)
			}
		} else {
			setIsLoading(false) // If there's no image, stop loading
		}
		console.log(image)
	}, [image])

	const productCart = cart.find((items) => items._id === _id)

	const handleAddToCart = () => {
		addToCart(product)
		toast.success('Added to Cart')
	}

	const handleRemoveFromCart = () => {
		removeFromCart(product._id)
		toast.success('Removed from Cart')
	}

	const handleDeleteFromCart = () => {
		deleteCart(product._id)
		toast.success('Deleted from Cart')
	}
	const descriptions = product?.description || '' // Fallback to empty string if undefined
	const truncatedDescription = descriptions.substring(0, 50)

	return (
		<div className='p-1 bg-customWhite shadow-md rounded-lg'>
			<Link to={`/food/${_id}`}>
				<div className='relative aspect-w-16 aspect-h-9'>
					{isLoading ? (
						<Skeleton
							variant='rectangle'
							className='w-full h-48 rounded-[10px]'
						/>
					) : (
						<LazyLoad height={200} offset={100}>
							<img
								className='w-full h-48 object-cover rounded-sm shadow-md'
								src={image || 'https://via.placeholder.com/200'}
								alt={name}
								loading='lazy'
								width={200}
								height={200}
							/>
						</LazyLoad>
					)}
				</div>
			</Link>

			<div className='p-1 mobile:p-2 md:p-3 gap-[10px] md:gap-3 grid grid-rows-2'>
				<h2 className='text-[15px] md:text-[17px] font-medium capitalize text-orange-800 drop-shadow-md'>
					{name}
				</h2>
				<p className='text-sm md:text-base text-slate-500 h-[55px]'>
					{truncatedDescription}...
				</p>

				<div className='flex justify-between items-center gap-2 min-h-[40px] md:min-h-[50px]'>
					<span className='text-[15px] drop-shadow-md md:text-lg font-semibold text-orange-700'>
						₹ {price}
					</span>

					{/* Add or Update Cart Button */}
					{!productCart ? (
						<Button
							className='bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-md min-w-[40px] mobile:min-w-[100px]'
							onClick={handleAddToCart}
						>
							<div className='flex items-center gap-2'>
								<PlusCircle size={17} /> Add
							</div>
						</Button>
					) : (
						<QuantityButton
							item={productCart}
							onDecrease={handleRemoveFromCart}
							onIncrease={handleAddToCart}
							deleteCart={handleDeleteFromCart}
						/>
					)}
				</div>
			</div>
		</div>
	)
}

export default React.memo(FoodCard)
