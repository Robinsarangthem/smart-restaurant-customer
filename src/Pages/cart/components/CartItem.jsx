import QuantityButton from '@/Element/QuantityButton'
import { Trash2 } from 'lucide-react'
import React from 'react'

const CartItem = ({ item, onIncrease, onDecrease, onRemove, deleteCart }) => {
	return (
		<div className='p-1 border-b'>
			<div className='flex items-center gap-4'>
				{/* Product Image */}
				<div className='w-20 h-20 min-w-20 rounded-lg overflow-hidden bg-gray-100'>
					<img
						src={item.image}
						alt={item.name}
						className='w-full h-full object-cover shadow-md'
					/>
				</div>

				{/* Product Name and Price */}
				<div className='flex-grow'>
					<h3 className='text-sm md:text-lg font-medium text-gray-900'>
						{item.name}
					</h3>
					<p className=' text-sm text-gray-600 mt-1'>₹{item.price}</p>
				</div>

				{/* Quantity Controls and Delete Button */}
				{/* <QuantityButton
					onDecrease={onDecrease}
					onIncrease={onIncrease}
					deleteCart={deleteCart}
					item={item}
				/> */}
				<div className='flex items-center gap-4'>
					<div className='flex items-center border rounded-lg'>
						<button
							onClick={() => onDecrease(item._id)}
							className='px-3 py-1 hover:bg-gray-50'
						>
							-
						</button>
						<span className='px-4 py-1 border-x'>{item.quantity}</span>
						<button
							onClick={() => onIncrease(item)}
							className='px-3 py-1 hover:bg-gray-50'
						>
							+
						</button>
					</div>
					<button
						onClick={() => deleteCart(item._id)}
						className='text-red-500 hover:text-red-600 p-1'
					>
						<Trash2 className='w-5 h-5' />
					</button>
				</div>
			</div>
		</div>
	)
}

export default CartItem
