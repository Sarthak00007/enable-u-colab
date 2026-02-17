import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '../services/authService';

export const useLogin = () => {
    return useMutation({
        mutationFn: (credentials) => authService.login(credentials),
        onSuccess: (data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
            }
        },
    });
};

export const useRegister = () => {
    return useMutation({
        mutationFn: (userData) => authService.register(userData),
    });
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: (email) => authService.forgotPassword(email),
    });
};

export const useStats = () => {
    return useQuery({
        queryKey: ['userStats'],
        queryFn: authService.getUserStats,
    });
};

export const useLeaderboard = () => {
    return useQuery({
        queryKey: ['leaderboard'],
        queryFn: authService.getLeaderboard,
    });
};
