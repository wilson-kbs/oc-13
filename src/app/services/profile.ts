import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Profile = {
  email: string;
  firstName: string;
  lastName: string;
};

type UpdateProfile = Pick<Profile, "firstName" | "lastName">;

type Response<Body> = {
  status: number;
  message: string;
  body: Body;
};

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: new URL(
      "/api/v1/user/profile",
      import.meta.env.VITE_API_URL,
    ).toString(),
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<Profile, void>({
      query: () => ({
        url: "/",
        method: "POST",
      }),
      transformResponse: (response: Response<Profile>) => {
        return response.body;
      },
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation<Profile, Partial<UpdateProfile>>({
      query: (profile) => ({
        url: "/",
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetProfileQuery } = profileApi;
export const { useUpdateProfileMutation } = profileApi;
