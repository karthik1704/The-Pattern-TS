import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from './projects/projectSlice';
import ThemeReducer from './theme/themeSlice';

const store = configureStore({
    reducer:{
        projects: ProjectReducer,
        themes: ThemeReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;