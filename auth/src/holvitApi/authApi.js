import apiClient from './index';

const authApi = {
    verifyPassword(username, password, rememberMe, token) {
        return apiClient.post('/auth/verify-password', {
            username, password, rememberMe, token,
        });
    },
    resetPassword(newPassword, token) {
        return apiClient.post('/auth/reset-password', {
            newPassword, token,
        })
    },
    getOnboardingTotp(token) {
        return apiClient.post('/auth/get-onboarding-totp', {
            token,
        })
    },
    verifyTotp(code, token) {
        return apiClient.post('/auth/verify-totp', {
            code, token,
        })
    },
    verifyDevice(code, token) {
        return apiClient.post('/auth/verify-device', {
            code, token,
        })
    },
};

export default authApi;