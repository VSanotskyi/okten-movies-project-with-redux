import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {useAppDispatch, useMovies} from '../hooks';
import {
    getMoviesBySearchThunk,
} from '../store/movies';
import {Error, List, MovieItem, PaginationContainer} from '../components';

export default function SearchPage() {
    const {pathname, search: localPage} = useLocation();
    const dispatch = useAppDispatch();

    const movies = useMovies().items;
    const totalPage = useMovies().totalPage;
    const resPage = useMovies().resPage;
    const error = useMovies().error;
    const isLoading = useMovies().isLoading;

    const [page, setPage] = useState(parseInt(localPage.split('=')[1]) || 1);
    const currentPage = resPage ? 1 : page;

    const search = pathname.split('/')[pathname.split('/').length - 1];

    useEffect(() => {
        dispatch(getMoviesBySearchThunk({search, page: currentPage}));
    }, [dispatch, search, currentPage]);

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
                    page={currentPage}
                    setPage={setPage}
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