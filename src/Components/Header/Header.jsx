import useCartStore from '@/store/useCartStore'
import Hamburger from 'hamburger-react'
import { ClipboardList, Home, Phone, QrCode, ShoppingBag } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import table from '../../../src/assets/Images/coffee-table.png'
import Logout from '../logout/Logout'
import { Button } from '../ui/button'

function Header({ restaurant }) {
	const itemCount = useCartStore((state) => state.itemCount)
	const [isToggle, setIsToggle] = useState(false)
	const { tableNo } = useParams()
	const [dominantColor, setDominantColor] = useState('')

	useEffect(() => {
		// Get dominant color from logo when it loads
		if (restaurant?.logo) {
			const img = new Image()
			img.crossOrigin = 'Anonymous'
			img.src = restaurant.logo
			img.onload = () => {
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				canvas.width = img.width
				canvas.height = img.height
				ctx.drawImage(img, 0, 0)
				const imageData = ctx.getImageData(
					0,
					0,
					canvas.width,
					canvas.height
				).data
				let r = 0
				let g = 0
				let b = 0
				for (let i = 0; i < imageData.length; i += 4) {
					r += imageData[i]
					g += imageData[i + 1]
					b += imageData[i + 2]
				}
				const pixels = imageData.length / 4
				const avgR = Math.round(r / pixels)
				const avgG = Math.round(g / pixels)
				const avgB = Math.round(b / pixels)
				setDominantColor(`rgb(${avgR}, ${avgG}, ${avgB})`)
			}
		}
	}, [restaurant?.logo])

	// useEffect(() => {
	//   let table = localStorage.getItem('tables');
	//   table = JSON.parse(table);
	//   setTableNo(table);
	// }, []);

	useEffect(() => {
		// Prevent body scroll when mobile menu is open
		if (isToggle) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}

		// Cleanup on unmount
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isToggle])

	const handleOnClickToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		<header className='w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100'>
			<div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<div className='flex items-center space-x-4'>
						{tableNo && (
							<div className='flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full px-3 py-1.5 text-blue-700'>
								<img className='w-4 h-4' src={table} alt='Table icon' />
								<span className='text-sm font-medium'>{tableNo}</span>
							</div>
						)}

						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}`}
							onClick={handleOnClickToTop}
							className='flex items-center space-x-2 hover:opacity-80 transition-opacity'
						>
							<img
								className='h-10 w-10 object-contain rounded-full p-1 shadow-md hover:shadow-lg transition-shadow duration-300'
								style={{
									background: dominantColor
										? `linear-gradient(135deg, ${dominantColor}33, ${dominantColor}66)`
										: 'linear-gradient(135deg, #E2E8F0, #CBD5E1)',
								}}
								src={restaurant?.logo}
								alt={restaurant?.name}
							/>
							<span className='text-sm md:text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
								{restaurant?.name}
							</span>
						</NavLink>
					</div>

					<nav className='hidden xl:flex items-center space-x-8'>
						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}`}
							className='nav-link flex gap-1 items-center justify-center group'
						>
							<div className='p-2 rounded-lg transition-colors group-hover:bg-gradient-to-br group-hover:from-blue-100 group-hover:to-blue-50'>
								<Home className='w-5 h-5 transition-colors group-hover:text-blue-600' />
							</div>
							<p className='text-sm group-hover:text-blue-600 transition-colors'>
								Home
							</p>
						</NavLink>
						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}/Contact`}
							className='nav-link flex gap-1 items-center justify-center group'
						>
							<div className='p-2 rounded-lg transition-colors group-hover:bg-gradient-to-br group-hover:from-green-100 group-hover:to-green-50'>
								<Phone className='w-5 h-5 transition-colors group-hover:text-green-600' />
							</div>
							<p className='text-sm group-hover:text-green-600 transition-colors'>
								Contact
							</p>
						</NavLink>
						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}/order-summary`}
							className='nav-link flex gap-1 items-center justify-center group'
						>
							<div className='p-2 rounded-lg transition-colors group-hover:bg-gradient-to-br group-hover:from-purple-100 group-hover:to-purple-50'>
								<ClipboardList className='w-5 h-5 transition-colors group-hover:text-purple-600' />
							</div>
							<p className='text-sm group-hover:text-purple-600 transition-colors'>
								Orders
							</p>
						</NavLink>
						<NavLink
							to={`/landing`}
							className='nav-link flex gap-1 items-center justify-center group'
						>
							<div className='p-2 rounded-lg transition-colors group-hover:bg-gradient-to-br group-hover:from-amber-100 group-hover:to-amber-50'>
								<QrCode className='w-5 h-5 transition-colors group-hover:text-amber-600' />
							</div>
							<p className='text-sm group-hover:text-amber-600 transition-colors'>
								QR Scanner
							</p>
						</NavLink>
						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}/cart`}
							className='relative group flex gap-1 items-center justify-center'
						>
							<div className='p-2 rounded-lg transition-colors group-hover:bg-gradient-to-br group-hover:from-rose-100 group-hover:to-rose-50'>
								<ShoppingBag className='w-5 h-5 transition-colors group-hover:text-rose-600' />
							</div>
							{itemCount > 0 && (
								<div className='absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse'>
									{itemCount}
								</div>
							)}
						</NavLink>
						<div className='pl-4 border-l border-gray-200'>
							<Logout />
						</div>
					</nav>

					<div className='flex xl:hidden items-center space-x-4'>
						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}/cart`}
							className='relative flex items-center group'
						>
							<div className='p-2 rounded-lg transition-colors group-hover:bg-gradient-to-br group-hover:from-rose-100 group-hover:to-rose-50'>
								<ShoppingBag className='w-5 h-5 transition-colors group-hover:text-rose-600' />
							</div>
							{itemCount > 0 && (
								<div className='absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center'>
									{itemCount}
								</div>
							)}
						</NavLink>

						<button
							type='button'
							className='relative z-[1002]'
							aria-label='Toggle Menu'
						>
							<Hamburger
								toggled={isToggle}
								toggle={setIsToggle}
								size={20}
								color='#4B5563'
							/>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu overlay */}
			<div
				className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 xl:hidden z-[1000] ${
					isToggle ? 'opacity-100' : 'opacity-0 pointer-events-none'
				}`}
				onClick={() => setIsToggle(false)}
				onKeyDown={(e) => e.key === 'Escape' && setIsToggle(false)}
				role='button'
				tabIndex={0}
			/>

			{/* Mobile menu */}
			<div
				className={`xl:hidden fixed z-[1001] inset-0 bg-white/90 backdrop-blur-md shadow-xl transform transition-transform duration-300 ease-in-out ${
					isToggle ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='min-h-screen bg-white overflow-y-auto pt-20 pb-6 px-4'>
					<nav className='space-y-3 grid'>
						<div className='flex items-center justify-between mb-6'>
							<h2 className='text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'>
								Menu
							</h2>
							<div className='h-0.5 flex-1 ml-4 bg-gradient-to-r from-gray-200 to-transparent' />
						</div>

						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}`}
							className='mobile-nav-link bg-gradient-to-r hover:from-blue-50 hover:to-transparent'
							onClick={() => setIsToggle(false)}
						>
							<div className='flex items-center'>
								<div className='p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 mr-3'>
									<Home className='w-5 h-5 text-blue-600' />
								</div>
								<span>Home</span>
							</div>
						</NavLink>

						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}/Contact`}
							className='mobile-nav-link bg-gradient-to-r hover:from-blue-50 hover:to-transparent'
							onClick={() => setIsToggle(false)}
						>
							<div className='flex items-center'>
								<div className='p-2 rounded-lg bg-gradient-to-br from-green-100 to-green-50 mr-3'>
									<Phone className='w-5 h-5 text-green-600' />
								</div>
								<span>Contact</span>
							</div>
						</NavLink>

						<NavLink
							to={`/restaurant/${restaurant?.slug}/${tableNo}/order-summary`}
							className='mobile-nav-link bg-gradient-to-r hover:from-blue-50 hover:to-transparent'
							onClick={() => setIsToggle(false)}
						>
							<div className='flex items-center'>
								<div className='p-2 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 mr-3'>
									<ClipboardList className='w-5 h-5 text-purple-600' />
								</div>
								<span>Orders</span>
							</div>
						</NavLink>

						<NavLink
							to={`/landing`}
							className='block'
							onClick={() => setIsToggle(false)}
						>
							<Button className='w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3 py-6'>
								<div className='p-2 rounded-lg bg-blue-400/30'>
									<QrCode className='w-5 h-5' />
								</div>
								<span className='font-medium'>QR Scanner</span>
							</Button>
						</NavLink>

						<button
							type='button'
							className='pt-6 mt-4 border-t border-gray-200 cursor-pointer'
							onClick={() => setIsToggle(false)}
						>
							<div className='flex items-center text-gray-700 hover:text-red-600 rounded-lg transition-colors'>
								<div className='p-2 w-full rounded-lg'>
									<Logout />
								</div>
							</div>
						</button>
					</nav>
				</div>
			</div>

			<style jsx>{`
				.nav-link {
					@apply text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center;
				}
				.nav-link:hover svg {
					@apply text-blue-600;
				}
				.mobile-nav-link {
					@apply flex items-center px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors font-medium;
				}
				.mobile-nav-link:hover svg {
					@apply text-blue-600;
				}
			`}</style>
		</header>
	)
}

export default Header
