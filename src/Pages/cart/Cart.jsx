import { Button } from '@/Components/ui/button';
import useRestaurantBySlug from '@/hooks/api/useRestaurantBySlug';
import useCartStore from '@/store/useCartStore';
import { useNavigate, useParams } from 'react-router';
import { FiTrash2, FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
  const { restaurantSlug, tableNo } = useParams();
  const { data, isLoading, isError } = useRestaurantBySlug({
    restaurantSlug,
  });
  const { cart, clearCart, updateQuantity, removeFromCart, getCartTotal } =
    useCartStore();

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading cart</div>;
  }

  return (
    <div className='min-h-screen py-6 md:py-12'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>
          <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
            {/* Header */}
            <div className='px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-purple-700/60'>
              <h2 className='text-xl md:text-2xl font-bold text-white'>Cart</h2>
              <p className='text-gray-100 font-semibold text-xs md:text-sm'>
                Table {tableNo}
              </p>
            </div>

            {/* Cart Items */}
            <div className='p-3 md:p-6 border-b'>
              {cart.length > 0 && (
                <div className='flex justify-end items-center mb-3 md:mb-4'>
                  <Button
                    onClick={() => clearCart()}
                    variant='ghost'
                    className='text-red-500 hover:text-red-700 flex items-center gap-1 md:gap-2 text-sm md:text-base'
                  >
                    <FiTrash2 className='w-4 h-4 md:w-5 md:h-5' />
                    <p> Clear Cart</p>
                  </Button>
                </div>
              )}

              <div className='space-y-3 md:space-y-4'>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className='flex flex-col md:flex-row justify-between items-start md:items-center p-3 md:p-4 bg-gray-50 rounded-lg'
                  >
                    <div className='flex items-start md:items-center space-x-3 md:space-x-4 w-full md:w-auto'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-12 h-12 md:w-16 md:h-16 rounded-md object-cover'
                      />
                      <div>
                        <h3 className='font-medium text-gray-900 text-sm md:text-base'>
                          {item.name}
                        </h3>
                        <p className='text-xs md:text-sm text-gray-500'>
                          ₹{item.price}
                        </p>
                        <div className='flex items-center gap-2 md:gap-3 mt-2'>
                          <Button
                            className='w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-400 hover:bg-blue-600 flex items-center justify-center p-0'
                            onClick={() =>
                              updateQuantity(item._id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            <FiMinus className='w-3 h-3 md:w-4 md:h-4' />
                          </Button>
                          <span className='text-gray-900 font-medium text-sm md:text-base'>
                            {item.quantity}
                          </span>
                          <Button
                            className='w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-400 hover:bg-blue-600 flex items-center justify-center p-0'
                            onClick={() =>
                              updateQuantity(item._id, item.quantity + 1)
                            }
                          >
                            <FiPlus className='w-3 h-3 md:w-4 md:h-4' />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className='flex justify-between items-center w-full md:w-auto md:flex-col md:items-end gap-2 mt-3 md:mt-0'>
                      <p className='font-semibold text-gray-900 text-sm md:text-base'>
                        ₹{item.price * item.quantity}
                      </p>
                      <Button
                        variant='ghost'
                        className='text-red-500 hover:text-red-700 p-1 md:p-2 h-auto'
                        onClick={() => removeFromCart(item._id)}
                      >
                        <FiTrash2 className='w-4 h-4 md:w-5 md:h-5' />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Total */}
            {cart.length > 0 && (
              <div className='p-4 md:p-6 bg-gray-50'>
                <div className='space-y-2 md:space-y-3'>
                  <div className='flex justify-between text-sm md:text-base'>
                    <span className='text-gray-600'>Subtotal</span>
                    <span className='font-medium'>₹{getCartTotal()}</span>
                  </div>
                  <div className='border-t pt-2 md:pt-3'>
                    <div className='flex justify-between'>
                      <span className='text-base md:text-lg font-semibold text-gray-800'>
                        Total
                      </span>
                      <span className='text-base md:text-lg font-bold text-green-600'>
                        ₹{getCartTotal()}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className='w-full bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 rounded-lg font-medium mt-4 md:mt-6 text-sm md:text-base'
                  onClick={() =>
                    navigate(
                      `/restaurant/${restaurantSlug}/${tableNo}/order_confirmation`
                    )
                  }
                >
                  Place Order
                </Button>
              </div>
            )}

            {cart.length === 0 && (
              <div className='text-center py-8 md:py-12'>
                <div className='text-gray-400 text-4xl md:text-6xl mb-3 md:mb-4'>
                  🛒
                </div>
                <h3 className='text-lg md:text-xl font-medium text-gray-900 mb-2'>
                  Your cart is empty
                </h3>
                <p className='text-sm md:text-base text-gray-500 mb-6 md:mb-8'>
                  Add some delicious items to your cart
                </p>
                <Button
                  onClick={() =>
                    navigate(`/restaurant/${restaurantSlug}/${tableNo}`)
                  }
                  className='bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-2000 animate-pulse hover:animate-none flex items-center gap-2 mx-auto text-sm md:text-base'
                >
                  <ShoppingBag className='w-4 h-4 md:w-5 md:h-5' />
                  Start Adding Food
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
