import { useStore } from '@/Components/context'
import useAuth from '@/Components/hooks/useAuth'
import { Button } from '@/Components/ui/button'
import { Axios } from '@/utils/axiosSetup'
import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const OrderSummary = ({
	totalAmount,
	cartItems,
	isPending,
	handleOrderCreated,
	isErrorOderCreated,
	totalOrderLength,
	clearCart,
}) => {
	const { token } = useAuth()

	if (isErrorOderCreated) {
		return toast.error(error.message)
	}
	const navigate = useNavigate()
	const orderId = JSON.parse(localStorage.getItem('orderId'))
	const dataToSend = (cartItems || []).map((Item) => {
		return {
			foodId: Item._id,
			quantity: Item.quantity,
		}
	})

	const { mutate: handleAddOder, isPending: pendingAddOrder } = useMutation({
		mutationKey: ['addOrder'],
		mutationFn: () => {
			return Axios.post(
				'/api/order/addOrder',
				{
					orderId,
					foodItems: dataToSend,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
		},
		onSuccess: ({ data }) => {
			console.log(data)
			if (data.success) {
				toast.success(data.msg)
				clearCart()
				navigate('/orders', { replace: true, state: data.order })
			} else {
				{
					console.log('	data.message: ', data.message)
				}
			}
		},
		onError: (error) => {
			console.log('error', error.response?.data.message)
			toast.error(error.response?.data.message)
		},
	})

	return (
		<div className='bg-white rounded-lg shadow-sm p-6'>
			<h2 className='text-lg font-semibold mb-4'>Order Summary</h2>

			<div className='space-y-4'>
				<div className='flex justify-between text-gray-600'>
					<span>Subtotal</span>
					<span>₹{totalAmount()}</span>
				</div>

				<div className='flex justify-between text-gray-600'>
					<span>Shipping</span>
					<span>Free</span>
				</div>

				<div className='border-t pt-4 flex justify-between font-semibold text-lg'>
					<span>Total</span>
					<span>₹{totalAmount()}</span>
				</div>

				<button
					onClick={handleOrderCreated}
					className='w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-sm  transition-colors'
					disabled={isPending}
				>
					Checkout
				</button>
			</div>
		</div>
	)
}

export default React.memo(OrderSummary)
