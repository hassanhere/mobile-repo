import { createApi } from '@reduxjs/toolkit/query/react';
import { baseApiQuery } from './apiHelper';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseApiQuery,
  endpoints: builder => ({
    userLogin: builder.mutation({
      query: body => ({
        url: 'auth/login/user',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
