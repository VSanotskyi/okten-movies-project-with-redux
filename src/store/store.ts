import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE, REGISTER,
    REHYDRATE,
} from 'redux-persist/es/constants';

import {moviesReducer} from './movies';
import {genresReducer} from './genres';
import {themeReducer} from './theme';

const persistConfig = {
    key: 'theme',
    storage,
};

const persistedReducer = persistReducer(persistConfig, themeReducer);

const store = configureStore({
    reducer: {
        movies: moviesReducer,
        genres: genresReducer,
        theme: persistedReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export {
    store,
    persistor,
};