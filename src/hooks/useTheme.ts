import {useAppSelector} from './useStore';
import {selectTheme} from '../store/theme';

export const useTheme = () => {
    return {
        theme: useAppSelector(selectTheme),
    };
};