import { getRestaurantBySlug } from '@/api/apiService';
import { useQuery } from '@tanstack/react-query';

export default function useRestaurantBySlug(params = {}, config = {}) {
  // get restaurant details
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['restaurant', params.restaurantSlug],
    queryFn: () => getRestaurantBySlug(params.restaurantSlug),
    enabled: !!params.restaurantSlug,
    ...config,
  });

  return { data, isLoading, isError, error };
}
