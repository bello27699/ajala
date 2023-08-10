import axios from 'axios';
// config
import { TIQWA_BASE_URL, TIQWA_API_KEY } from '../config';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ 
    baseURL: TIQWA_BASE_URL,
    headers: {
        'Authorization': `Bearer ${TIQWA_API_KEY}`,
        'Content-Type': 'application/json',
    } 
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
