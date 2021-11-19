import { createApi, retry } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

export interface Board {
    id: number;
    board_name: string;
    slug: string;
    created_at: string;
}

interface BoardItems {
    id: number;
    myboard: number;
    image: string;
    created_at: string;
}
export interface BoardDetail extends Board {
    board_items: BoardItems[];
}

interface GetBoard {
    count: number;
    next: string | null;
    previous: string | null;
    results: Board[];
}

export const myBoardsApi = createApi({
    reducerPath: 'myBoardApi',
    tagTypes: ['MyBoards'],
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL as string,
    }),
    endpoints: (builder) => ({
        getBoards: builder.query<GetBoard, void>({
            query: () => ({
                url: 'myboards/',
            }),
            providesTags: (result, error, arg) =>
                result
                    ? [
                          ...result.results.map(({ slug }) => ({
                              type: 'MyBoards' as const,
                              id: slug,
                          })),
                          'MyBoards',
                      ]
                    : ['MyBoards'],
        }),
        getBoardDetail: builder.query<BoardDetail, string>({
            query: (slug) => ({
                url: `myboards/${slug}/`,
            }),
            providesTags: (result, error, slug) => [
                { type: 'MyBoards', id: slug },
            ],
        }),
        createBoard: builder.mutation<
            Board,
            Omit<Board, 'id' | 'created_at' | 'slug'>
        >({
            query: (data) => ({
                url: 'myboards/',
                method: 'POST',
                data,
            }),
            invalidatesTags: ['MyBoards'],
        }),
        deleteBoard: builder.mutation<Board, string>({
            query: (slug) => ({
                url: `myboards/${slug}/`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, slug) => [
                { type: 'MyBoards', id: slug },
            ],
        }),
    }),
});

export const {
    useCreateBoardMutation,
    useGetBoardsQuery,
    useGetBoardDetailQuery,
    useDeleteBoardMutation,
} = myBoardsApi;
