import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../ui/button'
import { SearchCheckIcon, SearchIcon } from 'lucide-react'
import useDebounce from '../hooks/useDebounce'
import { Axios } from '@/utils/axiosSetup'

export default function Search() {
	const [inputValue, setInputvalue] = useState('')
	const [suggestion, setSuggestion] = useState('')
	const [isSuggestionOpen, setIsSuggestionOpen] = useState(false)

	const debouncedInput = useDebounce(inputValue, 300)
	const navigate = useNavigate()

	useEffect(() => {
		if (!debouncedInput) {
			setSuggestion([])
			return
		}
		const fetchSearchSuggestion = async () => {
			try {
				const response = await Axios.get(
					`/api/food/find?foodName=${debouncedInput}`
				)
				setSuggestion(response?.data?.food || [])
				setIsSuggestionOpen(true)
			} catch (error) {
				console.error('No found ', error.message)
			}
		}
		fetchSearchSuggestion()
	}, [debouncedInput])

	const handleInputChange = (e) => {
		setInputvalue(e.target.value)
	}

	const handleSearch = (e) => {
		e.preventDefault()
		if (inputValue.trim()) {
			navigate(`/search?foodName=${inputValue.trim()}`)
		}
	}
	const handleSuggestionClick = (suggestion) => {
		setInputvalue(suggestion.name)
		setSuggestion([])
		navigate(`/search?foodName=${suggestion.name}`)
	}
	return (
		<div>
			<form onSubmit={handleSearch}>
				<div className='relative w-full flex py-2 px-2 gap-2 items-center'>
					<span className='bi bi-search absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'></span>{' '}
					<input
						type='text'
						name='foodName'
						id='simple-search'
						className='w-full p-2.5 pl-10 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-sky-600' // Tailwind uppercase class added
						placeholder='Search food'
						autoComplete='off'
						value={inputValue ?? ''}
						required
						onChange={handleInputChange}
						onFocus={() => setIsSuggestionOpen(true)}
					/>
					<Button type='submit' className=' px-2'>
						<SearchIcon />
					</Button>
				</div>
				{isSuggestionOpen && suggestion.length > 0 && (
					<ul className='absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
						{suggestion.map((suggestion, index) => (
							<li
								key={index}
								className='px-4 py-2 text-gray-800 hover:bg-blue-100 cursor-pointer'
								onClick={() => handleSuggestionClick(suggestion)}
							>
								{/* Highlight matched portion */}
								{suggestion.name
									.split(new RegExp(`(${debouncedInput})`, 'gi'))
									.map((part, i) =>
										part.toLowerCase() === debouncedInput.toLowerCase() ? (
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
			</form>
		</div>
	)
}
