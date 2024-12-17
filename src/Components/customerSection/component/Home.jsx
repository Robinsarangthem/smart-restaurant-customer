import React from 'react'

export default function Home() {
	return (
		<div className='text-center pt-5 text-xl text-customDarkblue'>
			<div className='flex justify-center items-center min-h-screen bg-gray-100'>
				<div className='w-11/12 max-w-md bg-white rounded-xl shadow-lg overflow-hidden'>
					<img
						src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFja2VkJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D	'
						alt='Food Image'
						className='w-full h-auto'
					/>
					<div className='p-4'>
						<h2 className='text-2xl font-semibold text-gray-800 mb-2'>
							Delicious Pasta
						</h2>
						{/*   */}
						<p className='text-lg text-green-600 mb-4'>$12.99</p>
					</div>
				</div>
			</div>
		</div>
	)
}
