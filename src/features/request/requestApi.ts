import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

export interface Request {
    app_name: string;
    platform: string;
    copyright: string;
    description: string;
    app_url: string;
    name: string;
    email: string;
    country: string;
    promotion: boolean;
}

export const requestApi = createApi({
    reducerPath: 'requestApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL as string,
    }),
    endpoints: (builder) => ({
        createRequest: builder.mutation<{ status: number }, Request>({
            query: (data) => ({
                url: 'requests/create/',
                method: 'POST',
                data,
            }),
        }),
    }),
});

export const { useCreateRequestMutation } = requestApi;
