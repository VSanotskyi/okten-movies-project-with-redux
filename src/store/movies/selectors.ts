import {RootState} from '../../types';

const selectMovies = (state: RootState) => state.movies.movieItems;
const selectTotalPage = (state: RootState) => state.movies.total_page;
const selectError = (state: RootState) => state.movies.error;
const selectMovieDetails = (state: RootState) => state.movies.movieDetails;
const selectResPage = (state: RootState) => state.movies.togglePage;
const selectIsLoading = (state: RootState) => state.movies.isLoading;

export {
    selectMovies,
    selectError,
    selectTotalPage,
    selectMovieDetails,
    selectResPage,
    selectIsLoading,
};