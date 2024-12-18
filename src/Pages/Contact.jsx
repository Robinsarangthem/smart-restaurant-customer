import useAuth from '@/Components/hooks/useAuth'

function Contact() {
	const { restaurantDetails } = useAuth()
	const contact = restaurantDetails?.contact

	return (
		<div className='h-[100svh] text-red-500 flex justify-center items-center font-semibold '>
			<div className='flex flex-col gap-3 bg-customWhite p-5 rounded-md drop-shadow-md text-xl'>
				<h2>{contact?.address}</h2>
				<h2>{contact?.email}</h2>
				<h2>{contact?.phone}</h2>
			</div>
		</div>
	)
}

export default Contact
