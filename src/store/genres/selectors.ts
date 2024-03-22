import {RootState} from '../../types';

const selectGenres = (state: RootState) => state.genres.genreItems;

export {selectGenres};