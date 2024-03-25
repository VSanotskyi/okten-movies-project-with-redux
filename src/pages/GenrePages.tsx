import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {Error, List, MovieItem, PaginationContainer} from '../components';
import {useAppDispatch, useMovies} from '../hooks';
import {
    getMoviesByGenreThunk,
} from '../store/movies';

export default function GenrePages() {
    const {pathname, search: localPage} = useLocation();
    const dispatch = useAppDispatch();

    const movies = useMovies().items;
    const totalPage = useMovies().totalPage;
    const resPage = useMovies().resPage;
    const error = useMovies().error;

    const [page, setPage] = useState(parseInt(localPage.split('=')[1]) || 1);
    const currentPage = resPage ? 1 : page;

    const genreId = pathname.split('/')[pathname.split('/').length - 1];

    useEffect(() => {
        dispatch(getMoviesByGenreThunk({genreId, page: currentPage}));
    }, [dispatch, genreId, currentPage]);

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
                    page={currentPage}
                    setPage={setPage}
                />
            }
            {
                error && <Error message={typeof error === 'string' ? error : ''}/>
            }
        </>
    );
};
