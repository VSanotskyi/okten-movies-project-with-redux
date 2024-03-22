import {selectGenres} from '../store/genres';
import {useAppSelector} from './useStore';

export const useGenres = () => {
    return {
        items: useAppSelector(selectGenres),
    };
};