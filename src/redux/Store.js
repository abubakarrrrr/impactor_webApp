import authApiSlice, { authApi } from "@/redux/services/Auth/authApi";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    authData:authApiSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

