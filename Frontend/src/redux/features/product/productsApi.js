import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getBaseURL } from './../../../utils/baseURL';

const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseURL : `${getBaseURL()}/api/products`,
        credentials: 'include',
    }),
    tagTypes: ['Products'],
    endpoints : (builder) => ({
        fetchAllProducts: builder.query({
            query: ({}) => ({
            
            })
    })
})