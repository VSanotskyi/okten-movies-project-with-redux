import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import {useTheme} from '../../hooks';
import css from './Loading.module.css';

const Loading = () => {
    const theme = useTheme().theme;
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
