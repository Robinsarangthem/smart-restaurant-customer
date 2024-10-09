import React from 'react'

export default function CustomLabel({ children, isRequired }) {
	return (
		<div className='text-muted-foreground'>
			{children} {isRequired && <span className='text-red-600 px-1'>*</span>}
		</div>
	)
}
