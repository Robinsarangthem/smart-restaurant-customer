import { useEffect, useState } from 'react'
import { useStore } from '../context'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Images/Achaathak (4).png'

import table from '../../../src/assets/Images/coffee-table.png'

import Logout from '../logout/Logout'
import Hamburger from 'hamburger-react'
import { Button } from '../ui/button'

function Header() {
	const [isToggle, setIsToggle] = useState(false)
	const { cart, search, setSearch } = useStore()

	const cartItemCount = cart.length
	const [tableNo, setTableNo] = useState()
	useEffect(() => {
		let table = localStorage.getItem('tables')
		table = JSON.parse(table)
		setTableNo(table)
	}, [])
	const handleOnClickToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	//
	return (
		<div className='w-full bg-customWhite sticky top-0 z-10 shadow-lg'>
			<div className='h-16 flex justify-between md:justify-around mx-auto px-[10px] md:px-8 items-center shadow-lg md:max-w-full md:mx-0 relative  '>
				<div className='flex gap-3 mx-2  h-[30px]'>
					{tableNo ? (
						<div className=' flex items-center gap-[10px] md:gap-4 lg:gap-4 bg-slate-100 rounded-md px-2  text-slate-500 s'>
							<img className='w-[17px]' src={table} />
							<p className='text-md md:text-lg lg:text-xl'>{tableNo}</p>
						</div>
					) : (
						''
					)}
					<NavLink
						to='/'
						onClick={handleOnClickToTop}
						className=' flex items-center md:pb-2  text-slate-800  font-semibold '
					>
						<img
							className='w-28  sm:w-28 md:w-36  '
							src={Logo}
							alt='Achaathak'
						/>
					</NavLink>
				</div>
				<nav className='  relative flex items-center text-slate-700 '>
					<ul className='  hidden md:flex md:space-x-9 '>
						<li className='   flex space-x-9 items-center text-lg  '>
							<NavLink to='/' className='hover:text-slate-400'>
								Home
							</NavLink>
							<NavLink to='/Contact' className='hover:text-slate-400'>
								Contact
							</NavLink>
							<NavLink to='/Orders' className='hover:text-slate-400'>
								Orders
							</NavLink>
							<NavLink to='/landing' className='hover:text-slate-400'>
								Qr Scanner
							</NavLink>
							<NavLink to='/carts' className='hover:text-slate-400'>
								<span className='  text-3xl bi bi-cart-fill '></span>
								{cartItemCount > 0 && (
									<div className='bg-orange-600 absolute -top-2 -right-2 rounded-full px-1  text-white text-sm shadow-lg'>
										{cartItemCount}
									</div>
								)}
							</NavLink>
						</li>
					</ul>
				</nav>
				{/* mobile screen cart icon */}
				<div className='flex items-center gap-[30px] relative'>
					<div className='  md:hidden text-slate-400 '>
						<NavLink to='/carts'>
							<span className='  text-2xl text-slate-800 bi bi-cart-fill '></span>
							{cartItemCount > 0 && (
								<div className='bg-orange-600 absolute -top-1 right-[45px] rounded-full  px-1  text-white text-sm shadow-lg'>
									{cartItemCount}
								</div>
							)}
						</NavLink>
					</div>
					<div className='pt-2 text-red-500'>
						<Logout />
					</div>
				</div>

				<div className='block md:hidden'>
					<Hamburger
						toggled={isToggle}
						toggle={setIsToggle}
						size={20}
						className='block  md:hidden w-8	 cursor-pointer'
					/>
					{isToggle && (
						<div
							className={`absolute top-[65px] right-[5px]  backdrop-blur-md bg-transparent  z-10 rounded-md  md:hidden text-xl  text-slate-700 ${
								isToggle ? 'animate-fade-in-down' : 'animate-fade-out-up'
							} `}
						>
							<ul className=' shadow-md overflow-hidden text-black min-h-[40%] w-full  flex flex-col justify-center  px-10 py-3 items-center space-y-5  '>
								<NavLink to='/' onClick={() => setIsToggle(!isToggle)}>
									<div className='block px-3 rounded-md py-2  hover:bg-sky-600 '>
										Home
									</div>
								</NavLink>
								<NavLink
									to='/Contact'
									className='block px-3 rounded-md py-2  hover:bg-sky-600'
									onClick={() => setIsToggle(!isToggle)}
								>
									Contact
								</NavLink>
								<NavLink
									to='/Orders'
									className='block px-3 rounded-md py-2  hover:bg-sky-600'
									onClick={() => setIsToggle(!isToggle)}
								>
									Orders
								</NavLink>
								<NavLink
									to='/carts'
									className='block px-3 rounded-md py-2  hover:bg-sky-600'
									onClick={() => setIsToggle(!isToggle)}
								>
									<span className='text-3xl bi bi-cart-fill '></span>
								</NavLink>
								<NavLink
									to='/landing'
									className='block px-3 rounded-md py-2  '
									onClick={() => setIsToggle(!isToggle)}
								>
									<Button> Qr Scanner </Button>
								</NavLink>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Header
