import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CustomPrevArrow = (props) => {
	const { onClick } = props
	return (
		<div
			className=' slick-prev slick-arrow  '
			onClick={onClick}
			style={{
				display: 'flex', // Align icon inside the container
				alignItems: 'center', // Center the icon vertically
				justifyContent: 'center', // Center the icon horizontally
				width: '15px',
				height: '15px',
				padding: '10px',
				zIndex: 1,
				left: '-0px', // Adjust left position if needed
				top: '52%',
				cursor: 'pointer',
				transform: 'translateY(-50%)',
				borderRadius: '50%',
				backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark background
			}}
		></div>
	)
}

const CustomNextArrow = (props) => {
	const { onClick } = props
	return (
		<div
			className='slick-arrow slick-next bg-black'
			onClick={onClick}
			style={{
				display: 'flex', // Align icon inside the container
				alignItems: 'center', // Center the icon vertically
				justifyContent: 'center', // Center the icon horizontally
				width: '15px', // Set width for the circle
				height: '15px', // Set height for the circle
				padding: '10px',
				zIndex: 1,
				right: '-0px', // Adjust right position if needed
				top: '50%',
				cursor: 'pointer',
				transform: 'translateY(-50%)',
				borderRadius: '50%',
				backgroundColor: 'rgba(0, 0, 0, 0.7)',
			}}
		></div>
	)
}

const Categories = ({ category, setCategory, categoryList }) => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 3,
		arrows: true,
		prevArrow: <CustomPrevArrow />,
		nextArrow: <CustomNextArrow />,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
				},
			},
		],
	}

	return (
		<div className='relative max-w-full pb-4 border-b-4 border-orange-400 px-2 '>
			<span className='block text-xl font-bold text-slate-700 pb-4'>
				Categories
			</span>
			<div className='scroller no-scrollbar overflow-hidden px-[0px]'>
				<Slider {...settings}>
					{categoryList?.list.map((menu, index) => (
						<div key={index} className='flex items-center justify-center '>
							<li
								className={` flex items-center justify-center rounded-lg drop-shadow-md m-2 transform-gpu transition-transform duration-500 ease-in-out ${
									category !== menu?.category
										? 'bg-slate-100'
										: 'bg-orange-400 text-slate-100 scale-110'
								} min-w-[6rem] md:min-w-44`}
								onClick={() => setCategory(menu?.category)}
							>
								<div className='flex items-center p-2'>
									<span className='text-[12px] mobile:text-sm	 font-medium drop-shadow-md'>
										{menu?.category}
									</span>
								</div>
							</li>
						</div>
					))}
				</Slider>
			</div>
		</div>
	)
}

export default Categories

// import '../../../src/index.css'
// import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
// import { useState, useEffect } from 'react'

// const Categories = ({ category, setCategory, categoryList }) => {
// 	const [visibleCategories, setVisibleCategories] = useState([])
// 	const [startIndex, setStartIndex] = useState(0)
// 	const itemsToShow = 3 // Number of categories to show at once

// 	useEffect(() => {
// 		updateVisibleCategories()
// 	}, [categoryList, startIndex])

// 	const updateVisibleCategories = () => {
// 		if (!categoryList?.list) return
// 		const listLength = categoryList.list.length

// 		// Calculate the new visible categories based on the startIndex
// 		let newVisibleCategories = []
// 		for (let i = 0; i < itemsToShow; i++) {
// 			const index = startIndex + i // Calculate the index without wrapping
// 			if (index < listLength) {
// 				// Ensure we don't go out of bounds
// 				newVisibleCategories.push({
// 					...categoryList.list[index],
// 					key: `${startIndex}-${index}`,
// 				})
// 			}
// 		}
// 		setVisibleCategories(newVisibleCategories)
// 	}

// 	const prevSlide = () => {
// 		if (startIndex > 0) {
// 			setStartIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0)) // Move back by itemsToShow
// 		}
// 	}

// 	const nextSlide = () => {
// 		if (startIndex + itemsToShow < categoryList?.list.length) {
// 			setStartIndex((prevIndex) =>
// 				Math.min(
// 					prevIndex + itemsToShow,
// 					categoryList.list.length - itemsToShow
// 				)
// 			) // Move forward by itemsToShow
// 		}
// 	}

// 	const isPrevDisabled = startIndex === 0
// 	const isNextDisabled = startIndex + itemsToShow >= categoryList?.list.length

// 	return (
// 		<div className='relative max-w-full py-8 border-b-4 border-orange-400 px-2'>
// 			<span className='block text-xl font-bold text-slate-700 pb-4'>
// 				Categories
// 			</span>
// 			<div className='flex items-center gap-2'>
// 				<button
// 					onClick={prevSlide}
// 					className={`left-2 rounded-full bg-gray-800 transition-all duration-300 ${
// 						isPrevDisabled
// 							? 'opacity-20 cursor-not-allowed'
// 							: 'opacity-40 hover:opacity-90'
// 					}`}
// 					disabled={isPrevDisabled}
// 				>
// 					<GrFormPrevious size={40} color='white' />
// 				</button>
// 				<div
// 					className='scroller no-scrollbar overflow-x-hidden relative'
// 					style={{ width: 'calc(100% - 96px)' }}
// 				>
// 					<ul className='flex items-center'>
// 						{visibleCategories.map((menu) => (
// 							<li
// 								className={`flex items-center justify-center rounded-lg drop-shadow-md m-2 transition-transform duration-300 ease-in-out ${
// 									category !== menu?.category
// 										? 'bg-slate-100'
// 										: 'bg-orange-400 text-slate-100 scale-110'
// 								} min-w-[6rem] md:min-w-44`}
// 								onClick={() =>
// 									setCategory((prev) =>
// 										prev === menu?.category ? 'All' : menu?.category
// 									)
// 								}
// 								key={menu.key}
// 							>
// 								<div className='flex items-center p-2'>
// 									<span className='text-md font-semibold'>
// 										{menu?.category}
// 									</span>
// 								</div>
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 				<button
// 					onClick={nextSlide}
// 					className={`right-2 md:-right-0 top-[47%] cursor-pointer rounded-full bg-gray-800 transition-all duration-300 ${
// 						isNextDisabled
// 							? 'opacity-20 cursor-not-allowed'
// 							: 'opacity-40 hover:opacity-90'
// 					}`}
// 					disabled={isNextDisabled}
// 				>
// 					<GrFormNext size={40} color='white' />
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

// export default Categories
