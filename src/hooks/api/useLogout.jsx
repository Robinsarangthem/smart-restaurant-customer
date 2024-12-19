import { logout } from '@/api/apiService';
import useAuthStore from '@/store/useAuthStore';
import useRestaurantStore from '@/store/useRestaurantStore';
import useTableStore from '@/store/useTableStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

export default function useLogout() {
  const { resetAuth } = useAuthStore();
  const navigate = useNavigate();
  // clear all queryclient data and invalidate all queries
  const queryClient = useQueryClient();
  const { restaurantSlug } = useRestaurantStore();
  const { tableNumber } = useTableStore();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      resetAuth();
      queryClient.clear();
      queryClient.invalidateQueries();
      navigate(`/restaurant/${restaurantSlug}/${tableNumber}`);
    },
  });
}
