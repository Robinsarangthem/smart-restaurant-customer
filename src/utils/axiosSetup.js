import axios from 'axios';

// export const baseURL = 'https://6xmlzdw3-4000.inc1.devtunnels.ms/'
// export const baseURL = 'https://achaathak.com/backend'
export const baseURL = 'https://555f-49-47-140-31.ngrok-free.app';
// export const baseURL =
// 'https://e82f-2405-201-ac0b-b954-8506-a50-a1f9-f05.ngrok-free.app'

export const Axios = axios.create({
  baseURL,
  headers: {
    'ngrok-skip-browser-warning': 'true',
  },
  withCredentials: true,
});
