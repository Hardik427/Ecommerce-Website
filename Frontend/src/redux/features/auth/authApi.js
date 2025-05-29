import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {getBaseURL} from "../../../utils/baseURL"
const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/auth`,
        credentials: "include",
    }),
    endpoints : (builder) => ({
        registerUser : builder.mutation({
            query : (newUser) =>({
                url : "/register",
                method : "POST",
                body : newUser
            })
        }),
        loginUser : builder.mutation({
            query : (credentials) => ({
                url : "/login",
                method : "POST",
                body : credentials
            })
        })
    })
})

export const {useRegisterUserMutation,useLoginUserMutation} = authApi;
export default authApi