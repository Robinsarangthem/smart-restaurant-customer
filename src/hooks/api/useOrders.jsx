import { getOrders } from '@/api/apiService';
import useTableStore from '@/store/useTableStore';
import { useQuery } from '@tanstack/react-query';

export default function useOrders() {
  const { tableNumber } = useTableStore();

  return useQuery({
    queryKey: ['orders', tableNumber],
    queryFn: getOrders,
  });
}
