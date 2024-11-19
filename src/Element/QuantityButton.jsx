import React from 'react'
import { Minus, Plus } from 'lucide-react'

const QuantityButton = ({ item, onDecrease, onIncrease }) => {
	return (
		<div className='flex items-center gap-4'>
			<div className='flex items-center border rounded-lg shadow-md overflow-hidden '>
				<button
					onClick={() => onDecrease(item._id)}
					className='px-2 sm:px-3 py-1 hover:bg-red-50 transition-colors duration-200 flex items-center justify-center'
					aria-label='Decrease quantity'
				>
					<Minus size={17} className='text-gray-600' />
				</button>

				<span className='px-2 sm:px-4 py-1 border-x text-sm sm:text-base min-w-[30px] sm:min-w-[40px] text-center'>
					{item.quantity}
				</span>

				<button
					onClick={() => onIncrease(item)}
					className='px-2 sm:px-3 py-1 hover:bg-green-50 transition-colors duration-200 flex items-center justify-center'
					aria-label='Increase quantity'
				>
					<Plus size={17} className='text-gray-600' />
				</button>
			</div>
		</div>
	)
}

export default QuantityButton
