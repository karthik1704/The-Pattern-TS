import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface ThemeState {
    theme: 'dark' | 'light' | String ,
}

const initialState:ThemeState ={
    theme: 'light',
} 

export const themeSlice = createSlice({
    name: 'themes',
    initialState,
    reducers:{
        changeTheme: (state, action: PayloadAction<'dark' | 'light'| String>) => {
            state.theme = action.payload
        }
    }
})

export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;