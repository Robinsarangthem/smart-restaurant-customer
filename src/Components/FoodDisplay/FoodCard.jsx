import React, { useEffect, useState } from 'react'
import { useStore } from '../../context'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import QuantityButton from '@/Element/QuantityButton'
import { Skeleton } from '../ui/skeleton'
import LazyLoad from 'react-lazyload'
import { AspectRatio } from '../ui/aspect-ratio'
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react'

const FoodCard = ({ product, isLoading }) => {
	const { _id, image, description, name, price, publicId } = product
	const { addToCart, deleteCart, cart, removeFromCart } = useStore()
	const [isLoaded, setIsLoaded] = useState(false)
	const cloudName = 'ddd9fh8bf'

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
	const descriptions = description || '' // Fallback to empty string if undefined
	const truncatedDescription = descriptions.substring(0, 50)
	console.log('loading', isLoaded)

	return (
		<div>
			<Link to={`/food/${_id}`}>
				<div className='relative w-full h-auto aspect-w-16 aspect-h-9'>
					{/* Show Skeleton Loader when image is still loading */}
					{!isLoaded && (
						<div className=' bg-gray-400  w-full flex items-center justify-center '>
							<Skeleton className='h-[200px] w-full' />
						</div>
					)}

					{/* Image with Lazy Loading */}
					<LazyLoad height={200} offset={100}>
						<Image
							cloudName={cloudName}
							publicId={publicId}
							alt={name}
							loading='lazy'
							onLoad={() => {
								setIsLoaded(true) // Set image loaded state
							}}
							onError={() => {
								console.error('Image failed to load')
							}}
							className={`h-full w-full object-cover transition-opacity duration-500 ${
								isLoaded ? 'opacity-100' : 'opacity-0'
							}`}
						>
							{/* Responsive Transformations */}
							<Transformation width='500' height='400' crop='scale' />
							<Transformation fetchFormat='auto' />
							<Transformation quality='auto' />
						</Image>
					</LazyLoad>
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
							className='inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-orange-600 border border-orange-700 rounded-md shadow hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400'
							onClick={() => addToCart(product)}
						>
							<div className='flex items-center gap-1 text-sm text-white'>
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
		</div>
	)
}

export default React.memo(FoodCard)
