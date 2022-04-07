//  React-specific entry point that automatically generates
//  hooks corresponding to the defined endpoints 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {IPost} from '../models/IPost';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPost[], number>({
            // TODO: how to make optional argument?
            query: (limit = 5) => ({
                url: '/posts',
                params: {
                    _limit: limit,
                }
            }),
            providesTags: result => ['Post'],
        }),
        createPost: builder.mutation<IPost, IPost>({
            query: (post) => ({
                url: '/posts',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ['Post'],
        }) 
    }),
});