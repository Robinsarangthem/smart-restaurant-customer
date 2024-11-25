import React, {
	useEffect,
	useRef,
	useState,
	useCallback,
	Suspense,
} from 'react'
import { useFoodList } from '../hooks/useFoodList'
import { Button } from '../ui/button'
import { PropagateLoader } from 'react-spinners'
import FilterChabora from './FilterChabora'
const FoodCard = React.lazy(() => import('./FoodCard'))
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	FreeMode,
	Navigation,
	Autoplay,
	Pagination,
	Virtual,
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import rooftopcafe from './../../assets/Images/rooftopcafe.jpg'
import extd from '../../assets/Images/eXtd.1902.jpg'
import RoofTo2pCafe from './RoofTopCafe'
import RoofTopCafe from './RoofTopCafe'
const FoodDisplay = ({ category }) => {
	const { data, isLoading } = useFoodList()
	const [displayedItems, setDisplayedItems] = useState(10) // Initial number of items
	const lastCardRef = useRef()
	const [loading, setLoading] = useState(false)
	// Filter products based on the selected category
	const productsWithCategory = data?.filter((product) => {
		return category === 'All' || product.category === category
	})
	//filterChabora 1902
	const filteredChaBora1902 = data?.filter(
		(product) => product.category === 'ChaBora 1902'
	)
	const filteredRoofTopCafe = data?.filter(
		(product) => product.category === 'RoofTop Cafe'
	)

	// Load more items when the last item is in view
	const loadMoreItems = () => {
		if (loading) return
		setLoading(true)
		setTimeout(() => {
			setDisplayedItems((prevCount) => prevCount + 10) // Load 10 more items
			setLoading(false)
		}, 500)
	}
	const isAllItemsLoaded = displayedItems >= productsWithCategory.length

	const handleObserver = useCallback(
		(entries) => {
			const target = entries[0]
			if (target.isIntersecting) {
				loadMoreItems()
			}
		},
		[loading]
	)
	const menuRef = useRef()
	const scrollToMenu = () => {
		if (menuRef.current) {
			const elementPosition =
				menuRef.current.getBoundingClientRect().top + window.pageYOffset
			const offsetPosition = elementPosition - 70 // Adjust for fixed header (60px)

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			})
		}
	}

	useEffect(() => {
		if (category === 'All') {
			window.scrollTo({
				top: 0,
				behavior: 'smooth', // Smooth scroll to top
			})
		} else {
			scrollToMenu()
		}
	}, [category])

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 0.5,
		}
		const currentObserver = new IntersectionObserver(handleObserver, option)
		if (lastCardRef.current) {
			currentObserver.observe(lastCardRef.current)
		}
		return () => {
			if (lastCardRef.current) {
				currentObserver.unobserve(lastCardRef.current)
			}
		}
	}, [handleObserver, lastCardRef])

	// if (isLoading) {
	// 	return (
	// 		<div className='flex justify-center items-center min-h-[100svh]'>
	// 			<PropagateLoader color='blue' />
	// 		</div>
	// 	)
	// }
	const FilterMemoized = React.memo(FilterChabora)

	const isMobile = window.innerWidth < 768
	const mobileSpeed = isMobile ? 300 : 500

	return (
		<>
			<div className=' flex items-center justify-center   mt-2   '>
				<div className='	flex items-center	gap-2  p-[5px] bg-customWhite rounded-md font-sans shadow-md'>
					<img
						src={extd}
						width={50}
						height={50}
						className=' w-[90px] h-[50px]  rounded-md'
					/>
					<h1 className='text-[12px]  p-2   text-customBlack  font-sans md:text-lg font-semibold md:text-center'>
						eXtd.1902
					</h1>
				</div>
			</div>

			<div className='w-full   mx-auto 	'>
				<Swiper
					modules={[Navigation, Pagination, Autoplay, FreeMode, Virtual]}
					spaceBetween={10}
					slidesPerView={isMobile ? 2 : 3}
					navigation={!isMobile}
					loop={true}
					touchRatio={0.7}
					// freeMode={true}
					// resistanceRatio={0.85}
					// watchOverflow={true}
					className='rounded-md swiper-container'
					breakpoints={{
						320: { slidesPerView: 2, spaceBetween: 10 },
						550: { slidesPerView: 2, spaceBetween: 8 },
						640: { slidesPerView: 2, spaceBetween: 15 },
						1024: { slidesPerView: 4, spaceBetween: 20 },
						1280: { slidesPerView: 5, spaceBetween: 25 },
					}}
					speed={mobileSpeed}
					touchEventsTarget='container'
					touchStartPreventDefault={true}
					virtual
				>
					{filteredChaBora1902?.length > 0 ? (
						filteredChaBora1902?.map((product, idx) => (
							<SwiperSlide
								key={idx}
								className=' px-[8px] p-2 transform-gpu transition-transform duration-500 ease-in-out '
								style={{ backfaceVisibility: 'hidden' }}
							>
								<FilterMemoized product={product} isLoading={isLoading} />
							</SwiperSlide>
						))
					) : (
						<div className='text-customRed text-center'>
							No products available
						</div> // Fallback message
					)}
				</Swiper>
			</div>
			<div className='border-b-4 border-orange-400'></div>
			<div className=' flex items-center justify-center  mx-2 mt-2  '>
				<div className='	flex items-center	gap-2  p-[3px] bg-customWhite rounded-md font-sans shadow-md'>
					<img
						src={rooftopcafe}
						width={90}
						height={90}
						className=' w-[90px] h-[60px]  rounded-md'
					/>
					<h2 className='uppercase text-[12px]  p-2	  text-customBlack  font-sans md:text-lg font-semibold md:text-center	'>
						cha bora
					</h2>
				</div>
			</div>
			<div className='w-full   mx-auto px-1 	'>
				<Swiper
					modules={[Navigation, Pagination, Autoplay, FreeMode, Virtual]}
					spaceBetween={10}
					slidesPerView={isMobile ? 2 : 3}
					navigation={!isMobile}
					loop={true}
					touchRatio={0.7}
					// freeMode={true}
					// resistanceRatio={0.85}
					// watchOverflow={true}
					className='rounded-md swiper-container'
					breakpoints={{
						320: { slidesPerView: 2, spaceBetween: 10 },
						550: { slidesPerView: 2, spaceBetween: 8 },
						// 640: { slidesPerView: 3, spaceBetween: 15 },
						1024: { slidesPerView: 4, spaceBetween: 20 },
						1280: { slidesPerView: 5, spaceBetween: 25 },
					}}
					speed={mobileSpeed}
					touchEventsTarget='container'
					touchStartPreventDefault={true}
					virtual
				>
					{filteredRoofTopCafe?.length > 0 ? (
						filteredRoofTopCafe.map((product, idx) => (
							<SwiperSlide
								key={idx}
								className=' px-[8px] p-2 transform-gpu transition-transform duration-500 ease-in-out '
								style={{ backfaceVisibility: 'hidden' }}
							>
								<RoofTopCafe product={product} isLoading={isLoading} />
							</SwiperSlide>
						))
					) : (
						<div className='text-customRed text-center'>
							No products available
						</div> // Fallback message
					)}
				</Swiper>
			</div>
			<div className='border-b-4 border-orange-400 mx-8'></div>
			<Suspense fallback={<PropagateLoader />}>
				<h1
					ref={menuRef}
					className='text-xl p-2 text-slate-700 font-sans md:text-2xl font-semibold md:text-center'
				>
					{category === 'All' ? 'Menu ' : <p>{category}</p>}
				</h1>
				<div className='	place-items-center grid grid-cols-2 mobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-5 gap-4 p-2 mobile:p-5 overflow-hidden'>
					{productsWithCategory
						.slice(0, displayedItems)
						.map((product, index) => (
							<div
								key={product._id}
								className='bg-customWhite overflow-hidden rounded-lg shadow-md transform-gpu will-change-transform'
								style={{
									contain: 'paint layout style',
									backfaceVisibility: 'hidden',
									scrollBehavior: 'smooth',
								}}
								ref={index === displayedItems - 1 ? lastCardRef : null}
							>
								<FoodCard product={product} isLoading={isLoading} />
							</div>
						))}
				</div>
			</Suspense>
			<div className='flex justify-center py-6'>
				{!isAllItemsLoaded && (
					<div className='flex justify-center py-6'>
						<Button
							className='bg-customRed hover:bg-red-600'
							onClick={loadMoreItems}
							disabled={loading}
						>
							{loading ? 'Loading...' : 'Load more'}
						</Button>
					</div>
				)}
			</div>
		</>
	)
}

export default React.memo(FoodDisplay)
