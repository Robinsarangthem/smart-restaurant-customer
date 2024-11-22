import React, { useState } from 'react'
import { Button } from '@/Components/ui/button'
import QrReader from '@/Components/qrScanner/QrReader'

export default function WelcomePage() {
	const [openCam, setOpenCam] = useState(false)
	return (
		<div className='bg-slate-600 flex flex-col items-center pt-[3rem] min-h-[100svh] py-3 '>
			<div className='  bg-orange-500 bg-gradient-to-br from-orange-400 to-orange-600  text-transparent bg-clip-text font-medium drop-shadow-md text-center pt-3'>
				<h2 className='text-4xl font-bold py-2'>welcome to Achaathak !</h2>
				<p className='text-slate-200 text-muted'>Scan your table number</p>
			</div>
			<div className='py-10 flex justify-center flex-col gap-3 px-3 '>
				<Button className='pb-3 flex ' onClick={() => setOpenCam(!openCam)}>
					{openCam ? 'Close' : 'Open'} Qr Scanner
				</Button>
			</div>
			{openCam && <QrReader />}
		</div>
	)
}
