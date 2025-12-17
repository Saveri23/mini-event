import axios from 'axios';

// Create an Axios instance with base URL pointing to your backend
const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
});

// Optional: Add a request interceptor to include token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // JWT stored in localStorage
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
