import React, {ChangeEvent, FC} from 'react';

import {Box, Stack, Pagination, PaginationItem} from '@mui/material';

import {useTheme} from '../../hooks';
import css from './PaginationContainer.module.css';

interface IProps {
    totalPage: number;
    page: number;
    handleChange: (event: ChangeEvent<unknown>, value: number) => void;
}

const PaginationContainer: FC<IProps> = ({totalPage, page, handleChange}) => {
    const theme = useTheme();
    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    return (
        <Box className={css[currentTheme]}>
            <Stack spacing={2}>
                <Pagination color="primary"
                            count={totalPage < 500 ? totalPage : 500}
                            page={page}
                            onChange={handleChange}
                            renderItem={(item) => (
                                <PaginationItem
                                    {...item}
                                />
                            )}
                />
            </Stack>
        </Box>
    );
};

export {PaginationContainer};
