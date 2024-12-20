import axios from 'axios'

// export const baseURL = 'https://6xmlzdw3-4000.inc1.devtunnels.ms/'
// export const baseURL = 'https://achaathak.com/backend'
// export const baseURL = 'https://555f-49-47-140-31.ngrok-free.app';
export const baseURL =
	'https://1771-2409-4066-e10-a5f7-a40f-cdae-5fff-a02.ngrok-free.app'

export const Axios = axios.create({
	baseURL,
	headers: {
		'ngrok-skip-browser-warning': 'true',
	},
	withCredentials: true,
})
