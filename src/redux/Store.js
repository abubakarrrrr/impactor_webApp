import authApiSlice, { authApi } from "@/redux/services/Auth/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore,persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};

const persistedauthApiSlice = persistReducer(persistConfig, authApiSlice);

export const store = configureStore({
  reducer: {
    authData: persistedauthApiSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
export const persistor = persistStore(store);

setupListeners(store.dispatch);
