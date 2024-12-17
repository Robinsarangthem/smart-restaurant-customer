import React from 'react'
import { useStore } from '../../../context'

const CategoryCard = ({ item }) => {
	console.log(item)
	const { cartItem, addToCart, removeFromCart } = useStore()
	return (
		<div>
			<div className='m-3 max-w-sm bg-white rounded-lg border border-gray-200 shadow-lg'>
				<div className='relative'>
					<img className='w-full rounded-t-lg ' src={item.image} />
				</div>
				<div className='rounded-b-lg flex flex-col p-5 '>
					<p className='text-left  text-slate-500 mb-2'>
						<span className='text-xl font-semibold '>{item.name}</span>
					</p>
					<p className=' mb-3 font-normal text-slate-500'>{item.description}</p>
					<div className=' flex justify-between'>
						<span className=' mb-3 text-2xl font-bold text-slate-500'>
							₹ {item.price}
						</span>
						{!cartItem[item.id] ? (
							<button
								onClick={() => addToCart(id)}
								type='button'
								className='text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800'
							>
								Add Item
							</button>
						) : (
							<div className=' flex gap-3 items-center bg-transparent   shadow-xl rounded-full py-2 px-2'>
								<span
									className={`bi bi-dash-circle-fill cursor-pointer text-4xl bg-transparent text-red-700 ${
										cartItem[item.id] === 0 ? ' pointer-events-none' : 0
									}`}
									onClick={() => removeFromCart(id)}
								/>
								<span className='text-lgp-2 text-black'>
									{cartItem[item.id]}
								</span>
								<span
									className=' bi bi-plus-circle-fill cursor-pointer text-4xl text-green-700'
									onClick={() => addToCart(item.id)}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default CategoryCard
