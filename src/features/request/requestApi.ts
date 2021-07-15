import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

interface Request {
    app_name: string;
    copyright: string;
    description: string;
    url: string;
    name: string;
    email: string;
    country: string;
    promotion: boolean;
}

const requestApi = createApi({
    reducerPath: 'requestApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL as string,
    }),
    endpoints: (builder) => ({
        createRequest: builder.mutation<{ status: number }, Request>({
            query: (body) => ({
                url: 'request',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useCreateRequestMutation } = requestApi;
