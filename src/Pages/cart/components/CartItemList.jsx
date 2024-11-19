import React from 'react'
import CartItem from './CartItem'

const CartItemsList = ({
	items,
	onIncrease,
	onDecrease,
	onRemove,
	deleteCart,
}) => {
	return (
		<div className='bg-white rounded-lg shadow-sm'>
			{items.map((item, index) => (
				<CartItem
					key={index}
					item={item}
					onIncrease={onIncrease}
					onDecrease={onDecrease}
					onRemove={onRemove}
					deleteCart={deleteCart}
				/>
			))}
		</div>
	)
}

export default CartItemsList
