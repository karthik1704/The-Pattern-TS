import { configureStore } from '@reduxjs/toolkit';
import ThemeReducer from './theme/themeSlice';
import AuthReducer from './auth/authSlice';
import { jokeApi, projectApi } from './projects/projectApiSlice';
import { authApi } from './auth/authApi';
import { requestApi } from './request/requestApi';

const store = configureStore({
    reducer: {
        themes: ThemeReducer,
        auth: AuthReducer,
        [jokeApi.reducerPath]: jokeApi.reducer,
        [projectApi.reducerPath]: projectApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [requestApi.reducerPath]: requestApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            jokeApi.middleware,
            projectApi.middleware,
            authApi.middleware,
            requestApi.middleware
        ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
