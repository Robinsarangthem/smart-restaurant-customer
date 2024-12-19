import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import 'react-toastify/ReactToastify.min.css';
import Header from './Components/Header/Header';
import { socket } from './Components/socket/socket';
import LogoLoading from './Element/LogoLoading';
import ScrollToTop from './Element/ScrollToTop';
import useRestaurantBySlug from './hooks/api/useRestaurantBySlug';
import useTableByTableNumber from './hooks/api/useTableByTableNumber';
import useRestaurantStore from './store/useRestaurantStore';
import useTableStore from './store/useTableStore';

function Layout() {
  const customerId = localStorage.getItem('id');
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const { tableNo, restaurantSlug } = useParams();
  const { setTableNumber, setTableDetails } = useTableStore();
  const { setRestaurantSlug, setRestaurantDetails } = useRestaurantStore();

  useEffect(() => {
    setTableNumber(tableNo);
    setRestaurantSlug(restaurantSlug);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    socket.on('test', (payload) => {
      // console.log('from backend', payload)
      queryClient.invalidateQueries({ queryKey: ['OrderList'] });
    });

    if (customerId) socket.emit('joinRoom', customerId);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    tableNo,
    restaurantSlug,
    customerId,
    queryClient,
    setTableNumber,
    setRestaurantSlug,
  ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    socket.on('testStatus', (payload) => {
      console.log('from backend', payload);
      queryClient.invalidateQueries({ queryKey: ['OrderList'] });
    });
  }, []);

  const { data: restaurantData } = useRestaurantBySlug({
    restaurantSlug,
  });

  const { data: tableData } = useTableByTableNumber({
    restaurantId: restaurantData?.restaurant?._id,
    tableNumber: tableNo,
  });

  // TO SET THE RESTAURANT DETAILS
  useEffect(() => {
    if (restaurantData && restaurantSlug) {
      setRestaurantDetails(restaurantData?.restaurant);
    }
  }, [restaurantSlug, restaurantData, setRestaurantDetails]);

  // TO SET THE TABLE DETAILS
  useEffect(() => {
    if (tableData && tableNo) {
      setTableDetails(tableData?.data);
    }
  }, [tableNo, tableData, setTableDetails]);

  return loading ? (
    // Loading state
    <div className='h-[100dvh] flex justify-center items-center bg-slate-100'>
      <LogoLoading />
    </div>
  ) : (
    <>
      <ScrollToTop />

      <Header restaurant={restaurantData?.restaurant} />
      <main className='min-h-[100svh] bg-slate-200 relative overflow-x-hidden'>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
