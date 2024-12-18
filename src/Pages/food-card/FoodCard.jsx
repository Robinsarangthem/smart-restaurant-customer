import { Button } from '@/Components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/Components/ui/card'
import { PlusIcon, ShoppingCart } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function FoodCard({ food }) {
	const {
		description,
		discountPercentage,
		image,
		isAvailable,
		name,
		price,
		restaurant,
		todaysSpecial,
		_id,
	} = food
	console.log('food', food)
	const [isLoaded, setIsLoaded] = useState(false)

	return (
		<Card className=' overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl'>
			<div className='relative'>
				<img
					src={image || '/api/placeholder/300/200'}
					alt={name}
					className='w-full h-48 object-cover'
				/>
				{/* <Button
					variant='ghost'
					size='icon'
					className='absolute top-2 right-2 bg-white/70 hover:bg-white/90 rounded-full p-2'
				>
					<Heart className='w-5 h-5 text-red-500' />
				</Button> */}
			</div>

			<CardHeader className='pb-2'>
				<CardTitle className='text-xl font-bold'>{name}</CardTitle>
				<p className='text-sm text-muted-foreground line-clamp-2'>
					{description}
				</p>
			</CardHeader>

			<CardContent className='flex justify-between items-center pb-2'>
				<div className='flex items-center space-x-2'>
					<span className='font-semibold text-lg text-primary'>
						₹ {price.toFixed(2)}
					</span>
					{/* <span className='text-sm text-muted-foreground'>{calories} Cal</span> */}
				</div>
				{/* <div className='flex items-center space-x-1'>
					{[...Array(5)].map((_, i) => (
						<span
							key={i}
							className={`text-lg ${
								i < rating ? 'text-yellow-400' : 'text-gray-300'
							}`}
						>
							★
						</span>
					))}
				</div> */}
			</CardContent>

			<CardFooter>
				<Button className='w-full' variant='default'>
					<PlusIcon className='mr-2 h-4 w-4' />
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	)
}
