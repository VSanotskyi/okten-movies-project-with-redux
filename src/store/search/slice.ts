import {createSlice} from '@reduxjs/toolkit';

interface IState {
    isShowSearch: boolean;
}

const initialState: IState = {
    isShowSearch: false,
};

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        toggleShowSearch: (state) => {
            state.isShowSearch = !state.isShowSearch;
        },
    },
});

export const {reducer: searchReducer, actions: {toggleShowSearch}} = searchSlice;
