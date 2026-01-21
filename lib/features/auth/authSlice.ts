import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

export interface User {
    _id: string;
    username: string;
    email?: string;
    role: string;
    token: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};  


export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<User, any>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<User, any>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),
        googleLogin: builder.mutation<User, { token: string }>({
            query: (data) => ({
                url: '/auth/google',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGoogleLoginMutation } = authApi;

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.token = action.payload.token;
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        },
        initializeAuth: (state) => {
            if (typeof window !== 'undefined') {
                const user = localStorage.getItem('user');
                if (user) {
                    const parsedUser = JSON.parse(user);
                    state.user = parsedUser;
                    state.token = parsedUser.token;
                }
            }
        }
    },
});

export const { setCredentials, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer; 









