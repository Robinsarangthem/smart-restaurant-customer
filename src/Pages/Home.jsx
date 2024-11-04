import React, { Suspense, useEffect, useState } from 'react'
import Categories from '../Components/categories/Categories'
import Search from '@/Element/Search'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/utils/axiosSetup'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import FoodDisplay from '@/Components/FoodDisplay/FoodDisplay'
import { useNavigate, useParams } from 'react-router'

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
					<Categories
						key={category._id}
						category={category}
						setCategory={handleChangeCategory}
						categoryList={categoryList}
					/>
				</div>
				<div className='' key={category._id}>
					<FoodDisplay category={category} />
				</div>
			</section>
		</main>
	)
}

export default Home
