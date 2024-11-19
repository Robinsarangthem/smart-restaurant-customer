// components/CartEmpty.js
import React from 'react'
import { ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router'

const CartEmpty = () => {
	const navigate = useNavigate()
	const handleStartShopingNavigate = () => {
		navigate('/')
	}
	return (
		<div className='text-center py-16 bg-white rounded-lg shadow-sm'>
			<ShoppingBag className='w-16 h-16 mx-auto text-gray-400 mb-4' />
			<h2 className='text-2xl font-semibold text-gray-900 mb-2'>
				Your cart is empty
			</h2>
			<p className='text-gray-600 mb-8'>
				Looks like you haven't added anything to your cart yet
			</p>
			<button
				onClick={handleStartShopingNavigate}
				className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'
			>
				Start Shopping
			</button>
		</div>
	)
}

export default CartEmpty
