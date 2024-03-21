import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    darkMode: false,
};

const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
});

export const themeReducer = themeSlice.reducer;
export const {toggleTheme} = themeSlice.actions;