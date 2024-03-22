import {useAppSelector} from './useStore';
import {
    selectError, selectIsLoading,
    selectMovieDetails,
    selectMovies,
    selectResPage,
    selectTotalPage,
} from '../store/movies';

export const useMovies = () => {
    return {
        items: useAppSelector(selectMovies),
        totalPage: useAppSelector(selectTotalPage),
        details: useAppSelector(selectMovieDetails),
        resPage: useAppSelector(selectResPage),
        error: useAppSelector(selectError),
        isLoading: useAppSelector(selectIsLoading),
    };
};