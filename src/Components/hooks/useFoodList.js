import { useContext } from 'react'
import FoodContext from '../../context/FoodContext'

export const useFoodList = () => {
	return useContext(FoodContext)
}
