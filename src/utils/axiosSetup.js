import axios from 'axios'

export const baseURL = 'https://9sjnwt2k-1000.inc1.devtunnels.ms/'
// export const baseURL = 'http://localhost:1000'

export const Axios = axios.create({
	baseURL,
})