import React from 'react'
import { SearchX } from 'lucide-react'

const NoResults = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-[400px] p-8'>
			{/* Icon Container with Background */}
			<div className='mb-6 p-4 bg-gray-50 rounded-full'>
				<SearchX className='w-12 h-12 text-gray-400' strokeWidth={1.5} />
			</div>

			{/* Main Content */}
			<div className='text-center max-w-sm'>
				<h2 className='text-xl font-semibold text-gray-900 mb-3'>
					We couldn't find any matches
				</h2>
				<p className='text-gray-600 mb-6'>
					Please try searching with different keywords or browse through our
					categories
				</p>

				{/* Search Again Button */}
				<button className='px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200'>
					Search Again
				</button>
			</div>
		</div>
	)
}

export default NoResults
