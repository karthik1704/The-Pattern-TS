import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';
import { authApi } from './authApi';
export interface Auth {
    isAuthenticated: boolean;
    access_token: string | null;
    refresh_token: string | null;
    user: User | null;
}

const initialState: Auth = {
    isAuthenticated: false,
    access_token: null,
    refresh_token: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state: Auth, { payload }: PayloadAction<Auth>) => {
            state.isAuthenticated = payload.isAuthenticated;
            state.access_token = payload.access_token;
            state.refresh_token = payload.refresh_token;
            state.user = payload.user;
        },
        logoutUser: (state: Auth, action: PayloadAction<boolean>) => {
            state.isAuthenticated = false;
            state.access_token = null;
            state.refresh_token = null;
            state.user = null;

            // Remove Tokens From LocalStorage
            window.localStorage.removeItem('isAuthenticated');
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('refresh_token');
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.isAuthenticated = true;
                state.access_token = payload.access_token;
                state.refresh_token = payload.refresh_token;
                state.user = payload.user;

                // Store in Local Storage
                window.localStorage.setItem('isAuthenticated', 'true');
                window.localStorage.setItem(
                    'access_token',
                    payload.access_token!
                );
                window.localStorage.setItem(
                    'refresh_token',
                    payload.refresh_token!
                );
            }
        );
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                state.isAuthenticated = true;
                state.access_token = payload.access_token;
                state.refresh_token = payload.refresh_token;
                state.user = payload.user;
            }
        );
    },
});

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
