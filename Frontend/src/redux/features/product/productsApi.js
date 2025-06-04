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
            query: ({category, color, minPrice, maxPrice, page = 1, limit = 10}) => {
                const queryParams = new URLSearchParams({
                    category: category || 'all',
                    color: color || 'all',
                    minPrice: minPrice || 0,
                    maxPrice: maxPrice || '',
                    page: page.toString(),
                    limit: limit.toString()                    
                }).toString();
                return `?${queryParams}`;
            },
            providesTags: ['Products']
    }),
        fetchProductById: builder.query({
            query: (productId) => `/${productId}`,
            providesTags: (result, error, productId) => [{ type: 'Products', id: productId }],
                
    }),
        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/create-product',
                method: 'POST',
                body: newProduct,
                credentials: 'include',
            }),
            invalidatesTags: ['Products'],
        }),
        fetchRelatedProducts: builder.query({
            query: (id) => `/related-products/${id}`,
        }),
        updateProduct: builder.mutation({
            query:({id , ...rest}) => ({
                url: `/update-product/${id}`,
                method: 'PATCH',
                body: rest,
                credentials: 'include'
            }),
            invalidatesTags : ['Products'],
        })
    })
});

export default productsApi;