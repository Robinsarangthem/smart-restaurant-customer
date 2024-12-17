import React, { Children, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useParams } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { socket } from '../Components/socket/socket'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem('token') ? true : false
	)
	const params = useParams()

	const [token, setToken] = useState(null)
	const queryClient = useQueryClient()

	useEffect(() => {
		const checkStatus = () => {
			const tokenFromLocalStorage = localStorage.getItem('token')
			if (tokenFromLocalStorage) {
				setIsAuthenticated(true)
				setToken(tokenFromLocalStorage)
			} else {
				setIsAuthenticated(false)
				setToken(null)
			}
		}
		checkStatus()

		socket.on('connect', () => console.log('connected'))
	}, [])

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, setToken, token, params }}
		>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext
