import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';
import { Auth } from './authSlice';

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest extends LoginRequest {
    first_name: string;
    last_name: string;
    password2: string;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL as string,
    }),
    endpoints: (builder) => ({
        login: builder.mutation<Auth, LoginRequest>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<Auth, RegisterRequest>({
            query: (credentials) => ({
                url: 'registration',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
