import React, { useState } from 'react'

export default function OrderDetailsList({ foodList, foodOrder, totalAmount }) {
	//foodOrderArray
	const foodOrderArrays = Array.isArray(foodOrder) ? foodOrder : [foodOrder]
	console.log(foodOrder)

	// paymentStatus color

	return (
		<>
			<div className='mb-6 space-y-4'>
				<div className='border-b pb-4'>
					{foodOrderArrays?.map((foodOrders, idx) => (
						<div key={idx}>
							<h2 className='text-lg font-semibold mb-2'>
								{foodOrders?.food.name}
							</h2>
							<div className='flex justify-between text-sm text-gray-600'>
								<span>Quantity: {foodOrders?.quantity}</span>
								<span>₹ {foodOrders?.food.price * foodOrders?.quantity}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}
