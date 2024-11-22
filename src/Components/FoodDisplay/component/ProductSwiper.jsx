import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	Navigation,
	Pagination,
	Autoplay,
	FreeMode,
	Virtual,
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const ProductSwiper = ({ products, renderItem, title }) => {
	const isMobile = window.innerWidth < 768
	const mobileSpeed = isMobile ? 300 : 500
	console.log('product chabora ', products)
	return (
		<div className='product-swiper-container'>
			{title && (
				<h2 className='text-lg font-bold mb-4 text-center sm:text-left'>
					{title}
				</h2>
			)}
			<Swiper
				modules={[Navigation, Pagination, Autoplay, FreeMode, Virtual]}
				spaceBetween={10}
				slidesPerView={isMobile ? 2 : 3}
				navigation={!isMobile}
				loop={true}
				touchRatio={0.7}
				className='rounded-md swiper-container'
				breakpoints={{
					320: { slidesPerView: 2, spaceBetween: 10 },
					550: { slidesPerView: 2, spaceBetween: 8 },
					1024: { slidesPerView: 4, spaceBetween: 20 },
					1280: { slidesPerView: 5, spaceBetween: 25 },
				}}
				speed={mobileSpeed}
			>
				{products.length > 0 ? (
					products.map((product, idx) => (
						<SwiperSlide key={idx} className='p-2'>
							{renderItem(products)}
						</SwiperSlide>
					))
				) : (
					<div className='text-customRed text-center'>
						No products available
					</div>
				)}
			</Swiper>
		</div>
	)
}

export default React.memo(ProductSwiper)
