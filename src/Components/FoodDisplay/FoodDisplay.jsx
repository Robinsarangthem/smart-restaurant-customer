import React, {
	useEffect,
	useRef,
	useState,
	useCallback,
	Suspense,
} from 'react'
import { useFoodList } from '../hooks/useFoodList'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { PropagateLoader } from 'react-spinners'
import FilterChabora from './FilterChabora'
import { Footprints } from 'lucide-react'
const FoodCard = React.lazy(() => import('./FoodCard'))
const FoodDisplay = ({ category }) => {
	const { data, isLoading } = useFoodList()
	const [displayedItems, setDisplayedItems] = useState(10) // Initial number of items
	const lastCardRef = useRef()

	// Filter products based on the selected category
	const productsWithCategory = data?.filter((product) => {
		return category === 'All' || product.category === category
	})
	//filterChabora 1902
	const filteredChaBora1902 = data?.filter(
		(product) => product.category === 'ChaBora 1902'
	)
	console.log(filteredChaBora1902)

	// Load more items when the last item is in view
	const loadMoreItems = () => {
		setDisplayedItems((prevCount) => prevCount + 10) // Load 10 more items
	}

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

	return (
		<div>
			<h1 className='text-xl p-2   text-customBlack  font-sans md:text-2xl font-semibold md:text-center'>
				ChaBora 1902
			</h1>
			<div className='place-items-center grid grid-cols-2 mobile:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5 gap-4 p-2 mobile:p-5'>
				{filteredChaBora1902?.map((product, idx) => (
					<FilterChabora key={idx} product={product} isLoading={isLoading} />
				))}
			</div>
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
				<Button className='bg-customBlue ' onClick={loadMoreItems}>
					Load more
				</Button>
			</div>
		</div>
	)
}

export default FoodDisplay
