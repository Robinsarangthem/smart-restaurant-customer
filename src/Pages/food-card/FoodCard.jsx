import { Button } from '@/Components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/Components/ui/card';
import QuantityButton from '@/Element/QuantityButton';
import useCartStore from '@/store/useCartStore';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function FoodCard({ food }) {
  const {
    description,
    discountPercentage,
    image,
    isAvailable,
    name,
    price,
    restaurant,
    todaysSpecial,
    _id,
  } = food;
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToCart, removeFromCart, cart } = useCartStore();

  return (
    <Card className='overflow-hidden transition-all duration-300 w-full shadow-sm rounded-xl border-gray-100/50 flex flex-col h-full'>
      <div className='relative overflow-hidden h-32'>
        <img
          src={image || '/api/placeholder/300/200'}
          alt={name}
          className={`w-full h-full object-cover transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } `}
          onLoad={() => setIsLoaded(true)}
        />
        {todaysSpecial && (
          <div className='absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-2 py-1 rounded-full font-medium text-sm transform -rotate-6 shadow-lg animate-pulse tracking-wider flex items-center gap-1'>
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z'
                clipRule='evenodd'
              />
            </svg>
            Special
          </div>
        )}
        {discountPercentage > 0 && (
          <div className='absolute top-2 right-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium shadow-lg'>
            {discountPercentage}% OFF
          </div>
        )}
      </div>

      <CardHeader className='pb-1 pt-3 px-4 space-y-1'>
        <CardTitle className='text-base sm:text-lg font-bold tracking-tight text-gray-800 line-clamp-1'>
          {name}
        </CardTitle>
        <div className='text-xs text-gray-500 line-clamp-2 leading-relaxed'>
          {description}
        </div>
      </CardHeader>

      <CardContent className='flex-grow flex flex-col justify-end gap-1.5 pb-1 px-4'>
        <div className='flex items-center space-x-2'>
          <span className='font-bold text-base sm:text-lg bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent'>
            ₹ {price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className='px-4 pb-3'>
        {!isAvailable ? (
          <button
            type='button'
            className='w-full bg-gray-100 text-red-600 py-2 h-10 text-xs sm:text-sm font-medium rounded-lg opacity-100'
            disabled
          >
            Not Available
          </button>
        ) : cart.some((item) => item._id === _id) ? (
          <QuantityButton item={food} />
        ) : (
          <Button
            className='w-full group overflow-hidden relative transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 py-2 h-10 text-xs sm:text-sm font-medium rounded-lg'
            variant='default'
            onClick={() => addToCart(food)}
          >
            <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700' />
            <PlusIcon className='mr-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:rotate-180 duration-300' />
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
