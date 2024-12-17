import { createContext, useContext, useEffect, useState } from 'react'
import { Axios } from '../utils/axiosSetup'
import { json } from 'react-router-dom'
const StoreContext = createContext()

export const StoreContextProvider = ({ children }) => {
	const [search, setSearch] = useState(false)

	// handleAddToCart
	const [cart, setCart] = useState([])
	useEffect(() => {
		const savedCart = JSON.parse(localStorage.getItem('newCart')) || []
		setCart(savedCart)
	}, [])

	const addToCart = (item) => {
		const index = cart.findIndex((cartItems) => cartItems._id === item._id)

		if (index === -1) {
			const newCart = [...cart, { ...item, quantity: 1 }]
			setCart(newCart)
			localStorage.setItem('newCart', JSON.stringify(newCart))
			return
		}

		const newCart = cart.map((cartItems, i) =>
			i === index
				? { ...cartItems, quantity: cartItems.quantity + 1 }
				: cartItems
		)
		setCart(newCart)
		localStorage.setItem('newCart', JSON.stringify(newCart))
	}

	const removeFromCart = (itemId) => {
		const newCart = cart
			.map((cartItems) =>
				cartItems._id === itemId && cartItems.quantity > 0
					? { ...cartItems, quantity: cartItems.quantity - 1 }
					: cartItems
			)
			.filter((cartItems) => cartItems.quantity > 0)
		setCart(newCart)
		localStorage.setItem('newCart', JSON.stringify(newCart))
	}
	const deleteCart = (id) => {
		const newCart = cart.filter((cartItems) => cartItems._id !== id)
		setCart(newCart)
		localStorage.setItem('newCart', JSON.stringify(newCart))
	}
	const clearCart = () => {
		setCart([])
		localStorage.removeItem('newCart')
	}

	const value = {
		cart,
		addToCart,
		removeFromCart,
		clearCart,
		deleteCart,
	}

	return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export const useStore = () => useContext(StoreContext)
