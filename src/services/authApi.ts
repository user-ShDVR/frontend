import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://testtourapp.herokuapp.com",
    }),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body: {email: string; password: string;})=>{
                return{
                    url: "/users/signin",
                    mode: 'no-cors',
                    method: "post",
                    body,
                }
            }
        }),
        registerUser: builder.mutation({
            query: (body: {firstName: string; lastName: string; email: string; password: string;})=>{
                return{
                    url: "/users/signup",
                    mode: 'no-cors',
                    method: "post",
                    body,
                }
            }
        })
    })
})

export const {useLoginUserMutation, useRegisterUserMutation} = authApi;