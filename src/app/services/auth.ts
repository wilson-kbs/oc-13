import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Credentials = {
  email: string;
  password: string;
};

type LoginResponse = {
  status: number;
  message: string;
  body: {
    token: string;
  };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: new URL("/api/v1/user", import.meta.env.VITE_API_URL).toString(),
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, Credentials>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
