import {ChangeEvent, useEffect, useState, KeyboardEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Paper,
    IconButton, InputBase,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

import {IGenre} from '../../interfaces';
import {useAppDispatch, useGenres, useSearchToggle, useTheme} from '../../hooks';
import {List, GenreItem} from '../../components';
import {togglePage} from '../../store/movies';
import {toggleTheme} from '../../store/theme';
import {getAllGenresThunk} from '../../store/genres';
import {toggleShowSearch} from '../../store/search';
import css from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const genres = useGenres().items;

    const showSearch = useSearchToggle().searchToggle;
    const [search, setSearch] = useState<string>('');

    const theme = useTheme().theme;
    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSubmit = () => {
        if (search.length < 1) return;
        dispatch(togglePage(true));
        navigate(`search/${search}`);
        setSearch('');
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
        }
    };

    const toggleSearch = () => {
        dispatch(toggleShowSearch());
    };

    const handleClickHome = () => {
        showSearch && dispatch(toggleShowSearch());
    };

    const handleChangeTheme = () => {
        dispatch(toggleTheme());
    };

    useEffect(() => {
        dispatch(getAllGenresThunk());
    }, [dispatch]);

    return (
        <Box>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6"
                                component="div"
                                sx={{flexGrow: 1}}
                    >
                        <Link className={css[currentTheme]}
                              to={'/'}
                              onClick={handleClickHome}
                        >Movies</Link>
                    </Typography>
                    <Button onClick={toggleSearch}>
                        <SearchIcon className={css[currentTheme]}/>
                    </Button>
                    <Button onClick={handleChangeTheme}>
                            <span className={css[currentTheme]}>
                                {currentTheme}
                            </span>
                    </Button>
                    <AccountCircleIcon/>
                </Toolbar>
            </AppBar>
            {genres.length > 0 &&
                <Box>
                    <List items={genres}
                          renderItem={((item: IGenre) => <GenreItem key={item.id}
                                                                    genre={item}
                          />)}
                    />
                </Box>
            }
            {showSearch &&
                <Box className={css.searchBox}>
                    <Paper
                        component="form"
                        sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 300}}
                    >
                        <InputBase
                            sx={{ml: 1, flex: 1, color: 'success'}}
                            placeholder="Search Movies"
                            autoFocus={true}
                            onChange={handleChange}
                            value={search}
                            onKeyDown={handleKeyDown}
                        />
                        <IconButton type="button"
                                    sx={{p: '10px'}}
                                    aria-label="search"
                                    onClick={handleSubmit}
                        >
                            <SearchIcon/>
                        </IconButton>
                    </Paper>
                </Box>}
        </Box>
    );
};

export {Header};