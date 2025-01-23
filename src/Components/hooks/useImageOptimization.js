import { useState, useEffect } from 'react'

export const useImageOptimization = (
	file,
	maxWidth = 300,
	maxHeight = 300,
	quality = 0.8
) => {
	const [optimizedImage, setOptimizedImage] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const optimizeImage = async () => {
			if (!file) return

			try {
				// Create image element
				const img = await new Promise((resolve, reject) => {
					const reader = new FileReader()
					reader.onload = (e) => {
						const image = new Image()
						image.onload = () => resolve(image)
						image.onerror = reject
						image.src = e.target.result
					}
					reader.readAsDataURL(file)
				})

				// Calculate dimensions
				let { width, height } = img
				if (width > maxWidth || height > maxHeight) {
					const ratio = Math.min(maxWidth / width, maxHeight / height)
					width *= ratio
					height *= ratio
				}

				// Create canvas and compress
				const canvas = document.createElement('canvas')
				canvas.width = width
				canvas.height = height
				const ctx = canvas.getContext('2d')
				ctx.drawImage(img, 0, 0, width, height)

				// Convert to blob
				const blob =
					(await new Promise()) <
					Blob >
					((resolve) => {
						canvas.toBlob((blob) => resolve(blob), 'image/jpeg/webP', quality)
					})

				// Create object URL
				const optimizedUrl = URL.createObjectURL(blob)
				setOptimizedImage(optimizedUrl)
				setIsLoading(false)
			} catch (error) {
				console.error('Image optimization failed', error)
				setIsLoading(false)
			}
		}

		optimizeImage()

		// Cleanup
		return () => {
			if (optimizedImage) {
				URL.revokeObjectURL(optimizedImage)
			}
		}
	}, [file, maxWidth, maxHeight, quality])

	return { optimizedImage, isLoading }
}
