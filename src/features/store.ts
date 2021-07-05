import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from './projects/projectSlice';
import ThemeReducer from './theme/themeSlice';
import AuthReducer from './auth/authSlice';

const store = configureStore({
    reducer:{
        projects: ProjectReducer,
        themes: ThemeReducer,
        auth: AuthReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;