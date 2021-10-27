import { createApi, retry } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

export interface Board {
    id: number;
    name: string;
    slug: string;
    created_at: string;
}

interface GetBoard {
    count: number;
    next: string | null;
    previous: string | null;
    results: Board[];
}

export const myBoardsApi = createApi({
    reducerPath: 'myBoardApi',
    tagTypes: ['myBoards'],
    baseQuery: retry(
        axiosBaseQuery({
            baseUrl: process.env.REACT_APP_API_URL as string,
        })
    ),
    endpoints: (builder) => ({
        getBoards: builder.query<GetBoard, void>({
            query: () => ({
                url: 'myboards/',
            }),
        }),
        getBoardDetail: builder.query<Board, string>({
            query: (slug) => ({
                url: `myboards/${slug}/`,
            }),
        }),
        createBoard: builder.mutation<
            Board,
            Omit<Board, 'id' | 'created_at' | 'slug'>
        >({
            query: (data) => ({
                url: 'myboards/create/',
                method: 'POST',
                data,
            }),
        }),
        deleteBoard: builder.mutation<Board, string>({
            query: (slug) => ({
                url: `myboards/delete/${slug}/`,
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
