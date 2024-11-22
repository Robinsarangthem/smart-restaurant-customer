import React, { useEffect, useState } from 'react'
import { useStore } from '../context'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import QuantityButton from '@/Element/QuantityButton'
import { Skeleton } from '../ui/skeleton'
import LazyLoad from 'react-lazyload'
import { error } from 'console'

const optimizeImage = async (
	imageUrl,
	maxWidth = 300,
	maxHeight = 300,
	quality = 0.8
) => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = imageUrl
		img.crossOrigin = 'anonymous' // To handle cross-origin images

		img.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')

			let width = img.width
			let height = img.height

			// Maintain aspect ratio
			if (width > height) {
				if (width > maxWidth) {
					height *= maxWidth / width
					width = maxWidth
				}
			} else {
				if (height > maxHeight) {
					width *= maxHeight / height
					height = maxHeight
				}
			}

			canvas.width = width
			canvas.height = height
			ctx.drawImage(img, 0, 0, width, height)

			// Convert canvas content to a compressed Data URL
			const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality)
			resolve(optimizedDataUrl)
		}

		img.onerror = () => reject('Image failed to load.')
	})
}

const FoodCard = ({ product }) => {
	const { _id, image, description, name, price } = product
	const { addToCart, deleteCart, cart, removeFromCart } = useStore()
	const [isLoading, setIsLoading] = useState(true)
	const [optimizedImage, setOptimizeImage] = useState(true)
	// Preload image when image URL is available
	useEffect(() => {
		if (image) {
			optimizeImage(image)
				.then((optimized) => {
					setOptimizeImage(optimized)
					setIsLoading(false)
				})
				.catch((err) => {
					console.error('Image optimization Failed:', err)
					setIsLoading(false)
				})
		} else {
			setIsLoading(false)
		}
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
								src={optimizedImage || 'https://via.placeholder.com/200'}
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
