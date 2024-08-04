import apiClient from './index';
import {useDeviceId} from '../util.js'

const authApi = {
    verifyPassword(username, password, token) {
        return apiClient.post('/api/auth/verify-password', {
            username, password, token,
        });
    },
    resetPassword(username, password, newPassword, token) {
        return apiClient.post('/api/auth/reset-password', {
            username, password, new_password: newPassword, token,
        })
    },
    getOnboardingTotp(token) {
        return apiClient.post('/api/auth/get-onboarding-totp', {
            token,
        })  
    },
    verifyTotp(code, token) {
        return apiClient.post('/api/auth/verify-totp', {
            code, token,
        })
    },
    verifyDevice(code, token) {
        return apiClient.post('/api/auth/verify-device', {
            code, token,
        })
    }
};

export default authApi;