import {apiService} from './apiService';
import {IMoviesRes, IDetails, IGenres} from '../interfaces';
import {genres, movies, moviesByGenre, moviesBySearch, movieDetails} from '../constants';

const getAllMovies = async (page: number): Promise<IMoviesRes> => {
    const {data} = await apiService.get(movies + `?page=${page}`);
    return data;
};

const getAllGenres = async (): Promise<IGenres> => {
    const {data} = await apiService.get(genres);
    return data;
};

const getByGenre = async (id: string, page: number): Promise<IMoviesRes> => {
    const {data} = await apiService.get(`${moviesByGenre}${id}&page=${page}`);
    return data;
};

const getMoviesBySearch = async (search: string, page: number): Promise<IMoviesRes> => {
    const {data} = await apiService.get(`${moviesBySearch}${search}&page=${page}`);
    return data;
};

const getMovieDetails = async (id: string): Promise<IDetails> => {
    const {data} = await apiService.get(`${movieDetails}/${id}`);
    return data;
};

export const api = {
    getAllMovies,
    getByGenre,
    getAllGenres,
    getMoviesBySearch,
    getMovieDetails,
};
