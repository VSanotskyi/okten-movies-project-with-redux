import {RootState} from '../../types';

const selectTheme = (state: RootState) => state.theme.darkMode;

export {
    selectTheme,
};