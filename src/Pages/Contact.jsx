import useRestaurantBySlug from '@/hooks/api/useRestaurantBySlug';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useParams } from 'react-router';

function Contact() {
  const { restaurantSlug } = useParams();
  const { data: restaurantDetails, isLoading } = useRestaurantBySlug({
    restaurantSlug,
  });
  if (isLoading)
    return (
      <div className='min-h-[100svh] bg-gradient-to-br from-purple-50 via-white to-blue-50 flex justify-center items-center p-4'>
        <div className='flex flex-col items-center gap-4 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl'>
          <div className='w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin' />
          <p className='text-lg font-medium text-gray-700'>
            Loading contact details...
          </p>
        </div>
      </div>
    );

  const contact = restaurantDetails?.restaurant?.contact;

  return (
    <div className='min-h-[100svh] bg-gradient-to-br from-purple-50 via-white to-blue-50 flex justify-center items-center p-4'>
      <div className='flex flex-col gap-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 max-w-md w-full'>
        <h1 className='text-2xl font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient'>
          Contact Information
        </h1>

        <div className='space-y-6'>
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              contact?.address
            )}`}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-4 group hover:opacity-80 transition-opacity'
          >
            <div className='p-3 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 group-hover:from-purple-200 group-hover:to-purple-300 transition-all duration-300'>
              <MapPin className='w-6 h-6 text-purple-600' />
            </div>
            <p className='text-gray-700 font-medium'>{contact?.address}</p>
          </a>

          <a
            href={`mailto:${contact?.email}`}
            className='flex items-center gap-4 group hover:opacity-80 transition-opacity'
          >
            <div className='p-3 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 group-hover:from-blue-200 group-hover:to-blue-300 transition-all duration-300'>
              <Mail className='w-6 h-6 text-blue-600' />
            </div>
            <p className='text-gray-700 font-medium'>{contact?.email}</p>
          </a>

          <a
            href={`tel:${contact?.phone}`}
            className='flex items-center gap-4 group hover:opacity-80 transition-opacity'
          >
            <div className='p-3 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 group-hover:from-indigo-200 group-hover:to-indigo-300 transition-all duration-300'>
              <Phone className='w-6 h-6 text-indigo-600' />
            </div>
            <p className='text-gray-700 font-medium'>{contact?.phone}</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
