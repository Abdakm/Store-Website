import axios from 'axios'

export const fetchApi = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
    },
})