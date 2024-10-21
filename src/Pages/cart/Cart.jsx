import React, { useEffect, useState } from 'react'
import { useStore } from '../../Components/context'
import PlaceOrder from '../orders/PlaceOrder'
import CartEmpty from './components/CartEmpty'
import CartPage from './components/CartPage'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Axios } from '../../utils/axiosSetup'
import { useFoodList } from '../../Components/hooks/useFoodList'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function Cart() {
	const { cart, clearCart } = useStore()

	// const { token } = useAuth()

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
				id: Item._id,
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

	const getTotalAmount = () => {
		return cart.reduce((total, cartItems) => {
			const items = cart.find((product) => product._id === cartItems._id)
			if (items) {
				return (total += items.price * cartItems.quantity)
			}
			return total
		}, 0)
	}

	return (
		<div className='h-[100svh]'>
			<div
				className={
					!cart.length
						? 'flex flex-col items-center gap-2 md:mx-10'
						: 'md:flex md:justify-between md:mx-10'
				}
			>
				<div className='container mx-auto px-4 py-8'>
					<h1 className='text-2xl font-bold mb-6'>Your Cart</h1>
					<div className='lg:flex lg:space-x-8'>
						<div className='lg:w-2/3 grid gap-3'>
							{cart.map((item, i) => {
								const cartItem = cart.find(
									(cartItem) => cartItem._id === item._id
								)
								return cartItem ? <CartPage key={i} item={cartItem} /> : null
							})}
						</div>

						{!cart.length ? (
							<CartEmpty />
						) : (
							<PlaceOrder
								getTotalAmount={getTotalAmount}
								cart={cart}
								handleOrderCreated={handleOrderCreated}
								isPending={isPending}
								totalOrderLength={totalOrderLength}
								clearCart={clearCart}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
