import { verifyOTP } from '@/api/apiService';
import useAuthStore from '@/store/useAuthStore';
import useRestaurantStore from '@/store/useRestaurantStore';
import useTableStore from '@/store/useTableStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function useVerifyOTP({ restaurantId, tableId }, config = {}) {
  const navigate = useNavigate();
  const { restaurantSlug } = useRestaurantStore();
  const { tableNumber } = useTableStore();
  const { updateAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data) => verifyOTP(restaurantId, tableId, data),
    onSuccess: (data) => {
      updateAuth(data?.data);
      navigate(`/restaurant/${restaurantSlug}/${tableNumber}`);
    },
    ...config,
  });
}
