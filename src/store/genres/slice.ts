import {createSlice} from '@reduxjs/toolkit';

import {IGenre} from '../../interfaces';
import {getAllGenresThunk} from './operations';

interface IState {
    genreItems: IGenre[];
    isLoading: boolean;
    error: unknown,
}

const initialState: IState = {
    genreItems: [],
    isLoading: false,
    error: null,
};

const genresSlice = createSlice({
    name: 'genresSlice',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllGenresThunk.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(getAllGenresThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.error = null;
                state.genreItems = payload.genres;
            })
            .addCase(getAllGenresThunk.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

export const genresReducer = genresSlice.reducer;