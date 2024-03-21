import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {api} from '../../services';
import {IDetails, IGenres, IMoviesRes} from '../../interfaces';

const getAllMoviesThunk = createAsyncThunk<IMoviesRes, { page: number }>(
    'moviesSlice/getMovies',
    async ({page}, {rejectWithValue}) => {
        try {
            return await api.getAllMovies(page);
        } catch (error) {
            const e = error as AxiosError;
            return rejectWithValue(e.message);
        }
    },
);

const getAllGenresThunk = createAsyncThunk<IGenres, void>(
    'moviesSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            return await api.getAllGenres();
        } catch (error) {
            const e = error as AxiosError;
            return rejectWithValue(e.message);
        }
    },
);

const getMoviesByGenreThunk = createAsyncThunk<IMoviesRes, { genreId: string, page: number }>(
    'moviesSlice/getByGenre',
    async ({genreId, page}, {rejectWithValue}) => {
        try {
            return await api.getByGenre(genreId, page);
        } catch (error) {
            const e = error as AxiosError;
            return rejectWithValue(e.message);
        }
    },
);

const getMoviesBySearchThunk = createAsyncThunk<IMoviesRes, { search: string, page: number }>(
    'moviesSlice/getBySearch',
    async ({search, page}, {rejectWithValue}) => {
        try {
            return await api.getMoviesBySearch(search, page);
        } catch (error) {
            const e = error as AxiosError;
            return rejectWithValue(e.message);
        }
    },
);

const getMovieDetailsThunk = createAsyncThunk<IDetails, { movieId: string }>(
    'moviesSlice/getMovieDetail',
    async ({movieId}, {rejectWithValue}) => {
        try {
            return await api.getMovieDetails(movieId);
        } catch (error) {
            const e = error as AxiosError;
            return rejectWithValue(e.message);
        }
    },
);

export {
    getAllGenresThunk,
    getAllMoviesThunk,
    getMoviesByGenreThunk,
    getMoviesBySearchThunk,
    getMovieDetailsThunk,
};