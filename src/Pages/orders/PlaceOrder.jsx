import { useStore } from '@/Components/context'
import useAuth from '@/Components/hooks/useAuth'
import { Button } from '@/Components/ui/button'
import { Axios } from '@/utils/axiosSetup'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const PlaceOrder = ({
	getTotalAmount,
	cart,
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
	const dataToSend = (cart || []).map((Item) => {
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
		// <div className=' w-full my-[50px]'>
		// 	<div className=' px-[20px] '>
		// 		<div className=' p-3   w-full md:bg-white border-[1px] border-slate-300 shadow-xl rounded-xl text-slate-600 justify-center'>
		// 			<span className='mb-6 font-medium text-slate-700'>
		// 				Cart Total:
		// 				<span className='text-lg font-semibold text-green-500'>
		// 					x{cart.length}
		// 				</span>
		// 			</span>
		// 			<div className='flex justify-between gap-10 items-center my-9 font-medium border-b-2 border-slate-700'>
		// 				<span className='text-sm'>Total Price:</span>
		// 				<span className='text-md text-neutral-800 mr-10'>
		// 					₹ {getTotalAmount()}
		// 				</span>
		// 			</div>
		// 			{cart.length > 0 && (
		// 				<div className='flex justify-center mobile:justify-center mobile:my-[20px] mb-[5rem] transition-transform duration- 300 '>
		// 					{!totalOrderLength ? (
		// 						<Button
		// 							onClick={handleAddOder}
		// 							disabled={pendingAddOrder}
		// 							className='bg-green-600 drop-shadow-lg hover:bg-green-700 active:scale-110'
		// 						>
		// 							{pendingAddOrder ? (
		// 								<div className='flex items-center gap-1'>
		// 									<ClipLoader size={20} color={'white'} /> Processing...
		// 								</div>
		// 							) : (
		// 								<div>Add Order</div>
		// 							)}
		// 						</Button>
		// 					) : (
		// 						<button
		// 							onClick={handleOrderCreated}
		// 							disabled={isPending}
		// 							type='button'
		// 							className=' md:min-w-80 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-full text-sm px-5 py-2.5 text-center'
		// 						>
		// 							{isPending ? (
		// 								<div className='flex items-center gap-1'>
		// 									<ClipLoader size={20} color={'white'} /> Processing...
		// 								</div>
		// 							) : (
		// 								<div>Place Order</div>
		// 							)}
		// 						</button>
		// 					)}
		// 				</div>
		// 			)}
		// 		</div>
		// 	</div>
		// </div>
		<div className='lg:w-1/3 mt-8 lg:mt-0 '>
			<div className='bg-gray-100 p-6 rounded-lg'>
				<h2 className='text-xl font-semibold mb-4'>Order Summary</h2>
				<div className='space-y-2'>
					<div className='flex justify-between'>
						<span>Subtotal</span>
						<span>₹ {getTotalAmount()}</span>
					</div>
					<div className='flex justify-between'>
						<span>Shipping</span>
						<span> - </span>
					</div>
					<div className='flex justify-between font-semibold text-lg'>
						<span>Total</span>
						<span>₹ {getTotalAmount()}</span>
					</div>
				</div>
				<button
					onClick={handleOrderCreated}
					disabled={isPending}
					className='w-full bg-blue-600 text-white py-2 rounded mt-6 hover:bg-blue-700 transition duration-200'
				>
					Checkout
				</button>
			</div>
		</div>
	)
}

export default PlaceOrder
