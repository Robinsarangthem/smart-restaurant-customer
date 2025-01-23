import { Button } from '@/Components/ui/button';
import useOrderCreate from '@/hooks/api/useOrderCreate';
import useRestaurantBySlug from '@/hooks/api/useRestaurantBySlug';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';

export default function OrderConfirmation() {
  const { restaurantSlug, tableNo } = useParams();
  const { data } = useRestaurantBySlug({ restaurantSlug });
  const { cart, getCartTotal } = useCartStore();
  const { mutate: createOrder, isPending, isError, error } = useOrderCreate();
  const [paymentMode, setPaymentMode] = useState('Cash');
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleCreateOrder = () => {
    if (!isAuthenticated()) {
      navigate(`/restaurant/${restaurantSlug}/${tableNo}/loginOrSignup`);
      return;
    }

    createOrder({
      foodItems: cart.map((foodItem) => ({
        foodId: foodItem._id,
        quantity: foodItem.quantity,
      })),
      paymentMode,
    });
  };

  return (
    <div className='min-h-screen py-6 sm:py-12'>
      <div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8'>
        <div className='max-w-3xl mx-auto'>
          <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
            {/* Header */}
            <div className='px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-amber-600 to-amber-700'>
              <h2 className='text-xl sm:text-2xl font-bold text-white'>
                Order Confirmation
              </h2>
              <p className='text-gray-100 font-semibold text-xs sm:text-sm'>
                Table {tableNo}
              </p>
            </div>

            {/* Order Summary */}
            <div className='p-4 sm:p-6 border-b'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4'>
                Order Summary
              </h3>
              <div className='space-y-3 sm:space-y-4'>
                {cart.map((item) => (
                  <div
                    key={item._id}
                    className='flex justify-between items-center'
                  >
                    <div className='flex items-center space-x-3 sm:space-x-4'>
                      <img
                        src={item.image}
                        alt={item.name}
                        className='w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover'
                      />
                      <div>
                        <p className='font-medium text-gray-800 text-sm sm:text-base'>
                          {item.name}
                        </p>
                        <p className='text-xs sm:text-sm text-gray-500'>
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className='font-semibold text-gray-800 text-sm sm:text-base'>
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className='p-4 sm:p-6'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4'>
                Payment Details
              </h3>
              <div className='space-y-3 sm:space-y-4'>
                <div className='flex justify-between text-sm sm:text-base'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-medium'>₹{getCartTotal()}</span>
                </div>
                {/* TO be considered later */}
                <div className='flex justify-between text-sm sm:text-base'>
                  <span className='text-gray-600'>Tax (5%)</span>
                  <span className='font-medium'>
                    ₹{(getCartTotal() * 0.05).toFixed(2)}
                  </span>
                </div>
                <div className='border-t pt-3 sm:pt-4'>
                  <div className='flex justify-between'>
                    <span className='text-base sm:text-lg font-semibold text-gray-800'>
                      Total
                    </span>
                    <span className='text-base sm:text-lg font-bold text-green-600'>
                      ₹{(getCartTotal() * 1.05).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className='p-4 sm:p-6 bg-gray-50'>
              <h3 className='text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4'>
                Payment Method
              </h3>
              <div className='space-y-3'>
                <div className='flex items-center space-x-3 p-3 bg-white border rounded-lg cursor-pointer hover:border-green-500 transition-colors'>
                  <input
                    type='radio'
                    name='payment'
                    id='cash'
                    className='text-green-500'
                    defaultChecked
                    onChange={() => setPaymentMode('Cash')}
                  />
                  <label
                    htmlFor='cash'
                    className='flex-1 cursor-pointer text-sm sm:text-base'
                  >
                    Pay at Counter
                  </label>
                </div>
                <div className='flex items-center space-x-3 p-3 bg-white border rounded-lg cursor-pointer hover:border-green-500 transition-colors'>
                  <input
                    type='radio'
                    name='payment'
                    id='upi'
                    className='text-green-500'
                    onChange={() => setPaymentMode('Online')}
                  />
                  <label
                    htmlFor='upi'
                    className='flex-1 cursor-pointer text-sm sm:text-base'
                  >
                    UPI Payment
                  </label>
                </div>
              </div>
            </div>

            {isError && (
              <div className='p-3 sm:p-4 mb-4 text-red-700 mx-4 sm:mx-8 bg-red-100 border border-red-400 rounded-lg text-sm sm:text-base'>
                <span className='flex items-center'>
                  <span className='mr-2'>⚠️</span>
                  {error?.response?.data?.message ||
                    'An error occurred while creating your order'}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className='p-4 sm:p-6 bg-gray-50 border-t'>
              <Button
                className='w-full bg-green-600 hover:bg-green-700 text-white py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base'
                onClick={handleCreateOrder}
                disabled={isPending}
              >
                {isPending ? 'Creating Order...' : 'Confirm Order'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
