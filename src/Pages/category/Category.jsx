import ToggleButton from '@/Components/ToggleButton';
import { getCategoryRestaurantId } from '@/api/apiService';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useRef } from 'react';
import { v4 } from 'uuid';

function Category({
  restaurantId,
  selectedCategory,
  selectedSubcategory,
  setSelectedCategory,
  setSelectedSubcategory,
  subcategories,
  setSubcategories,
}) {
  const categoryWrapperRef = useRef(null);
  const subcategoryWrapperRef = useRef(null);
  const queryClient = useQueryClient();

  const {
    data: categoryList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['categoryList', restaurantId],
    queryFn: () => getCategoryRestaurantId(restaurantId),
  });

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div>
          <h5 className='text-sm font-medium text-gray-500 px-1'>Categories</h5>
          <ScrollArea className='w-full rounded-xl bg-white shadow-sm'>
            <div className='flex items-center gap-2 p-3'>
              {[...Array(5)].map((_, i) => (
                <div
                  key={v4()}
                  className='h-8 w-24 bg-slate-200 rounded-lg animate-pulse'
                />
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='bg-gray-100' />
          </ScrollArea>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='text-center p-8 text-red-500'>
        Error loading categories. Please try again.
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div>
        <h5 className='text-sm font-medium text-gray-500 px-1'>Categories</h5>
        <ScrollArea className='w-full rounded-xl bg-white shadow-sm'>
          <div ref={categoryWrapperRef} className='flex items-center gap-2 p-3'>
            <ToggleButton
              wraperRefs={[categoryWrapperRef, subcategoryWrapperRef]}
              cb={() => {
                setSelectedCategory(null);
                setSelectedSubcategory(null);
                setSubcategories(null);
              }}
              className={!selectedCategory ? 'bg-blue-500 text-white' : ''}
            >
              All
            </ToggleButton>
            {categoryList?.categories?.map((category) => (
              <ToggleButton
                key={category?._id}
                wraperRefs={[categoryWrapperRef, subcategoryWrapperRef]}
                cb={() => {
                  setSelectedCategory(category?._id);
                  setSelectedSubcategory(null);
                  setSubcategories(category?.subcategory);
                }}
                className={
                  selectedCategory === category?._id
                    ? 'bg-blue-500 text-white'
                    : ''
                }
              >
                {category?.category}
              </ToggleButton>
            ))}
          </div>
          <ScrollBar orientation='horizontal' className='bg-gray-100' />
        </ScrollArea>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          selectedCategory && subcategories?.length > 0
            ? 'max-h-[200px] opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className='py-2'>
          <h5 className='text-sm font-medium text-gray-500 px-1'>
            Sub-Categories
          </h5>
          <ScrollArea className='w-full rounded-xl bg-white shadow-sm'>
            <div
              className='flex items-center gap-2 p-3'
              ref={subcategoryWrapperRef}
            >
              {subcategories?.map((subcategory) => (
                <ToggleButton
                  key={subcategory}
                  wraperRefs={[subcategoryWrapperRef]}
                  cb={() => {
                    setSelectedSubcategory(subcategory);
                  }}
                  className={
                    selectedSubcategory === subcategory
                      ? 'bg-blue-500 text-white'
                      : ''
                  }
                >
                  {subcategory}
                </ToggleButton>
              ))}
            </div>
            <ScrollBar orientation='horizontal' className='bg-gray-100' />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

export default memo(Category);
