import {ChangeEvent, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Input,
    InputAdornment,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

import {IGenre} from '../../interfaces';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {List, GenreItem} from '../../components';
import {getAllGenresThunk, selectGenres, togglePage} from '../../store/movies';
import {selectTheme, toggleTheme} from '../../store/theme';
import css from './Header.module.css';

const Header = () => {
    const dispatch = useAppDispatch();
    const genres = useAppSelector(selectGenres);

    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState<string>('');
    const navigate = useNavigate();

    const theme = useAppSelector(selectTheme);
    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSubmit = () => {
        if (search.length < 1) return;
        dispatch(togglePage(true));
        navigate(`/search/${search}`);
        setShowSearch(prev => !prev);
        setSearch('');
    };

    const handleChangeTheme = () => {
        dispatch(toggleTheme());
    };

    const toggleSearch = () => {
        setShowSearch(prev => !prev);
    };

    useEffect(() => {
        dispatch(getAllGenresThunk());
    }, [dispatch]);

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6"
                                component="div"
                                sx={{flexGrow: 1}}
                    >
                        <Link className={css[currentTheme]}
                              to={'/'}
                        >Movies</Link>
                    </Typography>
                    {showSearch && <Typography variant="h6"
                                               component="div"
                                               sx={{flexGrow: 1}}
                    >
                        <Input
                            onChange={handleChange}
                            value={search}
                            id="input-with-icon-adornment"
                            autoFocus={true}
                        />
                        <Button onClick={handleSubmit}>
                            <InputAdornment position="start">
                                <SearchIcon className={css[currentTheme]}/>
                            </InputAdornment>
                        </Button>
                    </Typography>}
                    {!showSearch && <Button onClick={toggleSearch}>
                        <SearchIcon className={css[currentTheme]}/>
                    </Button>}
                    <Button onClick={handleChangeTheme}>
                            <span className={css[currentTheme]}>
                                {currentTheme}
                            </span>
                    </Button>
                    <AccountCircleIcon/>
                </Toolbar>
            </AppBar>

            {genres &&
                <Box>
                    <List items={genres}
                          renderItem={((item: IGenre) => <GenreItem key={item.id}
                                                                    genre={item}
                          />)}
                    />
                </Box>
            }
        </Box>
    );
};

export {Header};
