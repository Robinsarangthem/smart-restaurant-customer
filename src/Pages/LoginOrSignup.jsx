import useLoginOrSignup from '@/hooks/api/useLoginOrSignup';
import useRestaurantStore from '@/store/useRestaurantStore';
import useTableStore from '@/store/useTableStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginOrSignup() {
  const [mobileNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const { tableDetails } = useTableStore();
  const { restaurantDetails } = useRestaurantStore();

  const { mutate, isPending, isError, error } = useLoginOrSignup({
    restaurantId: restaurantDetails?._id,
    tableId: tableDetails?._id,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length !== 10) {
      return;
    }
    localStorage.setItem('mobileNumber', mobileNumber);
    mutate({ mobileNumber });
  };

  return (
    <div className='min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-100 px-4'>
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg'>
        <div className='space-y-2 text-center'>
          <h1 className='text-2xl font-bold tracking-tight text-gray-900'>
            Verify Your Phone Number
          </h1>
          <p className='text-sm text-gray-500'>
            Please enter your mobile number to place the order
          </p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            {isError && (
              <div className='rounded-lg bg-red-50 p-4 mb-4'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg
                      className='h-5 w-5 text-red-400'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm font-medium text-red-800'>
                      {error?.response?.data?.message ||
                        'Something went wrong. Please try again.'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-gray-700'
            >
              Mobile Number
            </label>
            <div className='mt-1'>
              <input
                id='phone'
                name='mobileNumber'
                type='tel'
                required
                pattern='[0-9]{10}'
                value={mobileNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className='block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Enter 10 digit mobile number'
              />
            </div>
          </div>

          <div className='rounded-lg bg-blue-50 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  className='h-5 w-5 text-blue-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <p className='text-sm text-blue-700'>
                  An OTP will be sent to the restaurant. Our staff will bring it
                  to your table for verification.
                </p>
              </div>
            </div>
          </div>

          <button
            disabled={!mobileNumber || isPending}
            type='submit'
            className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isPending ? (
              <div className='flex items-center gap-2'>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                <span>Please wait...</span>
              </div>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
