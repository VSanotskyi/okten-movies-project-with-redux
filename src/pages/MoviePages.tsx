import {ChangeEvent, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import {getAllMoviesThunk} from '../store/movies';
import {useAppDispatch, useMovies} from '../hooks';
import {List, MovieItem, PaginationContainer, Error} from '../components';

export default function MoviePages() {
    const dispatch = useAppDispatch();
    const movies = useMovies().items;
    const totalPage = useMovies().totalPage;
    const error = useMovies().error;

    const [paramsPage, setParamsPage] = useSearchParams({page: '1'});
    const [page, setPage] = useState(+(paramsPage.get('page')));

    const handleChange = (_: ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setParamsPage({page: page.toString()});

        dispatch(getAllMoviesThunk({page}));
    }, [dispatch, page, setParamsPage]);

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




