import { useEffect, useState } from 'react'
import FoodDisplay from '../Components/FoodDisplay/FoodDisplay'
import Categories from '../Components/categories/Categories'
import Search from '@/Element/Search'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/utils/axiosSetup'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
function Home() {
	const [category, setCategory] = useState('All')

	const fetchingCategory = async () => {
		const response = await Axios.get('api/category/list')
		return response.data
	}

	const { data: categoryList } = useQuery({
		queryKey: ['category'],
		queryFn: fetchingCategory,
	})
	console.log(categoryList)

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
				<div className='my-5'>
					<FoodDisplay key={category.name} category={category} />
				</div>
			</section>
		</main>
	)
}

export default Home
