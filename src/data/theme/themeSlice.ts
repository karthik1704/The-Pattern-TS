import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TTheme = 'dark' | 'light';

interface ThemeState {
    theme: TTheme ;
}

const initialState:ThemeState ={
    theme: 'light' ,
} 

export const themeSlice = createSlice({
    name: 'themes',
    initialState,
    reducers:{
        changeTheme: (state:ThemeState, action: PayloadAction<TTheme>) => {
            state.theme = action.payload
        }
    }
})

export const {changeTheme} = themeSlice.actions;

export default themeSlice.reducer;