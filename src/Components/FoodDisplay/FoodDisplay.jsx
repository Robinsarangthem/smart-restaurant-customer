import PropagateLoader from 'react-spinners/PropagateLoader'
import { Link, useSearchParams } from 'react-router-dom'
import Search from '../../Element/Search'
import { useFoodList } from '../hooks/useFoodList'
import FoodCard from './FoodCard'
const FoodDisplay = ({ category }) => {
	const { data, error } = useFoodList()

	if (error) {
		return (
			<div>
				<p className='text-red-500  text-center my-7'>{error.message}</p>
			</div>
		)
	}

	const productsWithCategory = data?.filter((product) => {
		if (category === 'All') return true

		if (product.category === category) {
			return true
		}

		return false
	})

	if (productsWithCategory?.length === 0) return <div>Not Food Item</div>

	return (
		<div>
			<h1 className='text-xl p-2 text-slate-700 font-sans md:text-2xl  font-semibold md:text-center  '>
				{category === 'All' ? 'Menu ' : <p> {category}</p>}
			</h1>

			<div className=' place-items-center grid grid-cols-2 mobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4	 lg:gap-5 gap-4 p-2 mobile:p-5  '>
				{productsWithCategory?.map((product) => (
					<div
						key={product._id}
						className='bg-white w-full h-full shadow-md rounded-lg overflow-hidden md:transition-transform transform md:hover:scale-105 hover:shadow-xl'
					>
						<FoodCard product={product} />
					</div>
				))}
			</div>
		</div>
	)
}

export default FoodDisplay
