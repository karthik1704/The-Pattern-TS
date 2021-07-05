import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

interface JokeApiState {
    error: boolean;
    category: string;
    type: string;
    setup: string;
    delivery?: string;
    flags: {
        nsfw: boolean;
        religious: boolean;
        political: boolean;
        racist: boolean;
        sexist: boolean;
        explicit: boolean;
    };
    id: number;
    safe: boolean;
    lang: string;
}

export const jokeApi = createApi({
    reducerPath: 'jokeApi',
    baseQuery: axiosBaseQuery({ baseUrl: 'https://v2.jokeapi.dev/joke/' }),
    endpoints: (builder) => ({
        getJokes: builder.query<JokeApiState, string>({
            query: (category) => ({
                url: `any`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetJokesQuery } = jokeApi;

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: axiosBaseQuery({
        baseUrl: process.env.REACT_APP_API_URL as string,
    }),
    endpoints: (builder) => ({
        getProjects: builder.query<JokeApiState, null>({
            query: () => ({
                url: 'projects/',
                method: 'GET',
            }),
        }),
        getProjectDetail: builder.query<JokeApiState, string>({
            query: (slug) => ({
                url: `projects/${slug}/`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetProjectsQuery, useGetProjectDetailQuery } = projectApi;
