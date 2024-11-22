import { Link, useNavigate, useParams } from 'react-router-dom'
import { useFoodList } from '../hooks/useFoodList'
import { useStore } from '../context'
import {
	ArrowLeft,
	Minimize,
	Minus,
	MinusIcon,
	Plus,
	PlusIcon,
} from 'lucide-react'
import { toast } from 'react-toastify'
import QuantityButton from '@/Element/QuantityButton'

const FoodDetail = () => {
	const { addToCart, removeFromCart, cart } = useStore()
	const { foodId } = useParams()
	const { data } = useFoodList()
	const navigate = useNavigate()
	const cartItems = cart?.find((item) => item._id === foodId)
	const foodItems = data?.find((item) => item._id === foodId)

	const handleContinueOrder = () => {
		navigate('/')
	}

	return (
		<div>
			<button
				onClick={handleContinueOrder}
				className='flex items-center text-gray-600 hover:text-gray-800'
			>
				<ArrowLeft className='w-5 h-5 mr-2 ' size={30} />
				back
			</button>
			<div className=' overflow-auto  pt-4 md:p-3  flex justify-center items-center  '>
				<div className='bg-white rounded-xl max-w-sm shadow-md overflow-hidden md:max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6'>
					{/* Image */}
					<div className='h-[300px] md:h-[500px]'>
						<img
							src={foodItems.image}
							alt={foodItems.name}
							className='w-full h-full object-cover'
						/>
					</div>
					{/* Content */}
					<div className='p-4 md:p-8	 flex flex-col'>
						<h1 className='text-xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3'>
							{foodItems.name}
						</h1>
						<div className='text-red-600 text-lg md:text-2xl font-medium mb-3 md:mb-4'>
							₹ {foodItems.price}
						</div>
						<p className='text-gray-600 text-sm md:text-base mb-4 md:mb-8'>
							{foodItems.description}
						</p>
						{/* Quantity Selector */}
						<div className='mt-auto flex justify-start md:justify-start'>
							{cartItems ? (
								<div className='inline-flex items-center border border-gray-100 rounded-lg overflow-hidden shadow-sm'>
									<button
										onClick={() => removeFromCart(foodItems._id)}
										className='w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-[#fef0f0] text-gray-600 hover:bg-red-50'
									>
										<MinusIcon />
									</button>
									<div className='w-16 md:w-20 h-10 md:h-12 flex items-center justify-center border-x border-gray-100 font-medium text-gray-700'>
										{cartItems.quantity}
									</div>
									<button
										onClick={() => addToCart(foodItems)}
										className='w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-[#e5faee] text-gray-600 hover:bg-green-100'
									>
										<PlusIcon />
									</button>
								</div>
							) : (
								<button
									onClick={() => {
										addToCart(foodItems), toast.success('Added to Cart')
									}}
									className='transition-transform duration-300 ease-in-out bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg text-lg px-6 py-3 shadow-md hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300'
								>
									Add to Cart
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FoodDetail
