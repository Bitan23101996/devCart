import api from '@/api/apiClient';
import { ApiResponse } from '@/types/apiResponse.types';
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '@/types/auth.types';

export const login = (payload: LoginRequest) => api.post<LoginResponse, LoginRequest>('/login', payload);

export const register = (payload: RegisterRequest) => api.post<RegisterResponse, RegisterRequest>('/register', payload);
