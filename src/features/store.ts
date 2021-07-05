import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from './theme/themeSlice';
import AuthReducer from './auth/authSlice';
import { projectApiSlice } from "./projects/projectApiSlice";

const store = configureStore({
    reducer:{
        themes: ThemeReducer,
        auth: AuthReducer,
        [projectApiSlice.reducerPath] : projectApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware().concat(projectApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;