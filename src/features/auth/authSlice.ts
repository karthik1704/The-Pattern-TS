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
        loginUser: (state: Auth, action: PayloadAction<boolean>) => {
            state.isAuthenticated = action.payload;
        },
        logoutUser: (state: Auth, action: PayloadAction<boolean>) => {
            state.isAuthenticated = false;
            state.access_token = null;
            state.refresh_token = null;
            state.user = null;
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
