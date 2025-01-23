import useLogout from '@/hooks/api/useLogout';
import { Button } from '../ui/button';
import { LogOutIcon } from 'lucide-react';
import useAuthStore from '@/store/useAuthStore';
import useCartStore from '@/store/useCartStore';
import { useNavigate, useParams } from 'react-router';

export default function Logout() {
  const { mutate: logout, isPending } = useLogout();
  const { isAuthenticated, reset } = useAuthStore();
  const { clearCart } = useCartStore();
  const navigate = useNavigate();
  const { restaurantSlug, tableNo } = useParams();

  if (!isAuthenticated())
    return (
      <button
        type='button'
        onClick={() =>
          navigate(`/restaurant/${restaurantSlug}/${tableNo}/loginOrSignup`)
        }
        aria-label='Login'
        title='Login'
        className='flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors'
      >
        <LogOutIcon className='w-5 h-5' />
        <span>Login</span>
      </button>
    );

  const handleLogout = () => {
    logout();
    reset();
    clearCart();
    localStorage.removeItem('mobileNumber');
  };

  return (
    <button
      type='button'
      onClick={handleLogout}
      aria-label='Logout'
      title='Logout'
      disabled={isPending}
    >
      {isPending ? (
        <div className='animate-spin'>
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
          <svg className='w-5 h-5' viewBox='0 0 24 24'>
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
              fill='none'
            />
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            />
          </svg>
        </div>
      ) : (
        <div className='flex items-center gap-2 group'>
          <LogOutIcon className='w-5 h-5 group-hover:text-red-500' />
          <span className='group-hover:text-red-500'>Logout</span>
        </div>
      )}
    </button>
  );
}
