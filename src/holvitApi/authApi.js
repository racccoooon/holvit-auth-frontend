import apiClient from './index';

const authApi = {
    login(credentials) {
        return apiClient.post('/auth/login', credentials);
    },
    logout() {
        return apiClient.post('/auth/logout');
    },
    register(userData) {
        return apiClient.post('/auth/register', userData);
    },
};

export default authApi;