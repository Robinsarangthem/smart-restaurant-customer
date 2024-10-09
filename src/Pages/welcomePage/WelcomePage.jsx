import React, { useState } from 'react'
import { Button } from '@/Components/ui/button'
import QrReader from '@/Components/qrScanner/QrReader'

export default function WelcomePage() {
	const [openCam, setOpenCam] = useState(false)
	return (
		<div className='bg-slate-500 flex flex-col items-center pt-[5rem] h-[100svh]'>
			<div className='  bg-orange-500 bg-gradient-to-br from-orange-400 to-orange-600  text-transparent bg-clip-text font-medium drop-shadow-md text-center'>
				<h2 className='text-4xl'>welcome !</h2>
				<p className='text-slate-200 text-muted'>Scan your table number</p>
			</div>
			<div>
				<Button onClick={() => setOpenCam(!openCam)}>
					{openCam ? 'Close' : 'Open'} Qr Scanner
				</Button>

				{openCam && <QrReader />}
			</div>
		</div>
	)
}
