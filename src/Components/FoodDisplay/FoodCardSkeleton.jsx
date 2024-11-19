// components/FoodCardSkeleton.js

import { Skeleton } from '../ui/skeleton'

export default function FoodCardSkeleton() {
	return (
		<div className='place-items-center grid grid-cols-2 mobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5 gap-4 p-2 mobile:p-5'>
			{/* Repeat Skeleton cards as placeholders */}
			{Array(10)
				.fill(0)
				.map((_, index) => (
					<div
						key={index}
						className='border rounded-lg p-4 shadow-md animate-pulse'
						style={{
							width: '100%', // Adjust to match card width
							height: 'auto', // Let it grow to fit children
							display: 'flex',
							flexDirection: 'column',
							gap: '8px', // Space between skeleton elements
						}}
					>
						{/* Placeholder for Image */}
						<Skeleton className='w-full h-32 mb-4 bg-gray-300 rounded-lg' />

						{/* Placeholder for Title */}
						<Skeleton className='w-3/4 h-6 bg-gray-300 rounded' />

						{/* Placeholder for Description */}
						<Skeleton className='w-1/2 h-4 bg-gray-300 rounded' />

						{/* Placeholder for Button */}
						<Skeleton className='w-full h-8 mt-4 bg-gray-300 rounded-md' />
					</div>
				))}
		</div>
	)
}
