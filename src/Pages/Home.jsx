import React, { Suspense, useEffect, useState } from 'react'
import Search from '@/Components/search/Search'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/utils/axiosSetup'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate, useParams } from 'react-router'
import SkeletonFallback from '@/Components/categories/component/SkeletonFallBack'
import FoodCardSkeleton from '@/Components/FoodDisplay/FoodCardSkeleton'
const Categories = React.lazy(() =>
	import('../Components/categories/Categories')
)
const FoodDisplay = React.lazy(() =>
	import('@/Components/FoodDisplay/FoodDisplay')
)
function Home() {
	const { category: urlCategory } = useParams()
	const [category, setCategory] = useState(urlCategory || 'All')
	const navigate = useNavigate()

	const fetchingCategory = async () => {
		const response = await Axios.get('/api/category/list')
		return response.data
	}

	const { data: categoryList } = useQuery({
		queryKey: ['category'],
		queryFn: fetchingCategory,
		staleTime: 1000 * 60 * 5,
		cacheTime: 1000 * 60 * 30,
	})

	useEffect(() => {
		if (urlCategory !== 'All') {
			setCategory(urlCategory || 'All')
		}
	}, [urlCategory])
	const handleChangeCategory = (newCategory) => {
		setCategory(
			(prevCategory) => (prevCategory === newCategory ? 'All' : newCategory) // Toggle back to "All" if the same category is clicked
		)

		// Navigate based on the new category (if "All", navigate to root)
		navigate(newCategory === 'All' ? '/' : `/category/${newCategory}`)
	}

	return (
		<main>
			<section>
				{/* <h1 className='text-center py-3 md:text-	xl font-medium bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent text-lg	'>
					Welcome to Achaathak - Your Destination for Delicious Food
				</h1> */}
				<Search />
				<div>
					<Suspense fallback={<SkeletonFallback />}>
						<Categories
							key={category._id}
							category={category}
							setCategory={handleChangeCategory}
							categoryList={categoryList}
						/>
					</Suspense>
				</div>
				<div key={category._id}>
					<Suspense fallback={<FoodCardSkeleton />}>
						<FoodDisplay category={category} />
					</Suspense>
				</div>
			</section>
		</main>
	)
}

export default React.memo(Home)
