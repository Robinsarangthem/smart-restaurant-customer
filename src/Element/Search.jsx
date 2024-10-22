import useDebounce from '@/Components/hooks/useDebounce'
import { useFoodList } from '@/Components/hooks/useFoodList'
import { Axios } from '@/utils/axiosSetup'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
	// const [searchText, setSearchText] = useState('')
	const [urlSearchParam, setUrlSearchParam] = useSearchParams()
	const queryClient = useQueryClient()
	const { setFoodList, fetchALlFoodList } = useFoodList()
	const debouncedQuery = useDebounce(urlSearchParam.get('search'), 500)
	const [suggestions, setSuggestions] = useState([])
	const [inputValue, setInputValue] = useState('')

	useEffect(() => {}, [])

	useEffect(() => {
		const fetchData = async () => {
			if (!debouncedQuery) {
				await fetchALlFoodList()
				setSuggestions([])
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
					setSuggestions(data.data.food)
				})
			} catch (error) {
				console.error('', error)
			}
		}
		fetchData()
	}, [debouncedQuery, queryClient, setFoodList])

	const handleInputChange = (e) => {
		const text = e.currentTarget.value
		setInputValue(text)
		setUrlSearchParam({ search: text })
	}
	const handleSuggestionClick = (suggestion) => {
		setInputValue(suggestion.name) // Add the selected suggestion to the input
		setUrlSearchParam({ search: suggestion })
		setSuggestions([])
		setInputValue('')
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
						value={inputValue}
						required
						onChange={handleInputChange}
					/>
					{suggestions.length > 0 && (
						<ul className='absolute z-10 w-full  bg-white border border-gray-300 mt-1 rounded-lg shadow-lg'>
							{suggestions.map((suggestion, index) => (
								<li
									key={index}
									className='px-4 py-2 hover:bg-blue-100 cursor-pointer'
									onClick={() => handleSuggestionClick(suggestion.name)} // Assuming suggestion has a 'name' property
								>
									{suggestion.name}
								</li>
							))}
						</ul>
					)}
				</div>
			</form>
		</div>
	)
}

export default Search
