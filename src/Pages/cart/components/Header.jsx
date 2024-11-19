import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router'

const Header = () => {
	const navigate = useNavigate()
	const handleContinueShoping = () => {
		navigate('/')
	}
	return (
		<div className='flex items-center justify-between mb-8'>
			<button
				onClick={handleContinueShoping}
				className='flex items-center text-gray-600 hover:text-gray-800'
			>
				<ArrowLeft className='w-5 h-5 mr-2' />
				Continue Order
			</button>
			<h1 className='text-2xl font-semibold'>Your Cart</h1>
		</div>
	)
}

export default Header
