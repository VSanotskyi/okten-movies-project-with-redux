import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IDetails, IMovie, IMoviesRes} from '../../interfaces';
import {
    getAllMoviesThunk,
    getMovieDetailsThunk,
    getMoviesByGenreThunk,
    getMoviesBySearchThunk,
} from './operations';

interface IState {
    movieItems: IMovie[];
    movieDetails: IDetails;
    total_page: number;
    isLoading: boolean;
    error: unknown;
    togglePage: boolean;
}

const initialState: IState = {
    movieItems: [],
    movieDetails: null,
    total_page: null,
    togglePage: false,
    isLoading: false,
    error: null,
};

// movies - pending fulfilled
const handlePendingMovies = (state: IState) => {
    state.error = null;
    state.isLoading = true;
    state.movieItems = [];
    state.togglePage = null;
};

const handleFulfilledMovies = (state: IState, action: PayloadAction<IMoviesRes>) => {
    state.isLoading = false;
    state.error = null;
    state.movieItems = action.payload.results;
    state.total_page = action.payload.total_pages;
};

// details - pending fulfilled
const handlePendingDetails = (state: IState) => {
    state.error = null;
    state.isLoading = true;
    state.movieDetails = null;
};

const handleFulfilledDetails = (state: IState, action: PayloadAction<IDetails>) => {
    state.isLoading = false;
    state.error = null;
    state.movieDetails = action.payload;
};

const handleRejected = (state: IState, action: PayloadAction<unknown>) => {
    state.isLoading = false;
    state.error = action.payload;
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
            .addCase(getAllMoviesThunk.pending, handlePendingMovies)
            .addCase(getMoviesByGenreThunk.pending, handlePendingMovies)
            .addCase(getMoviesBySearchThunk.pending, handlePendingMovies)
            .addCase(getMovieDetailsThunk.pending, handlePendingDetails)
            // Fulfilled
            .addCase(getAllMoviesThunk.fulfilled, handleFulfilledMovies)
            .addCase(getMoviesByGenreThunk.fulfilled, handleFulfilledMovies)
            .addCase(getMoviesBySearchThunk.fulfilled, handleFulfilledMovies)
            .addCase(getMovieDetailsThunk.fulfilled, handleFulfilledDetails)
            // Rejected
            .addCase(getAllMoviesThunk.rejected, handleRejected)
            .addCase(getMoviesByGenreThunk.rejected, handleRejected)
            .addCase(getMoviesBySearchThunk.rejected, handleRejected)
            .addCase(getMovieDetailsThunk.rejected, handleRejected);
    },
});

const moviesReducer = moviesSlice.reducer;
const {togglePage} = moviesSlice.actions;

export {
    moviesReducer,
    togglePage,
};