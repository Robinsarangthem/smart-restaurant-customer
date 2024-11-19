import { useContext } from 'react'
import AuthContext from '../context/AuthContext.jsx'
import { Axios } from '@/utils/axiosSetup.js'
import { error } from 'console'

export default function useAuth() {
	return useContext(AuthContext)
}
export const fetchSearchResults = async (foodName) => {
	const response = await Axios.get(`/api/food/find?foodName=${foodName}`)
	console.log(response.data)
	if (!response.ok) {
		throw new error('Error fetching search results')
	}
	const data = await response.json()
	console.log(data)

	return data?.data
}
