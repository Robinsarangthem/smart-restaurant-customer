import useAuthStore from '@/store/useAuthStore';
import { Navigate, Outlet, useParams } from 'react-router';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  const { restaurantSlug, tableNo } = useParams();

  if (!isAuthenticated()) {
    return (
      <Navigate to={`/restaurant/${restaurantSlug}/${tableNo}/loginOrSignup`} />
    );
  }
  return <Outlet />;
}
