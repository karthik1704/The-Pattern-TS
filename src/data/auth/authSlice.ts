import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/types';


interface Auth {
    auth: boolean;
    access_token: string | null;
    refresh: string | null;
    user: User | null;
}

const initialState: Auth = {
    auth: false,
    access_token: null,
    refresh: null,
    user: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        loginUser: (state:Auth, action:PayloadAction<Auth>)=>{
            state = action.payload;
        },
        logoutUser: (state:Auth, action:PayloadAction<Auth>) => {
            state = action.payload;
        }
    }
})

export const { loginUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;