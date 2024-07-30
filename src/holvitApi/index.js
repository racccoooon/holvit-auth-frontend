import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.HOLVIT_API_BASE_URL,
    timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

/*// Add a request interceptor
apiClient.interceptors.request.use(
    config => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
    response => response,
    error => {
        // Handle global errors
        if (error.response.status === 401) {
            // Handle unauthorized error
            // Redirect to login or show a notification
        }
        return Promise.reject(error);
    }
);*/

export default apiClient;
