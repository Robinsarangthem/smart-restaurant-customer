import '../../../src/index.css'
import { GrFormPrevious } from 'react-icons/gr'
import { GrFormNext } from 'react-icons/gr'
import { useState } from 'react'

const Categories = ({ category, setCategory, categoryList }) => {
	const [currentIndex, setCurrentIndex] = useState(0)

	const prevSlide = () => {
		const newIndex =
			currentIndex === 0 ? categoryList?.list.length - 1 : currentIndex - 1
		setCurrentIndex(newIndex)
		console.log('prev', newIndex)
	}
	const nextSlide = () => {
		const newIndex =
			currentIndex === categoryList?.list.length - 1 ? 0 : currentIndex + 1
		setCurrentIndex(newIndex)
	}
	console.log(currentIndex)
	return (
		<div className='relative max-w-full py-8 border-b-4 border-orange-400 px-2  '>
			<span className='block text-xl font-bold  text-slate-700 pb-4'>
				Categories
			</span>
			<div className='flex items-center gap-2 '>
				<button
					onClick={prevSlide}
					disabled={currentIndex === 0}
					className='   left-2  rounded-full bg-gray-800 opacity-40 hover:opacity-90  '
				>
					<GrFormPrevious
						size={40}
						color='white
						'
					/>
				</button>
				<div
					className=' scroller  no-scrollbar  overflow-x-auto scroll-smooth md:overflow-x-scroll md:flex md:flex-nowrap '
					data-animated='true'
				>
					<ul
						className=' flex items-center space-x-5 md:gap-10 cursor-pointer pl-10 '
						style={{
							transform: `translateX(-${currentIndex * 60}%) `,
							transition: 'transform 0.5s ease',
						}}
					>
						{categoryList?.list.map((menu, index) => (
							<li
								className={` flex items-center justify-center rounded-lg  drop-shadow-md m-2   transition-transform duration-500 ease-in-out   ${
									category !== menu?.category
										? 'bg-slate-100'
										: 'bg-orange-400 text-slate-100 scale-110 '
								}  min-w-[6rem]  md:min-w-44`}
								onClick={() =>
									setCategory((prev) =>
										prev === menu?.category ? 'All' : menu?.category
									)
								}
								key={index}
							>
								<div className='flex  items-center p-2'>
									<span className=' text-md font-semibold	'>
										{menu?.category}
									</span>
								</div>
							</li>
						))}
					</ul>
				</div>
				<button
					onClick={nextSlide}
					className=' right-2 md:-right-0 top-[47%] cursor-pointer   rounded-full bg-gray-800 opacity-40 hover:opacity-90 '
					disabled={currentIndex === -1}
				>
					<GrFormNext
						size={40}
						color='white
						'
					/>
				</button>
			</div>
		</div>
	)
}

export default Categories
