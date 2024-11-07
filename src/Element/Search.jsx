import useDebounce from '@/Components/hooks/useDebounce'
import { useFoodList } from '@/Components/hooks/useFoodList'
import { Axios } from '@/utils/axiosSetup'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const Search = () => {
	const [urlSearchParam, setUrlSearchParam] = useSearchParams()
	const queryClient = useQueryClient()
	const { setFoodList, fetchALlFoodList } = useFoodList()
	const debouncedQuery = useDebounce(urlSearchParam.get('search'), 500)
	const [suggestions, setSuggestions] = useState([])
	const [inputValue, setInputValue] = useState(
		urlSearchParam.get('search') || ''
	)
	const dropDownRef = useRef(null)

	useEffect(() => {
		const fetchData = async () => {
			if (!debouncedQuery) {
				await fetchALlFoodList()
				setSuggestions([]) // Clear suggestions if search is empty
				return
			}

			try {
				const response = await queryClient.fetchQuery({
					queryKey: ['search', debouncedQuery],
					queryFn: async () => {
						const result = await Axios.get('/api/food/find', {
							params: {
								foodName: debouncedQuery,
							},
						})
						return result.data
					},
				})
				setFoodList(response.food)
				setSuggestions(response.food)
			} catch (error) {
				console.error('Error fetching food items:', error)
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
		// Set inputValue to the selected suggestion name
		setInputValue(suggestion.name)
		// Update the search URL parameter
		setUrlSearchParam({ search: suggestion.name })
		// Clear the suggestions list to close the dropdown
		setTimeout(() => setSuggestions([]), 100) // Adding a delay to allow click events to register
	}
	const handleSearch = (e) => {
		e.preventDefault()
		setInputValue('') // Clear the input field
		setSuggestions([]) // Optional: Clear suggestions if needed
	}

	useEffect(() => {
		const handleOnclikOutside = (event) => {
			if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
				setSuggestions([])
			}
		}
		document.addEventListener('mousedown', handleOnclikOutside)
		return () => {
			document.removeEventListener('mousedown', handleOnclikOutside)
		}
	}, [])

	return (
		<div
			className='mx-auto max-w-screen-xl p-2 my-5 origin-top animate-out fade-in-5'
			ref={dropDownRef}
		>
			<form onSubmit={handleSearch} className='flex items-center'>
				<div className='relative w-full'>
					<span className='bi bi-search absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'></span>
					<input
						type='text'
						name='search'
						id='simple-search'
						className='w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-sky-600' // Tailwind uppercase class added
						placeholder='Search'
						autoComplete='off'
						value={inputValue ?? ''}
						required
						onChange={handleInputChange}
					/>
					{suggestions.length > 0 && (
						<ul
							className='absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg overflow-y-auto'
							style={{
								maxHeight: '240px',
								overflowY: 'auto',
								overflowX: 'hidden',
							}}
						>
							{suggestions.map((suggestion, index) => (
								<li
									key={index}
									className='px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer uppercase' // Tailwind uppercase class added
									onClick={() => handleSuggestionClick(suggestion)}
								>
									{/* Highlight matching text and convert to uppercase */}
									{suggestion.name
										.split(new RegExp(`(${debouncedQuery})`, 'gi'))
										.map((part, i) =>
											part.toLowerCase() === debouncedQuery?.toLowerCase() ? (
												<span key={i} className='font-semibold text-blue-600'>
													{part}
												</span>
											) : (
												part
											)
										)}
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
