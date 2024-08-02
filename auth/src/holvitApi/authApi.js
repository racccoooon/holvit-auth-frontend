import apiClient from './index';

const authApi = {
    verifyPassword(username, password, token) {
        return apiClient.post('/api/auth/verify-password', {
            username, password, token
        });
    },
};

export default authApi;