import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import useLoginOrSignup from '@/hooks/api/useLoginOrSignup';
import useRestaurantStore from '@/store/useRestaurantStore';
import useTableStore from '@/store/useTableStore';
import useVerifyOTP from '@/hooks/api/useVerifyOTP';
import useResendOTP from '@/hooks/api/useResendOTP';

export default function VerifyOTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeInput, setActiveInput] = useState(0);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const navigate = useNavigate();
  const { restaurantDetails } = useRestaurantStore();
  const { tableDetails } = useTableStore();

  const { mutate, isPending, isError, error } = useVerifyOTP({
    restaurantId: restaurantDetails._id,
    tableId: tableDetails._id,
  });

  const { mutate: resendOTP, isPending: isResendingOTP } = useResendOTP({
    restaurantId: restaurantDetails._id,
    tableId: tableDetails._id,
  });

  console.log(restaurantDetails, tableDetails);

  const handleChange = (value, index) => {
    if (Number.isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      setActiveInput(index + 1);
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      setActiveInput(index - 1);
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      return;
    }
    mutate({
      mobileNumber: localStorage.getItem('mobileNumber'),
      otp: otpString,
    });
  };

  const handleResend = () => {
    resendOTP({
      mobileNumber: localStorage.getItem('mobileNumber'),
    });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    inputRefs[0].current.focus();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 py-6 sm:px-6 lg:px-8'>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='p-4 sm:p-6 md:p-8 rounded-2xl shadow-xl bg-white/80 backdrop-blur-lg w-full max-w-md mx-auto'
      >
        <h1 className='text-2xl sm:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
          Verify OTP
        </h1>
        <p className='text-sm sm:text-base text-gray-500 text-center mb-6 sm:mb-8'>
          Please enter the verification code from the STAFF
        </p>

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
                    'Invalid OTP. Please try again.'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className='flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8'>
          {otp.map((digit, index) => (
            <motion.div
              key={`otp-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <input
                ref={inputRefs[index]}
                type='text'
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-10 h-10 sm:w-14 sm:h-14 text-lg sm:text-2xl text-center font-bold rounded-xl border-2 
                  ${
                    index === activeInput
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  } focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                  transition-all duration-300`}
              />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          disabled={isPending || isResendingOTP}
          className='w-full py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
            text-white text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity duration-300
            shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isPending ? (
            <div className='flex items-center justify-center gap-2'>
              <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
              <span>Verifying...</span>
            </div>
          ) : (
            'Verify'
          )}
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className='text-center mt-4 sm:mt-6 text-sm sm:text-base text-gray-500'
        >
          Didn't receive code?{' '}
          <button
            type='button'
            disabled={isResendingOTP}
            className='text-blue-600 font-medium hover:underline'
            onClick={handleResend}
          >
            {isResendingOTP ? 'Resending...' : 'Resend'}
          </button>
        </motion.p>
      </motion.form>
    </div>
  );
}
