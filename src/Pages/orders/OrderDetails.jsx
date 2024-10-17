import { Axios } from '@/utils/axiosSetup'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import OrderDetailsList from './OrderDetailsList'
import OrderHeader from './componet/OrderHeader'
import OrderTotalAmount from './componet/OrderTotalAmount'

const OrderDetails = () => {
	const customerId = localStorage.getItem('token')

	const { data, isLoading } = useQuery({
		queryKey: ['OrderList'],
		queryFn: async () => {
			return await Axios.get('/api/order/customerList', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${customerId}`,
				},
			})
		},
	})

	const orders = data?.data?.orders || []

	console.log('orders Details	', orders)
	if (isLoading) {
		// Show loading while orders are being fetched or undefined
		return (
			<div className='text-center py-[50%] font-semibold text-xl text-blue-600'>
				Loading...
			</div>
		)
	}
	// when other is not found
	// if (orders.length === 0) {
	// 	return (
	// 		<div className='text-center py-[50%] font-semibold text-xl text-red-600 mobile:py-[40%] md:py-[30%]'>
	// 			No orders found
	// 		</div>
	// 	)
	// }

	const ordersId = orders.map((id) => id._id)
	localStorage.setItem('orderId', JSON.stringify(ordersId))
	// const totalAmount = orders.reduce((acc, order) => acc + order.orderTotal, 0)

	const totalAmount = orders.map((totalPrice) => totalPrice.orderTotal)
	return (
		<div className='mx-auto p-4 font-sans max-w-7xl h-[100svh]'>
			<h2 className=' text-center bg-slate-200 rounded-md text-slate-700 border-[1px] border-slate-600 py-[10px] mb-[20px] font-medium '>
				Order Status
			</h2>

			<div className='bg-white shadow-md rounded-lg p-6 mb-6'>
				{orders.map((foodList, idx) => {
					const foodList2 = foodList
					return (
						<div key={idx}>
							<OrderHeader foodList={foodList2} />
							{foodList2.foodItems.map((foodOrder, idx) => (
								<OrderDetailsList
									key={idx}
									foodList={foodList2}
									foodOrder={foodOrder}
									totalAmount={totalAmount}
								/>
							))}
						</div>
					)
				})}
				<OrderTotalAmount totalAmount={totalAmount} />
			</div>
		</div>
	)
}

export default OrderDetails
