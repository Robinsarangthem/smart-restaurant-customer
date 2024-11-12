import { Outlet } from 'react-router-dom'
import 'react-toastify/ReactToastify.min.css'
import Header from './Components/Header/Header'
import ScrollToTop from './Element/ScrollToTop'
import { useEffect, useState } from 'react'
import { socket } from './Components/socket/socket'
import { useQueryClient } from '@tanstack/react-query'
import { time } from 'console'
import LogoLoading from './Element/LogoLoading'

function Layout() {
	const customerId = localStorage.getItem('id')
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const timeout = setTimeout(() => {
			setLoading(false)
		}, 2000)

		socket.on('test', (payload) => {
			// console.log('from backend', payload)
			queryClient.invalidateQueries({ queryKey: ['OrderList'] })
		})

		if (customerId) socket.emit('joinRoom', customerId)
		return () => {
			clearTimeout(timeout)
		}
	}, [])

	useEffect(() => {
		socket.on('testStatus', (payload) => {
			console.log('from backend', payload)
			queryClient.invalidateQueries({ queryKey: ['OrderList'] })
		})
	}, [])
	return loading ? (
		<div className='h-screen flex justify-center items-center bg-gray-100'>
			<LogoLoading /> {/* Your loading logo/spinner */}
		</div>
	) : (
		<>
			<ScrollToTop />
			<Header />
			<main
				className='h-full bg-slate-200 pt-2 pb-2'
				style={{ scrollBehavior: 'smooth' }}
			>
				<Outlet />
			</main>
		</>
	)
}

export default Layout
