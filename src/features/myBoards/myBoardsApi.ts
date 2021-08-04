import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

interface Board {
    id: number;
    slug: string;
    created_at: string;
}

export const myBoardsApi = createApi({
    reducerPath: 'myBoardApi',
    tagTypes: ['myBoards'],
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL as string,
    }),
    endpoints: (builder) => ({
        getBoards: builder.query<Board, void>({
            query: () => ({
                url: 'myboards',
            }),
        }),
        getBoardDetail: builder.query<Board, string>({
            query: (slug) => ({
                url: `myboards/${slug}`,
            }),
        }),
        createBoard: builder.mutation<Board, Omit<Board, 'id' | 'created_at'>>({
            query: (data) => ({
                url: 'myboards/create',
                method: 'POST',
                data,
            }),
        }),
        deleteBoard: builder.mutation<Board, string>({
            query: (slug) => ({
                url: `myboards/delete/${slug}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'myBoards', id }],
        }),
    }),
});

export const {
    useCreateBoardMutation,
    useGetBoardsQuery,
    useGetBoardDetailQuery,
    useDeleteBoardMutation,
} = myBoardsApi;
