import { getCategoryRestaurantId } from '@/api/apiService'
import { Badge } from '@/Components/ui/badge'
import { Button } from '@/Components/ui/button'
import { Toggle } from '@/Components/ui/toggle'
import { useQuery } from '@tanstack/react-query'
import React, { useRef } from 'react'

export default function Category({ restaurantId }) {
	const ref = useRef(null)
	const {
		data: categoryList,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['categoryList'],
		queryFn: () => getCategoryRestaurantId(restaurantId),
	})
	console.log('categoryList', categoryList)
	if (isLoading) {
		return <div>loading...</div>
	}
	if (isError) {
		return <div> error</div>
	}
	return (
		<div className='flex items-center gap-3 p-2'>
			{categoryList?.categories?.map((category) => (
				<Toggle
					variant='outline'
					// size='sm'
					className='text-sm cursor-pointer text-center border-slate-800 data-[state=on]:bg-sky-400 data-[state=on]:text-white'
				>
					{category?.category}
				</Toggle>
			))}
		</div>
	)
}
