import {useAppSelector} from './useStore';
import {selectIsShowSearch} from '../store/search';

export const useSearchToggle = () => {
    return {
        searchToggle: useAppSelector(selectIsShowSearch),
    };
};