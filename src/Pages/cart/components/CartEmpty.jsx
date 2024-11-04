import emptyCart from '../../../assets/Images/food-delivery.gif'
import { Link } from 'react-router-dom'
export default function CartEmpty() {
	return (
		<div className='flex justify-center items-center  max-w-7xl'>
			<div className='text-center px-10'>
				<div className='bg-white rounded-full '>
					<img
						className='w-48 py-10 mb-10 mx-auto'
						src={emptyCart}
						alt='Empty Cart'
					/>
				</div>
				<h1 className='text-3xl text-orange-500 pb-16'>Your Cart is Empty!</h1>
				<Link
					to='/'
					className='bg-blue-700 p-3 px-7 py-4 rounded-xl shadow-2xl text-slate-100 font-sans text-xl hover:bg-blue-500'
				>
					Start Ordering
				</Link>
			</div>
		</div>
	)
}
