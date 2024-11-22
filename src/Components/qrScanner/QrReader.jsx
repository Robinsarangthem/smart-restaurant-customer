import { useEffect, useRef, useState } from 'react'

// Styles
import './QrStyle.css'

// Qr Scanner
import QrScanner from 'qr-scanner'
import QrFrame from '../../assets/qr-frame.svg'

const QrReader = () => {
	// QR States
	const scanner = useRef()
	const videoEl = useRef(null)
	const qrBoxEl = useRef(null)
	const [qrOn, setQrOn] = useState(true)

	// Result
	const [scannedResult, setScannedResult] = useState('')

	// Success
	const onScanSuccess = (result) => {
		// 🖨 Print the "result" to browser console.
		console.log(result)
		// ✅ Handle success.
		// 😎 You can do whatever you want with the scanned result.
		setScannedResult(result?.data)
	}

	// Fail
	const onScanFail = (err) => {
		// 🖨 Print the "err" to browser console.
		console.log(err)
	}

	useEffect(() => {
		if (videoEl?.current && !scanner.current) {
			// 👉 Instantiate the QR Scanner
			scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
				onDecodeError: onScanFail,
				// 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
				preferredCamera: 'environment',
				// 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
				highlightScanRegion: true,
				// 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
				highlightCodeOutline: true,
				// 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
				overlay: qrBoxEl?.current || undefined,
			})

			// 🚀 Start QR Scanner
			scanner?.current
				?.start()
				.then(() => setQrOn(true))
				.catch((err) => {
					if (err) setQrOn(false)
				})
		}

		// 🧹 Clean up on unmount.
		// 🚨 This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
		return () => {
			if (!videoEl?.current) {
				scanner?.current?.stop()
			}
		}
	}, [])

	// ❌ If "camera" is not allowed in browser permissions, show an alert.
	useEffect(() => {
		if (!qrOn)
			alert(
				'Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.'
			)
	}, [qrOn])

	return (
		<div className='relative mx-2'>
			{/* Black background with opacity */}
			<div className='absolute inset-0 bg-black opacity-70 z-10'></div>

			{/* QR Scanner Video */}
			<video ref={videoEl} className='w-full h-full object-cover z-0' />

			{/* QR Scan Area (box) */}
			<div
				ref={qrBoxEl}
				className='absolute inset-0 flex justify-center items-center z-20'
			>
				<img
					src={QrFrame}
					alt='Qr Frame'
					className='w-28 h-28 md:w-48 md:h-48'
				/>
			</div>
			{/* Show Data Result if scan is success */}
			{/* {scannedResult && (
				<p
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						zIndex: 99999,
						color: 'white',
					}}
				>
					Scanned Result: {scannedResult}
				</p>
			)} */}
			{scannedResult && (window.location.href = scannedResult)}
		</div>
	)
}

export default QrReader
