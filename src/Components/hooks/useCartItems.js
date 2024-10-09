import { useEffect, useState } from "react"

export default function useCartItems(key, initialValue = []) {
	const [cartItems, setCartItems] = useState(() => {
		try {
			const items = localStorage.getItem(key)
			return items ? JSON.parse(items) : initialValue
		} catch (error) {
			console.error(error)
			return initialValue
		}
	})

	useEffect(() => {
		try {
			window.localStorage.setItem(key, JSON.stringify(cartItems))
		} catch (error) {
			console.error(error)
		}
	}, [key, cartItems])

	return [cartItems, setCartItems]
}
