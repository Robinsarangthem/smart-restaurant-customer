import { handleLoginOrSignup } from '@/api/apiService';
import useRestaurantStore from '@/store/useRestaurantStore';
import useTableStore from '@/store/useTableStore';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function useLoginOrSignup(
  { restaurantId, tableId },
  config = {}
) {
  const navigate = useNavigate();
  const { restaurantSlug } = useRestaurantStore();
  const { tableNumber } = useTableStore();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (data) => handleLoginOrSignup(restaurantId, tableId, data),
    onSuccess: (data) => {
      navigate(`/restaurant/${restaurantSlug}/${tableNumber}/verify-otp`);
    },
    ...config,
  });

  return { mutate, isPending, isError, error };
}
