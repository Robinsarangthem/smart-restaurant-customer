import { Link, useParams } from 'react-router-dom'
import { useFoodList } from '../hooks/useFoodList'
import { useStore } from '../context'
import { Minus, Plus } from 'lucide-react'

const FoodDetail = () => {
	const { addToCart, removeFromCart } = useStore()
	const { foodId } = useParams()
	const { data } = useFoodList()
	console.log(data)

	const foodItem = data.find((item) => item._id === foodId)
	console.log(foodItem)
	if (!foodItem) {
		return <div>Items not found</div>
	}
	return (
		<div className='flex flex-col md:flex-row md:mt-14 justify-center items-center mx-10 gap-4 mt-[80px] pb-5'>
			{/* <Link to='/' className='absolute top-4 left-4'> */}

			{/* </Link>	 */}
			<div className='md:w-1/2'>
				<img
					className='rounded-lg  shadow-lg w-full h-[300px]'
					src={foodItem.image}
					alt={foodItem.name}
				/>
			</div>
			<div className='flex flex-col gap-4 text-slate-800 md:w-1/2'>
				<h2 className='text-3xl font-bold drop-shadow-md'>{foodItem.name}</h2>
				<span className='text-2xl font-medium text-red-500'>
					₹ {foodItem.price}
				</span>
				<p className='text-md md:text-xl text-slate-600 leading-7'>
					{foodItem.description}
				</p>

				<button
					onClick={() => addToCart(foodItem)}
					className='transition duration-300 text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-semibold rounded-lg text-lg px-5 py-3 shadow-lg'
				>
					Add to Cart
				</button>
			</div>
		</div>
	)
}

export default FoodDetail
