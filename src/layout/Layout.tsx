import {Outlet} from 'react-router-dom';

import {Header} from '../components';
import {useAppSelector} from '../hooks';
import {selectTheme} from '../store/theme';
import css from './theme.module.css';

export default function Layout() {
    const theme = useAppSelector(selectTheme);

    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    return (
        <div className={css[currentTheme]}>
            <Header/>
            <Outlet/>
        </div>
    );
};

