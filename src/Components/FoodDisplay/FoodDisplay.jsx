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
import 'react-multi-carousel/lib/styles.css'
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

	const handleObserver = useCallback((entries) => {
		const target = entries[0]
		if (target.isIntersecting) {
			loadMoreItems()
		}
	}, [])

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '20px',
			threshold: 1.0,
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
	}, [handleObserver])
	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-[100svh]'>
				<PropagateLoader color='blue' />
			</div>
		)
	}
	const FilterMemoized = React.memo(FilterChabora)
	//for carousel only
	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 5,
			partialVisibilityGutter: 0,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
			partialVisibilityGutter: 50,
		},
		mobile: {
			breakpoint: { max: 600, min: 0 },
			items: 2,
			partialVisibilityGutter: 40,
		},
	}
	return (
		<div>
			<h1 className='text-xl p-2   text-customBlack  font-sans md:text-2xl font-semibold md:text-center'>
				ChaBora 1902
			</h1>
			<Carousel
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
			>
				{filteredChaBora1902?.length > 0 ? (
					filteredChaBora1902.map((product, idx) => (
						<div className=' mr-[10px] md:p-3 '>
							<FilterMemoized
								key={idx}
								product={product}
								isLoading={isLoading}
							/>
						</div>
					))
				) : (
					<div>No products available</div> // Fallback message
				)}
			</Carousel>
			<div className='border-b-4 border-orange-400'></div>
			<h1 className='text-xl p-2 text-slate-700 font-sans md:text-2xl font-semibold md:text-center'>
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
