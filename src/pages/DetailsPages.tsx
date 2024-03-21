import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import {DetailsItem, Loading} from '../components';
import {useAppDispatch, useAppSelector} from '../hooks';
import {getMovieDetailsThunk, selectIsLoading, selectMovieDetails} from '../store/movies';

export default function DetailsPages() {
    const dispatch = useAppDispatch();
    const movieDetails = useAppSelector(selectMovieDetails);
    const isLoading = useAppSelector(selectIsLoading);
    const {pathname} = useLocation();

    const movieId = pathname.split('/')[pathname.split('/').length - 1];

    useEffect(() => {
        window.scrollTo(0, 0);

        dispatch(getMovieDetailsThunk({movieId}));
    }, [movieId, dispatch]);

    console.log(movieDetails);

    return (
        <div>
            {isLoading && <Loading/>}
            {movieDetails && <DetailsItem item={movieDetails}/>}

        </div>
    );
};