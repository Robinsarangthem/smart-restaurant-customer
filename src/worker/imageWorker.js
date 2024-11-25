self.onmessage = async (e) => {
	const { image, maxWidth, maxHeight, quality } = e.data

	try {
		// Fetch the image as binary data
		const response = await fetch(image)
		const blob = await response.blob()

		// Create a bitmap from the blob
		const imgBitmap = await createImageBitmap(blob)

		// Use OffscreenCanvas for resizing
		const canvas = new OffscreenCanvas(maxWidth, maxHeight)
		const ctx = canvas.getContext('2d')

		let width = imgBitmap.width
		let height = imgBitmap.height

		// Maintain aspect ratio while resizing
		if (width > height) {
			if (width > maxWidth) {
				height *= maxWidth / width
				width = maxWidth
			}
		} else {
			if (height > maxHeight) {
				width *= maxHeight / height
				height = maxHeight
			}
		}

		canvas.width = width
		canvas.height = height
		ctx.drawImage(imgBitmap, 0, 0, width, height)

		// Convert the canvas content to a compressed Blob
		const optimizedBlob = await canvas.convertToBlob({
			type: 'image/jpeg',
			quality: quality,
		})

		// Create a Data URL from the Blob
		const reader = new FileReader()
		reader.onload = () => {
			self.postMessage({ optimizedDataUrl: reader.result })
		}
		reader.onerror = () => {
			self.postMessage({ error: 'Failed to read the blob.' })
		}

		reader.readAsDataURL(optimizedBlob)
	} catch (err) {
		self.postMessage({ error: err.message })
	}
}
