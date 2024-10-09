import React from 'react'

export default function OrderTotalAmount({ totalAmount }) {
	return (
		<div className='border-t pt-4'>
			<div className='flex justify-between font-semibold '>
				<span>Total</span>
				<span>₹ {totalAmount}</span>
			</div>
		</div>
	)
}
