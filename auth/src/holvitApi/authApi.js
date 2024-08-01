import apiClient from './index';

const authApi = {
    auth_step(token, type, credentials) {
        return apiClient.post('/authenticate', {
            token, type, credentials
        });
    },
};

export default authApi;