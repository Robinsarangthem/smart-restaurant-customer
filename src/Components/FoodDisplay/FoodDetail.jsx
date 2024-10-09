import backArrow from '../../assets/Images/left-arrow.png'
import { Link, useParams } from 'react-router-dom'
import { useFoodList } from '../hooks/useFoodList'
import { baseURL } from '../../utils/axiosSetup'
import { useStore } from '../context'

const FoodDetail = () => {
	const { addToCart } = useStore()
	const { foodId } = useParams()
	const { data } = useFoodList()
	console.log(data)

	const foodItem = data.find((item) => item._id === foodId)
	if (!foodItem) {
		return <div>Items not found</div>
	}
	return (
		<div className=' relative flex-row md:flex mt-[100px] md:my-14 justify-center items-center mx-10 gap-6 '>
			<Link to={'/'} className='absolute -top-10 -left-4 md:-top-4'>
				<img className='w-6' src={backArrow} />
			</Link>
			<div className='py-7 '>
				<img
					className='rounded-lg  md:w-full '
					src={`${baseURL}/${foodItem.image}`}
					alt={foodItem.name}
				/>
			</div>
			<div className=' flex flex-col gap-6 text-slate-800'>
				<h2 className='text-2xl font-semibold'>{foodItem.name}</h2>
				<span className='text-2xl font-medium text-red-500'>
					₹ {foodItem.price}
				</span>
				<p className='text-xl  md:text-2xl text-slate-500 leading-6'>
					{foodItem.description}
				</p>
				<button
					onClick={() => addToCart(foodItem)}
					className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-3 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800 w-44 shadow-lg'
				>
					Add Item
				</button>
			</div>
		</div>
	)
}

export default FoodDetail
