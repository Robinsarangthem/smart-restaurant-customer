import React, { useEffect, useState } from 'react'
import { useStore } from '../context'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../ui/button'
import { PlusCircle } from 'lucide-react'
import QuantityButton from '@/Element/QuantityButton'
import { Skeleton } from '../ui/skeleton'

const FoodCard = ({ product }) => {
	const { _id, image, description, name, price } = product
	const { addToCart, deleteCart, cart, removeFromCart } = useStore()
	const isAlreadyAddedToCart = cart.some((item) => item._id === _id)
	const [isLoading, setIsloading] = useState(true)
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
				setIsloading(false)
			}
			// Cleanup: remove the link when the component unmounts or `image` changes
			return () => {
				document.head.removeChild(link)
			}
		}
	}, [image])
	const productCart = cart.find((items) => items._id === _id)
	return (
		<div className='p-1 bg-customWhite shadow-md rounded-lg   	'>
			<Link to={`/food/${_id}`}>
				<div className='relative aspect-w-16 aspect-h-9'>
					{isLoading ? (
						<Skeleton
							variant='rectangle'
							className='w-full h-48 rounded-[10px]'
						/>
					) : (
						<img
							className='w-full h-48 object-cover rounded-sm shadow-md'
							src={image || 'https://via.placeholder.com/200'}
							alt={name}
							loading='lazy'
							width={200}
							height={200}
						/>
					)}
				</div>
			</Link>
			<div className='p-1 mobile:p-2  md:p-3 gap-[10px] md:gap-3 grid grid-rows-2 '>
				<h2 className='text-[15px]  md:text-[17px] font-medium capitalize text-orange-800 drop-shadow-md'>
					{name}
				</h2>
				<p className='text-sm md:text-base text-slate-500 h-[55px]  '>
					{description.substring(0, 60)}...
				</p>
				<div className='flex justify-between items-center gap-2	min-h-[40px] md:min-h-[50px] '>
					<span className='text-[15px]  drop-shadow-md md:text-lg font-semibold text-orange-700'>
						₹ {price}
					</span>
					{!productCart ? (
						<Button
							className='bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-md min-w-[40px] mobile:min-w-[100px] '
							onClick={() => {
								addToCart(product)
								toast.success('Added to Cart')
							}}
						>
							<div className='flex items-centers gap-2'>
								<PlusCircle size={17} /> Add
							</div>
						</Button>
					) : (
						<QuantityButton
							item={productCart}
							onDecrease={removeFromCart}
							onIncrease={addToCart}
							deleteCart={deleteCart}
						/>
					)}
					{/* <Button
						onClick={() => {
							if (isAlreadyAddedToCart) {
								return <QuantityButton />
							} else {
								addToCart(product)
								toast.success('Added to cart')
							}
						}}
						className={`${
							isAlreadyAddedToCart
								? 'bg-red-600 hover:bg-red-700'
								: 'bg-orange-500 hover:bg-orange-600'
						} text-white rounded-md shadow-md min-w-[40px] mobile:min-w-[100px] `}
					>
						{isAlreadyAddedToCart ? (
							'Remove'
						) : (
							<div className='flex items-centers gap-2'>
								<PlusCircle size={17} /> Add
							</div>
						)}
					</Button> */}
				</div>
			</div>
		</div>
	)
}

export default React.memo(FoodCard)
