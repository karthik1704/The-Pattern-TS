import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

interface BoardRequest {
    name: string;
}

interface BoardResponse extends BoardRequest {
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
        getBoards: builder.query<BoardResponse, void>({
            query: () => ({
                url: 'myboards',
            }),
        }),
        getBoardDetail: builder.query<BoardResponse, void>({
            query: (slug) => ({
                url: `myboards/${slug}`,
            }),
        }),
        createBoard: builder.mutation<BoardResponse, BoardRequest>({
            query: (body) => ({
                url: 'myboards/create',
                method: 'POST',
                body,
            }),
        }),
        deleteBoard: builder.mutation<BoardResponse, string>({
            query: (slug) => ({
                url: `myboards/delete/${slug}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'myBoards', id }],
        }),
    }),
});
