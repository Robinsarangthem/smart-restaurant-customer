import { addOrder, createOrder } from '@/api/apiService';
import useCartStore from '@/store/useCartStore';
import useRestaurantStore from '@/store/useRestaurantStore';
import useTableStore from '@/store/useTableStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function useOrderCreate() {
  const { restaurantSlug } = useRestaurantStore();
  const { tableNumber } = useTableStore();
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  return useMutation({
    mutationFn: (data) => addOrder(data),
    onSuccess: (data) => {
      console.log(data);
      clearCart();
      navigate(`/restaurant/${restaurantSlug}/${tableNumber}/order-summary`);
    },
  });
}
