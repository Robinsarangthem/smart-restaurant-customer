import React, { Suspense, useEffect, useState } from 'react'
import Categories from '../Components/categories/Categories'
import Search from '@/Element/Search'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/utils/axiosSetup'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { PropagateLoader } from 'react-spinners'
import { ErrorBoundary } from 'react-error-boundary'
import FallbackRender from '@/Components/FoodDisplay/FallbackRender'
const LazyFoodDisplay = React.lazy(() =>
	import('../Components/FoodDisplay/FoodDisplay')
)
function Home() {
	const [category, setCategory] = useState('All')

	const fetchingCategory = async () => {
		const response = await Axios.get('/api/category/list')
		return response.data
	}

	const { data: categoryList } = useQuery({
		queryKey: ['category'],
		queryFn: fetchingCategory,
	})

	return (
		<main>
			<section>
				<Search />
				<div>
					<Categories
						category={category}
						setCategory={setCategory}
						categoryList={categoryList}
					/>
				</div>
				<ErrorBoundary fallback={FallbackRender}>
					<Suspense
						fallback={
							<div className='flex justify-center min-h-[30svh] items-center  text-blue-500'>
								<PropagateLoader color='blue' />
							</div>
						}
					>
						<div className='my-3' key={category._id}>
							<LazyFoodDisplay category={category} />
						</div>
					</Suspense>
				</ErrorBoundary>
			</section>
		</main>
	)
}

export default Home
