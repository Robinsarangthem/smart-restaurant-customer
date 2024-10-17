import React from 'react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Axios, baseURL } from '../utils/axiosSetup'
import { Button } from '@/Components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/Components/ui/table'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { ClipLoader, FadeLoader } from 'react-spinners'
import { socket } from '@/Components/socket/socket'

const Orders = () => {
	const navigate = useNavigate()
	const { state } = useLocation()

	useEffect(() => {
		socket.emit('newOrder', 'test')
	}, [])

	// pay by cash

	const payByCash = async () => {
		const response = await Axios.post('/api/pay/cash', {
			orderId: state._id,
		})
		if (response?.data.success === true) {
			navigate('/order_status', { replace: true })
		}
	}
	const { mutate: PayByCash, isPending: pendingPayByCash } = useMutation({
		mutationKey: ['PAYBYCASh'],
		mutationFn: payByCash,
	})
	// end

	const openRazorPay = async (e) => {
		const { data } = await Axios.post(`/api/pay/newPayment`, {
			orderId: state._id,
		})

		const options = {
			key: import.meta.VITE_APP_RAZORPAYID, // Enter the Key ID generated from the Dashboard
			amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			name: 'Acme Corp', //your business name
			description: 'Test Transaction',
			order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			handler: async (response) => {
				const paymentData = {
					razorpay_payment_id: response.razorpay_payment_id,
					razorpay_order_id: response.razorpay_order_id,
					razorpay_signature: response.razorpay_signature,
					razorpayOrder: data.order,
				}
				try {
					const { data } = await Axios.post('/api/pay/verify', paymentData, {
						headers: {
							'Content-Type': 'application/json',
						},
					})

					if (data.success) {
						navigate('/order_Status', { replace: true })
						toast.success('Payment successfull')
					}
				} catch (error) {
					console.log(error.message)
				}
			},
			prefill: {
				//We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
				name: 'Gaurav Kumar', //your customer's name
				email: 'gaurav.kumar@example.com',
				contact: '9000090000', //Provide the customer's phone number for better conversion rates
			},
			notes: {
				address: 'Razorpay Corporate Office',
			},
			theme: {
				color: '#3399cc',
			},
		}
		const rzp1 = new window.Razorpay(options)
		rzp1.on('payment.failed', function (response) {
			alert(response.error.code)
			alert(response.error.description)
			alert(response.error.source)
			alert(response.error.step)
			alert(response.error.reason)
			alert(response.error.metadata.order_id)
			alert(response.error.metadata.payment_id)
		})
		rzp1.open()
		e.preventDefault()
	}
	useEffect(() => {
		let script

		const loadRazorpay = async () => {
			// Check if script has already been loaded
			if (!script) {
				// Load Razorpay SDK script dynamically
				script = document.createElement('script')
				script.src = 'https://checkout.razorpay.com/v1/checkout.js'
				script.async = true
				document.body.appendChild(script)
			}
		}

		loadRazorpay()

		// Cleanup function to remove the script from the DOM
		return () => {
			if (script) {
				document.body.removeChild(script)
				script = null
			}
		}
	}, [])
	const hasFoodItems = state?.foodItems && state.foodItems.length > 0
	const {
		mutate: handleRazorpay,
		isPending,
		isSuccess,
	} = useMutation({
		mutationKey: ['razorpay'],
		mutationFn: openRazorPay,
	})
	if (isSuccess)
		return (
			<div
				class='flex justify-center h-[100svh] items-center spinner-border text-text-success'
				role='status'
			>
				<span className='visually-hidden text-2xl text-slate-400 flex items-center gap-1'>
					<FadeLoader size={20} color='#fea751' /> Please Wait...
				</span>
			</div>
		)

	return (
		<div className='h-[100svh] overflow-hidden'>
			{hasFoodItems ? (
				<>
					<h2 className='border-[1px] mt-3 py-2 rounded-md text-center font-medium border-slate-900 mx-[20px]'>
						Payment Mode
					</h2>
					<div className='mt-[50px]'>
						<Table>
							<TableHeader>
								<TableRow className='grid grid-cols-4 bg-white'>
									<TableHead>Items</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Amount</TableHead>
								</TableRow>
							</TableHeader>
						</Table>
						{state?.foodItems.map((item, idx) => (
							<Table key={idx} className='bg-slate-100'>
								<TableBody>
									<TableRow className='grid grid-cols-4 border-b-2 border-slate-300'>
										<TableCell className='capitalize font-semibold'>
											{item.foodId.name}
										</TableCell>
										<TableCell> ₹ {item.foodId.price} </TableCell>
										<TableCell className='text-red-500'>
											x {item.quantity}
										</TableCell>
										<TableCell>₹ {item.foodId.price * item.quantity}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						))}
					</div>

					<div className='mt-[40px] flex justify-center  items-center  gap-2 p-2'>
						<Button
							onClick={PayByCash}
							className='w-[200px] text-[16px] bg-blue-500 active:bg-blue-300 hover:bg-blue-400 shadow-md shadow-blue-400 '
						>
							{pendingPayByCash ? (
								<div className='flex justify-center items-center'>
									Loading...
								</div>
							) : (
								'Pay by Cash'
							)}
						</Button>
						{isPending ? (
							<Button className='w-[250px] text-[16px]'>
								<ClipLoader size={20} color='white' /> Processing...
							</Button>
						) : (
							<Button
								type='submit'
								onClick={handleRazorpay}
								className='w-[250px] text-[16px] shadow-md shadow-slate-400'
								disabled={isPending}
							>
								Pay Online
							</Button>
						)}
					</div>
				</>
			) : (
				<NavLink to='/order_status'>
					<div className='flex items-center justify-center mt-[70px] '>
						<Button> Check order status </Button>
					</div>
				</NavLink>
			)}
		</div>
	)
}

export default Orders
