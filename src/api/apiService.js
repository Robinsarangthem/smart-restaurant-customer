import { Axios } from '@/utils/axiosSetup';

export const getRestaurantBySlug = async (slug) => {
  const response = await Axios.get(`/api/restaurant/getBySlug/${slug}`);
  console.log('response', response);
  return response.data;
};

export const getCategoryRestaurantId = async (restaurantId) => {
  const response = await Axios.get(`/api/category/list/${restaurantId}`);
  return response.data;
};
export const getFoodListByRestaurantId = async (restaurantId) => {
  const response = await Axios.get(`/api/food/FoodList/${restaurantId}`);
  console.log(response);
  return response.data;
};

export const getFoodByRestaurantIdCategoryIdSubCategoryName = async (
  restaurantId,
  categoryId,
  subCategoryName
) => {
  if (!categoryId) {
    const response = await Axios.get(
      `/api/food/getFood/${restaurantId}/null/null`
    );
    return response.data;
  }

  if (!subCategoryName) {
    const response = await Axios.get(
      `/api/food/getFood/${restaurantId}/${categoryId}/null`
    );
    return response.data;
  }

  const response = await Axios.get(
    `/api/food/getFood/${restaurantId}/${categoryId}/${subCategoryName}`
  );
  return response.data;
};

export const getAllCategoriesOfRestaurant = async (restaurantId) => {
  const response = await Axios.get(`/api/category/list/${restaurantId}`);
  console.log(response);
  return response.data;
};

export const handleLoginOrSignup = async (restaurantId, tableId, data) => {
  const response = await Axios.post(
    `/api/customer/register/restaurant/${restaurantId}/table/${tableId}`,
    data
  );
  return response.data;
};

export const getTableByTableNumber = async (restaurantId, tableNo) => {
  const response = await Axios.get(
    `/api/table/table/number/${tableNo}/restaurant/${restaurantId}`
  );
  return response.data;
};

export const verifyOTP = async (restaurantId, tableId, data) => {
  const response = await Axios.post(
    `/api/customer/verify/restaurant/${restaurantId}/table/${tableId}`,
    data
  );
  return response.data;
};

export const resendOTP = async (restaurantId, tableId, data) => {
  const response = await Axios.post(
    `/api/customer/resend/restaurant/${restaurantId}/table/${tableId}`,
    data
  );
  return response.data;
};

export const logout = async () => {
  const response = await Axios.post('/api/customer/logout');
  return response.data;
};

export const createOrder = async (data) => {
  const response = await Axios.post('/api/order/create', data);
  return response.data;
};

export const getOrders = async () => {
  const response = await Axios.get('/api/order/myOrders');
  return response.data;
};

export const addOrder = async (data) => {
  const response = await Axios.put('/api/order/addOrder', data);
  return response.data;
};
