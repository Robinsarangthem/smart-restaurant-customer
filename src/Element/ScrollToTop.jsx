import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
	const { pathname } = useLocation()

	useEffect(() => {
		const isLowEndDevice =
			navigator.userAgent.includes('Android') && window.devicePixelRatio < 2
		window.scrollTo({
			top: 0,
			behavior: isLowEndDevice ? 'auto' : 'smooth',
		})

		// Define a base title
		const baseTitle = 'Achaathak'
		// Create a title based on the current pathname
		const pathName =
			pathname === '/'
				? baseTitle
				: `${baseTitle} | ${
						pathname.replace('/', '').charAt(0).toUpperCase() +
						pathname.slice(2)
				  }`

		document.title = pathName
	}, [pathname])
	return null
}
