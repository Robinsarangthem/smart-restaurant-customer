import React from 'react'
import OTPInput from 'react-otp-input'

export default function InputOtp({ otp, setOTP, number }) {
	const numberString = number.toString()
	const hideLastFourDigitNumber = `*******${numberString.slice(6)}`
	return (
		<div className=' flex flex-col gap-10 justify-center  '>
			<div className=' flex flex-col text-center gap-[10px] '>
				<h2 className='text-2xl font-bold te'>One-Time-Password </h2>
				<p className='text-slate-100 font-semibold text-sm'>
					Enter 6 digit OTP that has been sent to
					<span> +91{hideLastFourDigitNumber} </span>
				</p>
			</div>
			<div className='flex justify-center'>
				<OTPInput
					inputType='tel'
					value={otp}
					onChange={setOTP}
					numInputs={6}
					renderSeparator={<span className=' px-[3px] '> </span>}
					inputStyle={{
						width: '40px',
						height: '50px',
						borderRadius: '5px',
						background: '#f0f0f0',
						outline: 'blue',
						boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
					}}
					renderInput={(props) => (
						<div className='bg-white rounded-lg'>
							<input {...props} />
						</div>
					)}
				/>
			</div>
		</div>
	)
}
