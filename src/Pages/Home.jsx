import { useEffect, useState } from 'react'
import FoodDisplay from '../Components/FoodDisplay/FoodDisplay'
import Categories from '../Components/categories/Categories'
import Search from '@/Element/Search'
import { useQuery } from '@tanstack/react-query'
import { Axios } from '@/utils/axiosSetup'
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

	return (
		<main>
			<section>
				<Search />
				{/* <form>
					<input onChange={handleOnChange} type="search" name="" id="" />
				</form> */}
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
