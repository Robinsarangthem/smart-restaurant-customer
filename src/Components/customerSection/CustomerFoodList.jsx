import {
  getCategoryRestaurantId,
  getFoodByRestaurantIdCategoryIdSubCategoryName,
  getFoodListByRestaurantId,
  getRestaurantBySlug,
} from '@/api/apiService';
import useRestaurantBySlug from '@/hooks/api/useRestaurantBySlug';
import Category from '@/Pages/category/Category';
import FoodCard from '@/Pages/food-card/FoodCard';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { v4 } from 'uuid';
import useCartStore from '@/store/useCartStore';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function CustomerFoodList() {
  const { restaurantSlug, tableNo } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [subcategories, setSubcategories] = useState(null);
  const itemCount = useCartStore((state) => state.itemCount);

  // get restaurant details
  const { data, isLoading, isError } = useRestaurantBySlug({ restaurantSlug });

  useEffect(() => {
    console.log('data reload', data);
  }, [data]);

  // get food list
  const { data: foodList, isLoading: isFoodLoading } = useQuery({
    queryKey: [
      'foodList',
      data?.restaurant?._id,
      selectedCategory,
      selectedSubcategory,
    ],
    queryFn: () =>
      getFoodByRestaurantIdCategoryIdSubCategoryName(
        data?.restaurant?._id,
        selectedCategory,
        selectedSubcategory
      ),
    enabled: !!data,
  });
  console.log('foodList', foodList);

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-rose-500' />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-rose-500 text-xl'>Something went wrong</div>
      </div>
    );
  }

  // Filter special items (assuming items with isSpecial flag)
  const specialItems =
    foodList?.food?.filter((item) => item.todaysSpecial) || [];

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col'>
      <div className='bg-gradient-to-r from-gray-800 to-rose-700 py-6 px-3 sm:py-8 sm:px-4 shadow-lg'>
        <h2 className='text-2xl sm:text-3xl font-bold text-white text-center'>
          Our Delicious Menu
        </h2>
        <p className='text-sm sm:text-base text-gray-200 text-center mt-2 px-2'>
          Discover our carefully curated selection of dishes
        </p>
      </div>

      <div className='w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 flex-grow'>
        <div className='bg-white rounded-lg shadow-lg p-3 sm:p-6 mb-6 sm:mb-8 overflow-hidden'>
          <Category
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubcategory={selectedSubcategory}
            setSelectedSubcategory={setSelectedSubcategory}
            subcategories={subcategories}
            setSubcategories={setSubcategories}
            restaurantId={data?.restaurant?._id}
          />
        </div>
        {/* Today's Special Section */}
        {specialItems.length > 0 && (
          <div className='mb-8'>
            <div className='flex items-center gap-2 mb-4'>
              <Sparkles className='w-6 h-6 text-yellow-500' />
              <h3 className='text-2xl font-bold text-gray-800'>
                Today's Special
              </h3>
            </div>
            <div className='grid-fluid'>
              {specialItems.map((food) => (
                <div
                  key={food._id}
                  className='group relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(31,_41,_55,_0.5)] rounded-xl'
                >
                  <div className='absolute inset-0 w-full h-full bg-gradient-to-br from-white/40 via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out' />
                  <FoodCard food={food} />
                </div>
              ))}
            </div>
          </div>
        )}

        {isFoodLoading ? (
          <div className='grid-fluid'>
            {[...Array(8)].map(() => (
              <div key={v4()} className='animate-pulse'>
                <div className='bg-slate-200 rounded-xl overflow-hidden'>
                  <div className='h-32 bg-slate-300' />
                  <div className='p-4 space-y-3'>
                    <div className='h-4 bg-slate-300 rounded w-3/4' />
                    <div className='h-3 bg-slate-300 rounded w-full' />
                    <div className='h-3 bg-slate-300 rounded w-2/3' />
                    <div className='h-8 bg-slate-300 rounded w-full mt-2' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : foodList?.food?.length > 0 ? (
          <div className='grid-fluid'>
            {foodList.food.map((food) => (
              <div
                key={food._id}
                className='group relative overflow-hidden transition-all duration-300 hover:shadow-[0_10px_30px_rgba(31,_41,_55,_0.5)] rounded-xl'
              >
                <div className='absolute inset-0 w-full h-full bg-gradient-to-br from-white/40 via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out' />
                <FoodCard food={food} />
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-12 px-4'>
            <div className='text-4xl mb-4'>😕</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              No Items Found
            </h3>
            <p className='text-gray-500 text-center'>
              We couldn't find any food items in this category.
            </p>
          </div>
        )}
      </div>

      {itemCount > 0 && (
        <Link
          to={`/restaurant/${restaurantSlug}/${tableNo}/cart`}
          className='fixed bottom-4 left-1/2 -translate-x-1/2 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-2000 flex items-center gap-1.5 sm:gap-2 z-50 text-sm sm:text-base bg-[length:200%_200%] bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 animate-pulse hover:animate-none'
        >
          <ShoppingBag className='w-4 h-4 sm:w-5 sm:h-5 animate-pulse hover:animate-none' />
          <span className='font-medium'>View Cart ({itemCount})</span>
        </Link>
      )}

      <footer className='bg-gradient-to-r from-gray-900 pb-[5rem] to-rose-900 text-white py-6 sm:py-8 mt-8 sm:mt-12'>
        <div className='w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-transparent bg-clip-text'>
              Achaathak
            </div>
            <p className='mt-2 text-sm sm:text-base text-gray-300'>
              Elevating Your Dining Experience
            </p>
            <div className='mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400'>
              © {new Date().getFullYear()} Achaathak. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
