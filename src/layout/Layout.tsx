import {Outlet} from 'react-router-dom';

import {Header} from '../components';
import {useTheme} from '../hooks';

import css from './theme.module.css';

export default function Layout() {
    const theme = useTheme().theme;
    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    return (
        <div className={css[currentTheme]}>
            <Header/>
            <Outlet/>
        </div>
    );
};

