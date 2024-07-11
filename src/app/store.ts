import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth.ts";
import { profileApi } from "src/app/services/profile.ts";
import authReducer from "./slices/authSlice.ts";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
