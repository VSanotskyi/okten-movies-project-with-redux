import {ChangeEvent, useEffect, useState} from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';

import {useAppDispatch, useMovies} from '../hooks';
import {
    getMoviesBySearchThunk, togglePage,
} from '../store/movies';
import {Error, List, MovieItem, PaginationContainer} from '../components';

export default function SearchPage() {
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

    const movies = useMovies().items;
    const totalPage = useMovies().totalPage;
    const resPage = useMovies().resPage;
    const error = useMovies().error;
    const isLoading = useMovies().isLoading;

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
            {totalPage > 1 &&
                <PaginationContainer
                    totalPage={totalPage}
                    page={page}
                    handleChange={handleChange}
                />
            }
            {
                movies.length < 1 && !error && !isLoading &&
                <Error message={`"${search}" not found`}/>
            }
            {
                error && <Error message={typeof error === 'string' ? error : ''}/>
            }
        </>
    );
};