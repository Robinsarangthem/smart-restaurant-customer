import useDebounce from '@/Components/hooks/useDebounce'
import { useFoodList } from '@/Components/hooks/useFoodList'
import { Axios } from '@/utils/axiosSetup'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
	// const [searchText, setSearchText] = useState('')
	const [urlSearchParam, setUrlSearchParam] = useSearchParams()
	const queryClient = useQueryClient()
	const { data: foodList, setFoodList, fetchALlFoodList } = useFoodList()
	const debouncedQuery = useDebounce(urlSearchParam.get('search'), 500)

	useEffect(() => {
		const fetchData = async () => {
			if (!debouncedQuery) {
				await fetchALlFoodList()
				return
			}

			try {
				const response = queryClient.fetchQuery({
					queryKey: ['search', debouncedQuery],
					queryFn: async () => {
						return Axios.get('/api/food/find', {
							params: {
								foodName: debouncedQuery,
							},
						})
					},
				})
				response.then((data) => {
					setFoodList(data.data.food)
				})
			} catch (error) {
				console.error('', error)
			}
		}
		fetchData()
	}, [debouncedQuery, queryClient, setFoodList])

	const handleInputChange = (e) => {
		const text = e.currentTarget.value
		setUrlSearchParam({ search: text })
	}

	return (
		<div className='mx-auto max-w-screen-xl p-2 my-5 origin-top animate-out fade-in-5'>
			<form onSubmit={(e) => e.preventDefault()} className='flex items-center'>
				<div className='relative w-full'>
					<span className='bi bi-search flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'></span>
					<input
						// ref={searchRef}
						type='text'
						name='search'
						id='simple-search'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5   outline-sky-600'
						placeholder='Search'
						autoComplete='off'
						required
						onChange={handleInputChange}
					/>
				</div>
			</form>
		</div>
	)
}

export default Search
