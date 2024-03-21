import {createSlice} from '@reduxjs/toolkit';

import {IDetails, IGenre, IMovie} from '../../interfaces';
import {
    getAllGenresThunk,
    getAllMoviesThunk,
    getMovieDetailsThunk,
    getMoviesByGenreThunk,
    getMoviesBySearchThunk,
} from './operations';

interface IState {
    genreItems: IGenre[];
    movieItems: IMovie[];
    movieDetails: IDetails;
    total_page: number;
    isLoading: boolean;
    error: unknown;
    togglePage: boolean;
}

const initialState: IState = {
    genreItems: [],
    movieItems: [],
    movieDetails: null,
    total_page: null,
    togglePage: false,
    isLoading: false,
    error: null,
};

const handlePending = (state: IState) => {
    state.error = null;
    state.isLoading = true;
};

const moviesSlice = createSlice({
    name: 'moviesSlice',
    initialState,
    reducers: {
        togglePage: (state, action) => {
            state.togglePage = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            // Pending
            .addCase(getAllGenresThunk.pending, handlePending)
            .addCase(getAllMoviesThunk.pending, handlePending)
            .addCase(getMoviesByGenreThunk.pending, handlePending)
            .addCase(getMoviesBySearchThunk.pending, handlePending)
            .addCase(getMovieDetailsThunk.pending, handlePending)
            // Fulfilled
            .addCase(getAllMoviesThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.error = null;
                state.movieItems = payload.results;
                state.total_page = payload.total_pages;
            })
            .addCase(getMoviesByGenreThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.error = null;
                state.movieItems = payload.results;
                state.total_page = payload.total_pages;
            })
            .addCase(getMoviesBySearchThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.error = null;
                state.movieItems = payload.results;
                state.total_page = payload.total_pages;
            })
            .addCase(getMovieDetailsThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.error = null;
                state.movieDetails = payload;
            })
            .addCase(getAllGenresThunk.fulfilled, (state, {payload}) => {
                state.isLoading = false;
                state.error = null;
                state.genreItems = payload.genres;
            })
            // Rejected
            .addCase(getAllGenresThunk.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getAllMoviesThunk.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getMoviesByGenreThunk.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getMoviesBySearchThunk.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            })
            .addCase(getMovieDetailsThunk.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            });
    },
});

const moviesReducer = moviesSlice.reducer;
const {togglePage} = moviesSlice.actions;

export {
    moviesReducer,
    togglePage,
};