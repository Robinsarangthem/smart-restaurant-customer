import axios from 'axios'

// export const baseURL = 'https://9sjnwt2k-1000.inc1.devtunnels.ms/'
export const baseURL = 'http://139.59.24.128:3003/backend/	'

export const Axios = axios.create({
	baseURL,
})
