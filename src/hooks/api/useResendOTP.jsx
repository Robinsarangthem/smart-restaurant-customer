import { resendOTP } from '@/api/apiService';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function useResendOTP({ restaurantId, tableId }, config = {}) {
  return useMutation({
    mutationFn: (data) => resendOTP(restaurantId, tableId, data),
    onSuccess: (data) => {
      toast.success('OTP resent successfully');
    },
    ...config,
  });
}
