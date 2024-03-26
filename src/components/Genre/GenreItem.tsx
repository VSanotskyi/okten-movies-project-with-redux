import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {Button} from '@mui/material';

import {IGenre} from '../../interfaces';
import {togglePage} from '../../store/movies';
import {useAppDispatch, useSearchToggle} from '../../hooks';
import {toggleShowSearch} from '../../store/search';

interface IProps {
    genre: IGenre;
}

const GenreItem: FC<IProps> = ({genre}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const showSearch = useSearchToggle().searchToggle;

    const handleClick = (name: string, id: number) => {
        dispatch(togglePage(true));
        showSearch && dispatch(toggleShowSearch());
        navigate(`/movies/genre/${name.toLowerCase()}/${id}`);
    };

    return (
        <li>
            <Button onClick={() => handleClick(genre.name, genre.id)}>{genre?.name}</Button>
        </li>
    );
};

export {GenreItem};
