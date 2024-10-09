import React from 'react'

export default function OrderHeader({ foodList }) {
	const orderId = foodList.customerId.slice(-5)
	const statusClasses = {
		Processing:
			'bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-sm font-medium',
		Preparing: 'text-orange-500 bg-orange-200',
		Ready: 'text-yellow-500 bg-yellow-200',
		Completed: 'text-green-500 bg-green-200',
	}
	const currentStatus = statusClasses[foodList.orderStatus] || ''
	return (
		<div className='flex justify-between items-center mb-4'>
			<span className='text-lg font-semibold'>Order# {orderId}</span>
			<div className='flex flex-col justify-center items-center gap-2 min-w-[30px]'>
				<span
					className={`${currentStatus} rounded-full px-3 py-1 text-sm min-w-1`}
				>
					{foodList.orderStatus}
				</span>
				<span>
					{foodList.orderPayment === 'Paid' ? (
						<div className='text-green-500 bg-green-200 px-[12px] py-1 rounded-full min-w-3'>
							{foodList.orderPayment}
						</div>
					) : (
						<div className='text-red-700 bg-red-100 px-[12px] py-1 rounded-full text-sm font-medium'>
							{foodList.orderPayment}
						</div>
					)}
				</span>
			</div>
		</div>
	)
}
