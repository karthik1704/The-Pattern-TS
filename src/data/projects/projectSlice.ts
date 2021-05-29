import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProjectState {
    name: string;
}

const initialState: ProjectState[] = [];

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProjects: (state, action: PayloadAction<[]>) => {
            state = action.payload;
        },
    },
});

export const { addProjects } = projectSlice.actions;

export default projectSlice.reducer;
