import React, {ChangeEvent, FC} from 'react';
import {Link, useLocation} from 'react-router-dom';

import {Box, Stack, Pagination, PaginationItem} from '@mui/material';

import {togglePage} from '../../store/movies';
import {useAppDispatch, useMovies, useTheme} from '../../hooks';
import css from './PaginationContainer.module.css';

interface IProps {
    totalPage: number;
    page: number;
    setPage: (page: number) => void;
}

const PaginationContainer: FC<IProps> = ({totalPage, page, setPage}) => {
    const dispatch = useAppDispatch();
    const {pathname} = useLocation();

    const resPage = useMovies().resPage;

    const theme = useTheme().theme;
    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    const handleChange = (_: ChangeEvent<unknown>, value: number) => {
        if (resPage) {
            dispatch(togglePage(false));
        }
        setPage(value);
    };

    return (
        <Box className={css[currentTheme]}>
            <Stack spacing={2}>
                <Pagination
                    color={'primary'}
                    count={totalPage < 500 ? totalPage : 500}
                    page={page}
                    onChange={handleChange}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`${pathname}?page=${item.page}`}
                            {...item}
                        />
                    )}
                />
            </Stack>
        </Box>
    );
};

export {PaginationContainer};
