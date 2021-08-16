import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';
import { Auth } from './authSlice';

export interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest extends LoginRequest {
    first_name: string;
    last_name: string;
    password1: string;
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
                url: 'auth/login/',
                method: 'POST',
                data: credentials,
            }),
        }),
        register: builder.mutation<Auth, Omit<RegisterRequest, 'password'>>({
            query: (credentials) => ({
                url: 'auth/registration/',
                method: 'POST',
                data: credentials,
            }),
        }),
        // Forgot Password
        sendMail: builder.mutation<{ ok: string }, string>({
            query: (email) => ({
                url: 'auth/password/reset/',
                method: 'POST',
                data: {
                    email,
                },
            }),
        }),
        resetForgotPassword: builder.mutation<
            { ok: string },
            {
                uid: string;
                token: string;
                new_password1: string;
                new_password2: string;
            }
        >({
            query: (credentials) => ({
                url: 'auth/password/reset/confirm/',
                method: 'POST',
                data: credentials,
            }),
        }),
        // Reset Password
        changePassword: builder.mutation<
            { ok: string },
            {
                old_password?: string;
                new_password1: string;
                new_password2: string;
            }
        >({
            query: (credentials) => ({
                url: 'auth/password/change/',
                method: 'POST',
                data: credentials,
            }),
        }),

        // Verify Email
        verifyEmail: builder.mutation<
            { ok: string },
            {
                token: string;
                uid: string;
            }
        >({
            query: (credentials) => ({
                url: 'verify/email/',
                method: 'POST',
                data: credentials,
            }),
        }),

        // Delete Account

        deleteAccount: builder.mutation<{ ok: string }, void>({
            query: () => ({
                url: 'user/',
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useChangePasswordMutation,
    useDeleteAccountMutation,
    useResetForgotPasswordMutation,
    useSendMailMutation,
    useVerifyEmailMutation,
} = authApi;
