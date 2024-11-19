// Cart.js
import React from 'react'
import { useStore } from '@/Components/context'
import CartPage from './components/CartPage'
import { useNavigate } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useFoodList } from '@/Components/hooks/useFoodList'

const Cart = () => {
	const { cart, clearCart, addToCart, removeFromCart, deleteCart } = useStore()
	const token = localStorage.getItem('token')
	const navigate = useNavigate()

	// orderlist
	const { data: orderlist, isLoading: Loading } = useQuery({
		queryKey: ['OrderList'],
		queryFn: async () => {
			return await Axios.get('/api/order/customerlist', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			})
		},
	})
	const orders = orderlist?.data?.orders || []
	const totalOrderLength = orders.length === 0

	const handlerPayment = () => {
		const options = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}

		const dataToSend = cart.map((Item) => {
			return {
				// foodName: Item.name,
				foodId: Item._id,
				quantity: Item.quantity,
			}
		})
		return Axios.post(
			'/api/order/create',
			{
				foodItems: dataToSend,
			},
			options
		)
	}
	const {
		mutate: handleOrderCreated,
		isPending,
		isError: isErrorOderCreated,
	} = useMutation({
		mutationKey: 'Payment',
		mutationFn: handlerPayment,
		onSuccess: ({ data }) => {
			if (data.success) {
				toast.success(data.msg || 'Order placed successfully')
				clearCart()
				navigate('/orders', { replace: true, state: data.order })
			} else {
				console.log(data.message)
			}
		},
	})
	if (isErrorOderCreated)
		return (
			<div className='text-center pt-[20%] text-xl font-medium text-red-500'>
				Error creating order
			</div>
		)

	// mainPart
	const { data, isError, isLoading } = useFoodList()
	if (isLoading) {
		return <p className='flex justify-center  mt-[50%]'> Loading.....</p>
	}
	if (isError) {
		return (
			<div>
				<p>not available</p>
			</div>
		)
	}

	return (
		<CartPage
			cartItems={cart}
			deleteCart={deleteCart}
			onRemove={removeFromCart}
			onIncrease={addToCart}
			onDecrease={removeFromCart}
			clearCart={clearCart}
			handleOrderCreated={handleOrderCreated}
			isPending={isPending}
			totalOrderLength={totalOrderLength}
		/>
	)
}

export default Cart
