import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {DetailsItem, Error} from '../components';
import {useAppDispatch, useMovies} from '../hooks';
import {getMovieDetailsThunk} from '../store/movies';

export default function DetailsPages() {
    const {pathname} = useLocation();
    const dispatch = useAppDispatch();

    const movieDetails = useMovies().details;
    const error = useMovies().error;

    const movieId = pathname.split('/')[pathname.split('/').length - 1];

    useEffect(() => {
        window.scrollTo(0, 0);

        dispatch(getMovieDetailsThunk({movieId}));
    }, [movieId, dispatch]);

    return (
        <div>
            {movieDetails && <DetailsItem item={movieDetails}/>}
            {
                error && <Error message={typeof error === 'string' ? error : ''}/>
            }
        </div>
    );
};