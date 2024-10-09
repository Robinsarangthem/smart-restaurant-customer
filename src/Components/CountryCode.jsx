import React from 'react'
import ReactCountryFlag from 'react-country-flag'

export default function CountryCode() {
	return (
		<div className='p-2 text-muted-foreground  flex flex-col h-full justify-around items-center bg-[#F2F4F8]'>
			<ReactCountryFlag
				countryCode='IN'
				style={{
					fontSize: 25,
				}}
			/>{' '}
			<span>+91</span>
		</div>
	)
}
