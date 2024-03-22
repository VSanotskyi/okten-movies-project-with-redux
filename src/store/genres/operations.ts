import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError} from 'axios';

import {IGenres} from '../../interfaces';
import {api} from '../../services';

const getAllGenresThunk = createAsyncThunk<IGenres, void>(
    'genresSlice/getGenres',
    async (_, {rejectWithValue}) => {
        try {
            return await api.getAllGenres();
        } catch (error) {
            const e = error as AxiosError;
            return rejectWithValue(e.message);
        }
    },
);

export {
    getAllGenresThunk,
};