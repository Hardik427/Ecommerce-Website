import {createApi , fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

const adminApi = createApi({
    reducerPath : 'adminApi',
    baseQuery : fetchBaseQuery({
        baseUrl : `${getBaseURL()}/api/admin`,
        credentials : "include"
    }),
    endpoints : (builder) =>({
        adminSummary : builder.query({
            query : () =>({
                url: '/summary',
                method: 'GET'
            })
        })
    })
})

export const { useAdminSummaryQuery } = adminApi;
export default adminApi