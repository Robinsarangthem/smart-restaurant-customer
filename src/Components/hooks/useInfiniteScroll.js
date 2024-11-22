import { useEffect, useRef } from 'react'

export const useInfiniteScroll = (
	isLoading,
	loadMoreItems,
	totalItems,
	currentCount
) => {
	const lastCardRef = useRef()
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !isLoading) {
					loadMoreItems()
				}
			},
			{ root: null, rootMargin: '20px', threshold: 0.5 }
		)

		if (lastCardRef.current && currentCount < totalItems) {
			observer.observe(lastCardRef.current)
		}
		return () => {
			if (lastCardRef.current) observer.unobserve(lastCardRef.current)
		}
	}, [isLoading, loadMoreItems, totalItems, currentCount])
	return lastCardRef
}
