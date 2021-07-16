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
        // Forgot Password
        sendMail: builder.mutation<{ ok: string }, string>({
            query: (email) => ({
                url: 'forgotpassword',
                method: 'POST',
                body: {
                    email,
                },
            }),
        }),
        resetForgotPassword: builder.mutation<
            { ok: string },
            {
                uid: string;
                token: string;
                password: string;
                password1: string;
            }
        >({
            query: (credentials) => ({
                url: 'reset/password',
                method: 'POST',
                body: credentials,
            }),
        }),
        // Reset Password
        changePassword: builder.mutation<
            { ok: string },
            {
                old_password: string;
                password: string;
                password1: string;
            }
        >({
            query: (credentials) => ({
                url: 'change/password',
                method: 'POST',
                body: credentials,
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
                url: 'verify/email',
                method: 'POST',
                body: credentials,
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
