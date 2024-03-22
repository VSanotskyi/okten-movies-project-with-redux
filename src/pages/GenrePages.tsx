import {ChangeEvent, useEffect, useState} from 'react';
import {useLocation, useSearchParams} from 'react-router-dom';

import {Error, List, MovieItem, PaginationContainer} from '../components';
import {useAppDispatch, useMovies} from '../hooks';
import {
    getMoviesByGenreThunk,
    togglePage,
} from '../store/movies';

export default function GenrePages() {
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

    const movies = useMovies().items;
    const totalPage = useMovies().totalPage;
    const resPage = useMovies().resPage;
    const error = useMovies().error;

    const [paramsPage, setParamsPage] = useSearchParams({page: '1'});
    const [page, setPage] = useState(+(paramsPage.get('page')));

    const handleChange = (_: ChangeEvent<unknown>, value: number) => {
        dispatch(togglePage(false));
        setPage(value);
    };

    const genreId = pathname.split('/')[pathname.split('/').length - 1];

    useEffect(() => {
        resPage && setPage(1);
    }, [resPage]);

    useEffect(() => {
        setParamsPage({page: page.toString()});

        dispatch(getMoviesByGenreThunk({genreId, page}));
    }, [dispatch, genreId, setParamsPage, page]);

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
            {
                error && <Error message={typeof error === 'string' ? error : ''}/>
            }
        </>
    );
};
