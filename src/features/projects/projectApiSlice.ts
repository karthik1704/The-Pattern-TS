import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../../helper/axiosBaseQuery';

interface ProjectApiState {
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
        explicit: boolean
    };
    id: number;
    safe: boolean;
    lang: string;
}



export const projectApiSlice = createApi({
    reducerPath: 'projectApi',
    baseQuery: axiosBaseQuery({baseUrl:'https://v2.jokeapi.dev/joke/'}),
    endpoints:(builder)=> ({
        getProjects: builder.query<ProjectApiState, string>({
            query: (category)=>({
                url: `any`,
                method: 'GET'
            }),
        }),
    }),
});




export const { useGetProjectsQuery } = projectApiSlice;