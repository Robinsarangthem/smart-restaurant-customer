import React, { Suspense, useEffect, useState } from 'react'
import Search from '@/Element/Search'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/utils/axiosSetup'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate, useParams } from 'react-router'
import { Skeleton } from '@/Components/ui/skeleton'
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
		navigate(
			`/${newCategory === 'All' || category === newCategory ? '' : newCategory}`
		)
	}

	return (
		<main>
			<section>
				<Search />
				<div>
					<Suspense fallback={<Skeleton className=' h-10 w-full' />}>
						<Categories
							key={category._id}
							category={category}
							setCategory={handleChangeCategory}
							categoryList={categoryList}
						/>
					</Suspense>
				</div>
				<div key={category._id}>
					<Suspense fallback={<div> Loading .... </div>}>
						<FoodDisplay category={category} />
					</Suspense>
				</div>
			</section>
		</main>
	)
}

export default Home
