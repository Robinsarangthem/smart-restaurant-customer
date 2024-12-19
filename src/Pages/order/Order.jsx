import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Clock, CheckCircle2, ChefHat, Truck } from 'lucide-react';
import useOrders from '@/hooks/api/useOrders';
import useAuthStore from '@/store/useAuthStore';

export default function Order() {
  const { restaurantSlug, tableNo } = useParams();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const { data: ordersResponse, isLoading } = useOrders();
  const orders = ordersResponse?.data;

  if (!isAuthenticated()) {
    navigate(`/restaurant/${restaurantSlug}/${tableNo}`);
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className='w-5 h-5 sm:w-6 sm:h-6 text-yellow-500' />;
      case 'processing':
        return <ChefHat className='w-5 h-5 sm:w-6 sm:h-6 text-orange-500' />;
      case 'ready':
        return (
          <CheckCircle2 className='w-5 h-5 sm:w-6 sm:h-6 text-green-500' />
        );
      case 'delivered':
        return <Truck className='w-5 h-5 sm:w-6 sm:h-6 text-blue-500' />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders?.filter((order) =>
    selectedStatus === 'all'
      ? true
      : order.status.toLowerCase() === selectedStatus
  );

  if (isLoading) {
    return (
      <div className='min-h-screen flex flex-col gap-6 items-center justify-center bg-slate-200'>
        <div className='w-72 h-8 animate-pulse bg-slate-300 rounded-lg' />
        <div className='w-96 h-32 animate-pulse bg-slate-300 rounded-lg' />
        <div className='w-80 h-8 animate-pulse bg-slate-300 rounded-lg' />
        <div className='flex gap-4'>
          <div className='w-24 h-8 animate-pulse bg-slate-300 rounded-lg' />
          <div className='w-24 h-8 animate-pulse bg-slate-300 rounded-lg' />
          <div className='w-24 h-8 animate-pulse bg-slate-300 rounded-lg' />
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className='min-h-screen  bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex flex-col items-center justify-center px-4'>
        <h2 className='text-xl sm:text-2xl font-bold text-gray-900 mb-4 text-center'>
          No Orders Yet
        </h2>
        <p className='text-sm sm:text-base text-gray-600 mb-8 text-center'>
          You haven't placed any orders yet. Start ordering delicious food now!
        </p>
        <button
          type='button'
          onClick={() => navigate(`/restaurant/${restaurantSlug}/${tableNo}`)}
          className='px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base'
        >
          Start Ordering
        </button>
      </div>
    );
  }

  return (
    <div className='min-h-screen  bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-6 sm:py-8 px-3 sm:px-6 lg:px-8'>
      <div className='max-w-lg mx-auto'>
        <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center'>
          Your Orders
        </h1>

        {/* Status Filter */}
        <div className='mb-6 sm:mb-8 flex flex-wrap gap-2 justify-center'>
          {['all', 'pending', 'processing', 'ready', 'delivered'].map(
            (status) => (
              <button
                type='button'
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                  selectedStatus === status
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            )
          )}
        </div>

        {/* Orders List */}
        <div className='space-y-4 sm:space-y-6'>
          {filteredOrders?.map((order) => (
            <div
              key={order._id}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
            >
              <div className='p-4 sm:p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2 sm:gap-4'>
                    {getStatusIcon(order.status)}
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </div>
                  <p className='text-xs sm:text-sm text-gray-500'>
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className='space-y-4'>
                  {order.foodItems.map((item) => (
                    <div
                      key={item._id}
                      className='flex items-center gap-3 sm:gap-4'
                    >
                      <img
                        src={item.foodId.image}
                        alt={item.foodId.name}
                        className='w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover'
                      />
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-medium text-gray-900 text-sm sm:text-base truncate'>
                          {item.foodId.name}
                        </h3>
                        <p className='text-xs sm:text-sm text-gray-500'>
                          Quantity: {item.quantity} x{' '}
                          <span className='font-semibold'>
                            ₹{item.foodId.price.toLocaleString('en-IN')}
                          </span>
                        </p>
                        <p className='text-xs sm:text-sm text-gray-500'>
                          Status: {item.status}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='text-sm sm:text-base font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                          ₹
                          {(item.foodId.price * item.quantity).toLocaleString(
                            'en-IN'
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className='mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <span className='text-base sm:text-lg font-medium text-gray-900'>
                        Total Amount
                      </span>
                      <p className='text-xs sm:text-sm text-gray-500'>
                        Payment: {order.payment} ({order.paymentMode})
                      </p>
                    </div>
                    <span className='text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                      ₹{order.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders?.length === 0 && (
            <div className='text-center py-8 sm:py-12'>
              <p className='text-gray-500 text-base sm:text-lg'>
                No orders found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
