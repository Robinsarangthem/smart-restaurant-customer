import { Outlet } from 'react-router-dom'
import 'react-toastify/ReactToastify.min.css'
import Header from './Components/Header/Header'
import ScrollToTop from './Element/ScrollToTop'
import { useEffect } from 'react'
import { socket } from './Components/socket/socket'
import { useQueryClient } from '@tanstack/react-query'

function Layout() {
	const customerId = localStorage.getItem('id')
	const queryClient = useQueryClient()
	useEffect(() => {
		socket.on('test', (payload) => {
			// console.log('from backend', payload)
			queryClient.invalidateQueries({ queryKey: ['OrderList'] })
		})

		if (customerId) socket.emit('joinRoom', customerId)
	}, [])

	useEffect(() => {
		socket.on('testStatus', (payload) => {
			console.log('from backend', payload)
			queryClient.invalidateQueries({ queryKey: ['OrderList'] })
		})
	}, [])
	return (
		<>
			<ScrollToTop />
			<Header />
			<main className='min-h-[100lvh] bg-slate-200 pt-2 pb-2  '>
				<Outlet />
			</main>
		</>
	)
}

export default Layout
