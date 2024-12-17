import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { Axios } from '../utils/axiosSetup'
import { useQuery } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const FoodContext = createContext(null)
export const FoodListProvider = ({ children }) => {
	const [foodList, setFoodList] = useState([])

	const fetchALlFoodList = async () => {
		const response = await Axios.get('/api/food/foodList')
		setFoodList(response.data.Data)
	}
	const { data, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: ['food'],
		queryFn: async () => {
			return Axios.get('/api/food/foodList').then((data) => data.data.Data)
		},
		staleTime: 5 * 60 * 1000,
		cacheTime: 30 * 60 * 1000,
		enabled: true,
	})
	useEffect(() => {
		if (isSuccess) {
			setFoodList(data)
		}
	}, [isSuccess, data])

	const allData = useMemo(() => {
		return {
			data: foodList,
			isLoading,
			isError,
			isSuccess,
			error,
			setFoodList,
			fetchALlFoodList,
		}
	}, [foodList, isLoading, isError, error, isSuccess, setFoodList])

	return (
		<>
			<FoodContext.Provider value={allData}>{children}</FoodContext.Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</>
	)
}
export default FoodContext
