// LoadingSpinner.js
import React from 'react'
import logoLoading from '../assets/Images/Achaathak-removebg-preview (1).png'

const LogoLoading = () => (
	<div className='flex items-center justify-center p-4'>
		<img src={logoLoading} alt='Loading...' className='w-[200px] h-[200px]' />
	</div>
)

export default LogoLoading
