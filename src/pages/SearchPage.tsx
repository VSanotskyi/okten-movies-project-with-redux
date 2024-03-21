import {ChangeEvent, useEffect, useState} from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';

import {useAppDispatch, useAppSelector} from '../hooks';
import {
    getMoviesBySearchThunk,
    selectMovies,
    selectResPage,
    selectTotalPage, togglePage,
} from '../store/movies';
import {List, MovieItem, PaginationContainer} from '../components';

export default function SearchPage() {
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

    const movies = useAppSelector(selectMovies);
    const totalPage = useAppSelector(selectTotalPage);
    const resPage = useAppSelector(selectResPage);

    const [paramsPage, setParamsPage] = useSearchParams({page: '1'});
    const [page, setPage] = useState(+(paramsPage.get('page')));

    const handleChange = (_: ChangeEvent<unknown>, value: number) => {
        dispatch(togglePage(false));
        setPage(value);
    };

    const search = pathname.split('/')[pathname.split('/').length - 1];

    useEffect(() => {
        resPage && setPage(1);
    }, [resPage]);

    useEffect(() => {
        setParamsPage({page: page.toString()});

        dispatch(getMoviesBySearchThunk({search, page}));
    }, [dispatch, search, setParamsPage, page]);

    return (
        <>
            {movies.length > 0 &&
                <List items={movies}
                      renderItem={(item) =>
                          <MovieItem key={item.id}
                                     item={item}
                          />}
                />
            }
            {totalPage &&
                <PaginationContainer
                    totalPage={totalPage}
                    page={page}
                    handleChange={handleChange}
                />
            }
        </>
    );
};