import { getTableByTableNumber } from '@/api/apiService';
import { useQuery } from '@tanstack/react-query';

export default function useTableByTableNumber(
  { restaurantId, tableNumber },
  config = {}
) {
  return useQuery({
    queryKey: ['table', restaurantId, tableNumber],
    queryFn: () => getTableByTableNumber(restaurantId, tableNumber),
    enabled: !!restaurantId && !!tableNumber,
    ...config,
  });
}
