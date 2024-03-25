import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';

import {getAllMoviesThunk} from '../store/movies';
import {useAppDispatch, useMovies} from '../hooks';
import {List, MovieItem, Error, PaginationContainer} from '../components';

export default function MoviePages() {
    const {search: localPage} = useLocation();
    const dispatch = useAppDispatch();

    const movies = useMovies().items;
    const totalPage = useMovies().totalPage;
    const error = useMovies().error;

    const [page, setPage] = useState(parseInt(localPage.split('=')[1]) || 1);

    useEffect(() => {
        dispatch(getAllMoviesThunk({page}));
    }, [dispatch, page]);

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
                    setPage={setPage}
                />
            }
            {
                error && <Error message={typeof error === 'string' ? error : ''}/>
            }
        </>
    );
};

