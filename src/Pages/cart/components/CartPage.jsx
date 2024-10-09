import React, { useEffect } from 'react'
import { useStore } from '../../../Components/context'
import { baseURL } from '../../../utils/axiosSetup'

const CartPage = ({ item }) => {
	const { addToCart, removeFromCart, deleteCart } = useStore()

	const driveImage = `https://drive.google.com/thumbnail?id=${item.image}&sz=wP1000-h1000`

	return (
		<>
			<div className='max-w-full bg-gray-100 border-[2px] border-slate-100 rounded-xl shadow-lg py-2 mx-2 md:0 '>
				<div className='flex  justify-between items-center  px-2 md:pr-3 '>
					<div className='flex gap-5 md:gap-7'>
						<img
							className=' w-24 h-24 md:w-full md:h-40 lg:w-full rounded-md bg-cover bg-center '
							src={driveImage}
							alt={item.name}
						/>
						<div className='flex flex-col gap-7 md:gap-3   pt-3 text-md md:text-xl justify-center md:min-w-[100px] md:text-center md:justify-center lg:justify-center'>
							<span className='font-semibold'>{item.name}</span>
							<span className='block text-center font-semibold'>
								₹ {item.price}/-
							</span>
						</div>
					</div>
					<div className='flex flex-col gap-3  items-center mt-3  justify-center  '>
						<p className='flex  items-center  text-md md:text-xl bg-white rounded-md shadow-lg '>
							<span
								onClick={() => removeFromCart(item._id)}
								className='cursor-pointer border-[1px] border-rose-400 px-[10px] md:px-4 md:text-xl rounded-s-md font-semibold text-xl  text-red-500  hover:bg-red-100'
							>
								-
							</span>
							<span className='block text- text-center w-8 md:w-11 text-slate-800 '>
								x {item.quantity}
							</span>
							<span
								onClick={() => addToCart(item)}
								className=' cursor-pointer border-[1px] border-green-400  rounded-e-md font-semibold text-xl md:text-xl px-[10px] md:px-4  text-green-500 hover:bg-green-100 '
							>
								+
							</span>
						</p>

						<button
							className='  text-slate-100 px-4 py-[5px] md:p mt-[5px]  '
							onClick={() => deleteCart(item._id)}
						>
							<i className='bi bi-trash-fill text-2xl text-red-600 hover:text-rose-500'></i>
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default CartPage
