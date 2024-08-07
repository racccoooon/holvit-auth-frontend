import apiClient from './index';

const authApi = {
    verifyPassword(username, password, rememberMe, token) {
        return apiClient.post('/api/auth/verify-password', {
            username, password, remember_me: rememberMe, token,
        });
    },
    resetPassword(newPassword, token) {
        return apiClient.post('/api/auth/reset-password', {
            new_password: newPassword, token,
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
    },
};

export default authApi;