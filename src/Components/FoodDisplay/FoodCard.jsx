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
	const [optimizedImage, setOptimizeImage] = useState(true)
	// Preload image when image URL is available
	useEffect(() => {
		if (image) {
			// Create a new Worker instance
			const worker = new Worker(
				new URL('../../worker/imageWorker.js', import.meta.url)
			)

			// Send message to the Worker
			worker.postMessage({
				image,
				maxWidth: 300, // Maximum width for resizing
				maxHeight: 300, // Maximum height for resizing
				quality: 0.8, // Compression quality
			})
			// Handle the response from the Worker
			worker.onmessage = ({ data }) => {
				if (data.optimizedDataUrl) {
					setOptimizeImage(data.optimizedDataUrl)
				} else if (data.error) {
					console.error('Image optimization failed:', data.error)
				}
				setIsLoading(false)
			}

			// Cleanup the Worker on component unmount
			return () => {
				worker.terminate()
			}
		}
	}, [image])
	const productCart = cart.find((items) => items._id === _id)

	const handleAddToCart = () => {
		addToCart(product)
	}

	const handleRemoveFromCart = () => {
		removeFromCart(product._id)
	}

	const handleDeleteFromCart = () => {
		deleteCart(product._id)
		toast.success('Deleted from Cart')
	}
	const descriptions = product?.description || '' // Fallback to empty string if undefined
	const truncatedDescription = descriptions.substring(0, 50)

	return (
		<>
			<Link to={`/food/${_id}`}>
				<div className='relative aspect-w-16 aspect-h-9'>
					{isLoading ? (
						<Skeleton variant='rectangle' className='w-full h-48 ' />
					) : (
						<LazyLoad height={200} offset={100}>
							<img
								className='w-full h-48 object-cover '
								src={optimizedImage || 'https://via.placeholder.com/200'}
								alt={name}
								loading='lazy'
								width={100}
								height={100}
							/>
						</LazyLoad>
					)}
				</div>
			</Link>

			<div className=' p-3 mobile:p-2 md:p-3 gap-[10px] md:gap-3 grid grid-rows-2 overflow-hidden'>
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
							className='bg-orange-500  hover:bg-orange-600 text-white rounded-md shadow-md min-w-[40px] mobile:min-w-[100px]'
							onClick={() => addToCart(product)}
						>
							<div className='flex items-center gap-1 text-sm'>
								<PlusCircle size={15} /> Add
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
		</>
	)
}

export default React.memo(FoodCard)
