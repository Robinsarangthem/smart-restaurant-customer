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
import Carousel from 'react-multi-carousel'
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
import ScrollToTop from '@/Element/ScrollToTop'
import rooftopcafe from './../../assets/Images/rooftopcafe.jpg'
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

	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-[100svh]'>
				<PropagateLoader color='blue' />
			</div>
		)
	}
	const FilterMemoized = React.memo(FilterChabora)

	const isMobile = window.innerWidth < 768
	const mobileSpeed = isMobile ? 300 : 500

	return (
		<div>
			<h1 className='text-xl p-2   text-customBlack  font-sans md:text-2xl font-semibold md:text-center'>
				ChaBora 1902
			</h1>
			{/* <Carousel
				className='py-4		flex  gap-5'
				responsive={responsive}
				swipeable={true}
				draggable={false}
				showDots={false}
				ssr={true}
				infinite={false}
				// autoPlay={true}
				autoPlaySpeed={2000}
				keyBoardControl={true}
				customTransition='transform 0.5s ease-in-out'
				transitionDuration={400}
				containerClass='carousel-container'
				// removeArrowOnDeviceType={['tablet', 'mobile']}
				// deviceType={this.props.deviceType}
				dotListClass='custom-dot-list-style'
				itemClass='carousel-item transform-gpu transition-transform duration-300 ease-in-out will-change-transform'
				// additionalTransfrom={displayedItems}
				pauseOnHover={true}
			> */}

			<div className='w-full   mx-auto px-3 p-2	'>
				<Swiper
					modules={[Navigation, Pagination, Autoplay, FreeMode, Virtual]}
					spaceBetween={10}
					slidesPerView={isMobile ? 2 : 3}
					navigation={!isMobile}
					loop={true}
					touchRatio={1}
					freeMode
					freeModeMomentum // Enable smooth momentum scrolling
					freeModeMomentumRatio={0.3} // Adjust to control momentum
					freeModeSticky={false} // Disable snapping to the closest slide
					watchOverflow={true}
					className='rounded-md swiper-container'
					breakpoints={{
						320: { slidesPerView: 2, spaceBetween: 2 },
						640: { slidesPerView: 3 },
						768: { slidesPerView: 4 },
						1024: { slidesPerView: 5 },
					}}
					speed={mobileSpeed}
					touchEventsTarget='container'
					touchStartPreventDefault={true}
					virtual
				>
					{filteredChaBora1902?.length > 0 ? (
						filteredChaBora1902.map((product, idx) => (
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
			{/* </Carousel> */}
			<div className='border-b-4 border-orange-400'></div>
			<div className=' flex items-center md:justify-center  mx-2 mt-2  '>
				<div className='	flex items-center  p-2 bg-customWhite rounded-md font-sans shadow-md'>
					<img
						src={rooftopcafe}
						width={100}
						height={100}
						className='  rounded-md'
					/>
					<h2 className='uppercase text-md p-2   text-customBlack  font-sans md:text-xl font-semibold md:text-center	'>
						rooftop Cafe
					</h2>
				</div>
			</div>
			<div className='w-full   mx-auto px-3 p-2	'>
				<Swiper
					modules={[Navigation, Pagination, Autoplay, FreeMode, Virtual]}
					spaceBetween={10}
					slidesPerView={isMobile ? 2 : 3}
					navigation={!isMobile}
					loop={true}
					touchRatio={1}
					freeMode
					freeModeMomentum // Enable smooth momentum scrolling
					freeModeMomentumRatio={0.3} // Adjust to control momentum
					freeModeSticky={false} // Disable snapping to the closest slide
					watchOverflow={true}
					className='rounded-md swiper-container'
					breakpoints={{
						320: { slidesPerView: 2, spaceBetween: 2 },
						640: { slidesPerView: 3 },
						768: { slidesPerView: 4 },
						1024: { slidesPerView: 5 },
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
			<div className='border-b-4 border-orange-400'></div>
			<h1
				ref={menuRef}
				className='text-xl p-2 text-slate-700 font-sans md:text-2xl font-semibold md:text-center'
			>
				{category === 'All' ? 'Menu ' : <p>{category}</p>}
			</h1>
			<div className='place-items-center grid grid-cols-2 mobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 gap-4 p-2 mobile:p-5'>
				{productsWithCategory.slice(0, displayedItems).map((product, index) => (
					<div
						key={product._id}
						className='transform-gpu will-change-transform'
						style={{
							contain: 'paint layout style',
							backfaceVisibility: 'hidden',
							scrollBehavior: 'smooth',
						}}
						ref={index === displayedItems - 1 ? lastCardRef : null}
					>
						<Suspense fallback={<PropagateLoader />}>
							<FoodCard product={product} isLoading={isLoading} />
						</Suspense>
					</div>
				))}
			</div>
			<div className='flex justify-center py-6'>
				{!isAllItemsLoaded && (
					<div className='flex justify-center py-6'>
						<Button
							className='bg-customRed hover:bg-red-600'
							onClick={loadMoreItems}
							disabled={loading} // Disable while loading
						>
							{loading ? 'Loading...' : 'Load more'}
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default FoodDisplay
