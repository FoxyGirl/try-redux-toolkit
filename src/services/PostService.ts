//  React-specific entry point that automatically generates
//  hooks corresponding to the defined endpoints 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import {IPost} from '../models/IPost';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
    endpoints: (builder) => ({
        fetchAllPosts: builder.query<IPost[], number>({
            // TODO: how to make optional argument?
            query: (limit = 5) => ({
                url: '/posts',
                params: {
                    _limit: limit,
                }
            })
        })
    }),
});