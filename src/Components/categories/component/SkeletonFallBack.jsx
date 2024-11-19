import { Skeleton } from '@/Components/ui/skeleton'

const SkeletonFallback = () => (
	<div className='relative max-w-full pb-4 border-b-4 border-orange-400 px-2'>
		<span className='block text-xl font-bold text-slate-700 pb-4'>
			Categories
		</span>
		<div className='scroller no-scrollbar overflow-hidden px-[0px] flex gap-4'>
			{Array.from({ length: 5 }).map((_, index) => (
				<Skeleton
					key={index}
					className='flex items-center justify-center rounded-lg drop-shadow-md m-2 p-4 min-w-[6rem] md:min-w-44 h-10'
				/>
			))}
		</div>
	</div>
)
export default SkeletonFallback
