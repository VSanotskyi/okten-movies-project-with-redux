import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import {useAppSelector} from '../../hooks';
import {selectTheme} from '../../store/theme';
import css from './Loading.module.css';

const Loading = () => {
    const theme = useAppSelector(selectTheme);
    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    return (
        <Box className={`${css.box} ${css[currentTheme]}`}>
            <CircularProgress size={60}
                              color={'inherit'}
            />
        </Box>
    );
};

export {Loading};
