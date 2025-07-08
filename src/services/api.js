import axios from 'axios';

// Base URL for API calls - you can change this to your backend URL
const BASE_URL = 'https://iiche-be.onrender.com/'; // Change this to your backend URL

// Create axios instance with default configuration
const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 5000000, // 5 minutes timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Log request details
        console.log('🚀 API Request:', {
            method: config.method?.toUpperCase(),
            url: config.url,
            baseURL: config.baseURL,
            data: config.data instanceof FormData ? 'FormData' : config.data,
            headers: config.headers,
        });
        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Log response details
        console.log('✅ API Response:', {
            status: response.status,
            statusText: response.statusText,
            url: response.config.url,
            data: response.data,
        });

        return response;
    },
    (error) => {
        // Handle different error scenarios
        console.error('❌ API Error:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: error.config?.url,
            data: error.response?.data,
        });

        // Handle specific error status codes
        if (error.response?.status === 401) {
            // Handle unauthorized access
            console.log('🔐 Unauthorized access - redirecting to login');
            // You can add redirect logic here
            // window.location.href = '/login';
        }

        if (error.response?.status === 403) {
            // Handle forbidden access
            console.log('🚫 Forbidden access');
        }

        if (error.response?.status >= 500) {
            // Handle server errors
            console.log('🔥 Server error');
        }

        return Promise.reject(error);
    }
);

export default apiClient; 