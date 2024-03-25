import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {Button} from '@mui/material';

import {IGenre} from '../../interfaces';
import {togglePage} from '../../store/movies';
import {useAppDispatch} from '../../hooks';

interface IProps {
    genre: IGenre;
}

const GenreItem: FC<IProps> = ({genre}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = (name: string, id: number) => {
        dispatch(togglePage(true));
        navigate(`genre/${name.toLowerCase()}/${id}`);
    };

    return (
        <li>
            <Button onClick={() => handleClick(genre.name, genre.id)}>{genre?.name}</Button>
        </li>
    );
};

export {GenreItem};
