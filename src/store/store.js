import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { videosSlice } from "./videos/videosSlice";

export const store = configureStore({
    reducer: {
        videos: videosSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})