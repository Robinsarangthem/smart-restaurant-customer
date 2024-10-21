import React, { useEffect } from 'react'
import { useStore } from '../../../Components/context'
import { baseURL } from '../../../utils/axiosSetup'
import { Trash2 } from 'lucide-react'

const CartPage = ({ item }) => {
	const { addToCart, removeFromCart, deleteCart } = useStore()

	return (
		<div className='flex  items-center space-x-4 py-2 border-b bg-customWhite px-1 rounded-md shadow-md '>
			<img
				src={item.image}
				alt={item.name}
				className='w-16 h-16 object-cover rounded'
			/>
			<div className='flex-grow'>
				<h3 className='font-semibold'>{item.name}</h3>
				<p className='text-gray-600'>₹ {item.price}</p>
			</div>
			<div className='flex items-center space-x-2'>
				<button
					onClick={() => removeFromCart(item._id)}
					className='px-2 py-1 bg-gray-200 rounded'
				>
					-
				</button>
				<span>{item.quantity}</span>
				<button
					onClick={() => addToCart(item)}
					className='px-2 py-1 bg-gray-200 rounded'
				>
					+
				</button>
			</div>
			<button onClick={() => deleteCart(item._id)} className='text-red-500'>
				<Trash2 size={20} />
			</button>
		</div>
	)
}

export default CartPage
