import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../../utils/baseURL';

const orderApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/orders`,
        credentials: 'include',
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder : builder.mutation({
           query: (newOrder) => ({
                url : '/create-order',
                method: 'POST',
                body: newOrder,
                credentials: 'include',
           }),
              invalidatesTags: ['Orders'],
        }),
        fetchUserOrders: builder.query({
            query: () => '/',
            providesTags: ['Orders'],
        }),
        fetchAllOrders: builder.query({
            query: () => '/admin',
            providesTags: ['Orders'],
        }), 
        updateOrderStatus: builder.mutation({
            query: ({id, status}) => ({
                url: `/update-order/${id}`,
                method: 'PUT',
                body: {status},
                credentials: 'include',
            }),
            invalidatesTags: ['Orders'],
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/delete-order/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: ['Orders'],
        }),
    })
})

export const {
    useCreateOrderMutation,
    useFetchUserOrdersQuery,
    useFetchAllOrdersQuery,
    useUpdateOrderStatusMutation,
    useDeleteOrderMutation,
} = orderApi;
export default orderApi.reducer;