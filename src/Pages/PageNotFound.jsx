import React from 'react'

const PageNotfound = () => {
	return (
		<div className='min-h-screen flex flex-col justify-center items-center bg-slate-700'>
			{/* Content wrapper */}
			<div className='text-center'>
				{/* 404 Error */}
				<h1 className='text-9xl font-extrabold text-gray-200 tracking-widest'>
					404
				</h1>
				<div className='bg-blue-500 px-2 text-sm text-white rounded rotate-12 inline-block'>
					Page Not Found
				</div>
				{/* Message */}
				<p className='text-gray-200 mt-5	 text-lg'>
					Sorry, the page you're looking for doesn't exist or has been moved.
				</p>
				{/* Go Back Home button */}
				<div className='mt-10'>
					<a
						href='/'
						className='relative inline-block text-sm font-medium text-blue-500 group focus:outline-none focus:ring'
					>
						<span className='absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-blue-500 group-hover:translate-y-0 group-hover:translate-x-0'></span>
						<span className='relative block px-8 py-3 bg-white border border-current'>
							Go Home
						</span>
					</a>
				</div>
			</div>
		</div>
	)
}

export default PageNotfound
