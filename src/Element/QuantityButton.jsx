import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import useCartStore from '@/store/useCartStore';

const QuantityButton = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, getCartItem } = useCartStore();
  const cartItem = getCartItem(item._id);

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='flex items-center bg-slate-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 w-full sm:max-w-[220px] md:max-w-[240px]'>
        <Button
          onClick={() => decreaseQuantity(item._id)}
          className='group px-1.5 sm:px-3 md:px-4 py-0.5 sm:py-2 bg-red-500 text-white transition-all duration-300 flex items-center justify-center min-h-[32px] min-w-[32px] sm:min-h-[44px] sm:min-w-[44px]'
          aria-label='Decrease quantity'
        >
          <Minus size={12} className='sm:w-[18px] sm:h-[18px]' />
        </Button>

        <div className='relative px-2 sm:px-6 py-0.5 sm:py-2 bg-gradient-to-b flex-1'>
          <div className='relative'>
            <span className='block text-xs sm:text-base font-medium text-gray-700 min-w-[1rem] sm:min-w-[1.5rem] text-center'>
              {cartItem.quantity}
            </span>
          </div>
        </div>

        <Button
          onClick={() => increaseQuantity(item._id)}
          className='group px-1.5 sm:px-3 md:px-4 py-0.5 sm:py-2 bg-green-500 text-white transition-all duration-300 flex items-center justify-center min-h-[32px] min-w-[32px] sm:min-h-[44px] sm:min-w-[44px]'
          aria-label='Increase quantity'
        >
          <Plus size={12} className='sm:w-[18px] sm:h-[18px]' />
        </Button>
      </div>
    </div>
  );
};

export default QuantityButton;
