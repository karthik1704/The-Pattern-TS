import { createApi, retry } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';
import { User } from '../../types/types';
import { Auth } from './authSlice';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    first_name: string;
    last_name: string;
    email: string;
    password1: string;
    password2: string;
    terms: boolean;
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: retry(
        axiosBaseQuery({
            baseUrl: process.env.REACT_APP_API_URL as string,
        })
    ),
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
        // getUser
        getUser: builder.query<User, void>({
            query: () => ({
                url: 'auth/user/',
                method: 'GET',
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
    useGetUserQuery,
    useChangePasswordMutation,
    useDeleteAccountMutation,
    useResetForgotPasswordMutation,
    useSendMailMutation,
    useVerifyEmailMutation,
} = authApi;
