import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { login, register } from '@/features/auth/services/auth.service';
import { AuthState, LoginRequest, RegisterRequest } from '@/types/auth.types';

const token = sessionStorage.getItem('token');
const storedUser = sessionStorage.getItem('loggedInUser');

const initialState: AuthState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    error: null,
    isAuthenticated: !!token //handle refresh case
};

//Login Thunk
export const loginUser = createAsyncThunk('auth/login',
    async (payload: LoginRequest) => {
        const result = await login(payload);
        const { token, userid, name } = result?.data;
        //store value from storage for future use
        sessionStorage.setItem('token', token);
        sessionStorage.setItem(
            'loggedInUser',
            JSON.stringify({
                userid: userid,
                name: name,
            })
        );
        return result;
    }
);

//Register Thunk
export const registerUser = createAsyncThunk('auth/register',
    async (payload: RegisterRequest) => {
        const result = await register(payload);
        return result;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('loggedInUser');


            state.user = null;
            state.error = null;
            state.loading = false;
            state.isAuthenticated = false;
        }
    },

    extraReducers: builder => {
        builder

            //Login
            .addCase(loginUser.pending, state => {
                state.loading = true;
                state.error = null;
            })

            .addCase(
                loginUser.fulfilled,
                (state, action) => {
                    state.loading = false;
                    state.user = action.payload.data;
                    state.isAuthenticated = true;
                }
            )

            .addCase(
                loginUser.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error.message ?? 'Login failed';
                }
            )

            //register
            .addCase(registerUser.pending, state => {
                state.loading = true;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, state => {
                state.loading = false;
            })

            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Registration failed';
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;