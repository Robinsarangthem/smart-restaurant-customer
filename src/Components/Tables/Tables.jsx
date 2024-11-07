import React, { useEffect, useState } from 'react'
import { Axios, baseURL } from '../../utils/axiosSetup'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import InputOtp from './InputOtp/InputOtp'
import CustomLabel from '../CustomLabel'
import CountryCode from '../CountryCode'
import { Button } from '../ui/button'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
// import restaurant from '../../assets/Images/restaurant_photo.jpg'
// import backgroundImage from '../../assets/Images/restaurant.png'
import { Input } from '../ui/input'

export default function Tables() {
	const navigate = useNavigate()
	const [number, setNumber] = useState('')

	const [isSentOTP, setIsSentOTP] = useState(false)

	const [OTP, setOTP] = useState('')

	const [tables, setTables] = useState('')

	const { setIsAuthenticated, setToken, params } = useAuth()

	useEffect(() => {
		setTables(params.id)
	}, [])

	const {
		mutate: handleTablesVerification,
		isPending,
		error,
	} = useMutation({
		mutationKey: ['VerifyMobileNumber'],
		mutationFn: async () => {
			if (!isSentOTP) {
				// If OTP not sent, send mobile number
				const { data } = await Axios.post('/api/customer/register', {
					mobileNumber: number,
					currentTableNumber: tables,
				})
				return data
			} else {
				// If OTP sent, verify OTP
				const { data } = await Axios.post('/api/customer/verify', {
					mobileNumber: number,
					otp: OTP,
				})
				return data
			}
		},
		onSuccess: (data) => {
			console.log(data)
			if (data?.success === true && data?.token === null) {
				setIsSentOTP(true)
			} else if (data?.success === true && data?.token !== null) {
				const Customer_id = data?.Data?.findCustomer._id
				localStorage.setItem('id', Customer_id)
				console.log(Customer_id)
				localStorage.setItem('tables', JSON.stringify(tables))
				localStorage.setItem('token', data.token)
				setIsAuthenticated(true)

				navigate('/', { replace: true })
			}
		},
		onError: (error) => {
			const errorMessage = error.response.data.message
			console.error('Error during login:', errorMessage)
			toast.error(errorMessage)
			// return <div className='text-red-500'> {errorMessage} </div>
		},
	})

	const handleLogin = async (e) => {
		e.preventDefault()
		handleTablesVerification()
	}

	return (
		<div
			className='h-[100svh]  px-[20px] flex flex-col items-center justify-center  '
			style={{
				background: `url('https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: '50%',
			}}
		>
			<div className='border-1 border-slate-100 p-5 rounded-md bg-slate-100 shadow-md bg-opacity-30 backdrop-filter backdrop-blur-sm bg-clip-padding mt-[5rem]'>
				{!isSentOTP && (
					<div className=' pb-[50px]'>
						<h2
							className=' text-3xl bg-gradient-to-br bg- w-max text-transparent bg-clip-text from-orange-500 to-orange-700 drop-shadow-md
						font-bold tracking-wide'
						>
							Welcome!
						</h2>
						<p className='text-slate-100 text-sm text-muted-foreground'>
							Enter your phone number to get started...
						</p>
					</div>
				)}
				<div className=''>
					<form onSubmit={handleLogin}>
						<div className='py-3'>
							{isSentOTP ? (
								<div className=''>
									<InputOtp otp={OTP} setOTP={setOTP} number={number} />
								</div>
							) : (
								<div className='flex flex-col gap-[1em]'>
									<div className='grid grid-cols-[1fr_5fr] shadow-xl overflow-clip items-center bg-white rounded-lg'>
										<CountryCode />
										<div className='grid gap-1 p-2'>
											<CustomLabel isRequired>Phone number</CustomLabel>
											<input
												className='border text-2xl rounded p-1 w-full min-w-0'
												maxLength={10}
												type='tel'
												name='number'
												value={number}
												onChange={(e) => setNumber(e.target.value)}
											/>
										</div>
									</div>
								</div>
							)}
						</div>
						<Button
							size={'lg'}
							disabled={isPending}
							className='w-full bg-gray-800 hover:bg-gray-950'
						>
							{isPending
								? isSentOTP
									? 'Verifying OTP...'
									: 'Please Wait...'
								: isSentOTP
								? 'Verify OTP'
								: 'Send OTP'}
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}
