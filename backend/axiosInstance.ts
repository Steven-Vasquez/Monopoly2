import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
});

axiosInstance.defaults.withCredentials = true; // Allow cookies to be stored in the browser

export default axiosInstance;