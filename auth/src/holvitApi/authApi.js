import apiClient from './index';
import {useDeviceId} from 'components/src/util.js'

const authApi = {
    verifyPassword(username, password, token) {
        return apiClient.post('/api/auth/verify-password', {
            username, password, token, deviceId: useDeviceId(), userAgent: navigator.userAgent,
        });
    },
};

export default authApi;