import { useQuery } from '@tanstack/react-query';
import { getAllQRCodes } from '@/api/apiService';
import { QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/Components/ui/button';

export default function ShowQRCodes() {
  const {
    data: qrCodes,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['qrCodes'],
    queryFn: () => getAllQRCodes('theden'),
  });

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-rose-500 text-xl'>Failed to load QR codes</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            QR Codes
          </h1>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Scan these QR codes to access restaurant menus and services
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {qrCodes?.data?.map((qr) => (
            <div
              key={qr._id}
              className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden'
            >
              <div className='p-6'>
                <div className='flex items-center justify-between mb-4'>
                  <div className='flex items-center gap-2'>
                    <QrCode className='w-6 h-6 text-blue-500' />
                    <h3 className='font-semibold text-gray-900'>
                      Table {qr.tableNumber}
                    </h3>
                  </div>
                  {qr.isOccupied ? (
                    <span className='px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full'>
                      Occupied
                    </span>
                  ) : qr.isReserved ? (
                    <span className='px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full'>
                      Reserved
                    </span>
                  ) : (
                    <span className='px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full'>
                      Available
                    </span>
                  )}
                </div>

                <div className='aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4'>
                  <img
                    src={qr.qrCode}
                    alt={`QR Code for table ${qr.tableNumber}`}
                    className='w-full h-full object-contain p-4'
                  />
                </div>

                <div className='space-y-2'>
                  <p className='text-sm text-gray-600'>
                    Restaurant: {qr.restaurantId.name}
                  </p>
                  <p className='text-sm text-gray-600'>
                    Created: {new Date(qr.createdAt).toLocaleDateString()}
                  </p>
                  <Link
                    to={`/restaurant/${qr.restaurantId.slug}/${qr.tableNumber}`}
                    className='block w-full'
                  >
                    <Button className='w-full flex items-center justify-center gap-2'>
                      <span>Try QR Code</span>
                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                      <svg
                        className='w-4 h-4'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 5l7 7-7 7'
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!qrCodes || qrCodes?.data?.length === 0) && (
          <div className='text-center py-12'>
            <div className='text-4xl mb-4'>🤔</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              No QR Codes Found
            </h3>
            <p className='text-gray-500'>
              There are currently no QR codes available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
