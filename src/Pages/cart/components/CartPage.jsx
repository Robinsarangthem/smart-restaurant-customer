// CartPage.js
import React from 'react'
import CartItem from './CartItem'
import OrderSummary from './OrderSummary'
import CartEmpty from './CartEmpty'
import { useNavigate } from 'react-router'
import Header from './Header'
import CartItemsList from './CartItemList'
const CartPage = ({
	cartItems,
	onRemove,
	onIncrease,
	onDecrease,
	deleteCart,
	clearCart,
	// handleOrderCreated,
	// isPending,
}) => {
	// console.log('handle', handleOrderCreated)
	const navigate = useNavigate()

	const handleNavigateHome = () => {
		navigate('/')
	}

	const getTotalAmount = () => {
		return cartItems.reduce((total, cartItem) => {
			const items = cartItems.find((product) => product._id === cartItem._id)
			if (items) {
				return (total += items.price * cartItem.quantity)
			}
			return total
		}, 0)
	}

	return (
		<div className=''>
			<div className='max-w-6xl mx-auto px-4 py-8'>
				<Header handleNavigateHome={handleNavigateHome} />
				{cartItems.length > 0 ? (
					<div className='lg:grid lg:grid-cols-12 lg:gap-8'>
						{/* Cart Items List */}
						<div className='lg:col-span-8'>
							<CartItemsList
								items={cartItems}
								onIncrease={onIncrease}
								onDecrease={onDecrease}
								onRemove={onRemove}
								deleteCart={deleteCart}
							/>
						</div>

						{/* Order Summary */}
						<div className='lg:col-span-4 mt-8 lg:mt-0'>
							<OrderSummary
								totalAmount={getTotalAmount}
								// handleOrderCreated={handleOrderCreated}
								cartItems={cartItems}
								clearCart={clearCart}
								// isPending={isPending}
								// handleCheckout={handleCheckout}
							/>
						</div>
					</div>
				) : (
					<CartEmpty />
				)}
			</div>
		</div>
	)
}

export default CartPage
