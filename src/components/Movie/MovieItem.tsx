import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Rating,
} from '@mui/material';

import {IMovie} from '../../interfaces';
import {defaultUrlImage} from '../../constants';
import {useAppDispatch, useSearchToggle, useTheme} from '../../hooks';
import {toggleShowSearch} from '../../store/search';

import defaultImage from '../../defaultImage/default-image.jpg';
import css from './MovieItem.module.css';

interface IProps {
    item: IMovie;
}

const MovieItem: FC<IProps> = ({item}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {title, poster_path, vote_average, id} = item;

    const urlImg = defaultUrlImage + poster_path;

    const checkUrl = urlImg.split('/').slice(-1).toString() === 'null';

    const showSearch = useSearchToggle().searchToggle;

    const handleClick = () => {
        showSearch && dispatch(toggleShowSearch());
        navigate(`/movies/details/${id}`);
    };

    const theme = useTheme().theme;
    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    return (
        <li>
            <Card sx={{width: 300, height: 400}}
                  onClick={handleClick}
            >
                <CardMedia
                    component="img"
                    alt={title}
                    height="300"
                    image={!checkUrl ? urlImg : defaultImage}
                />
                <CardContent className={css[currentTheme]}>
                    <Typography gutterBottom
                                variant="h6"
                                component="div"
                    >
                        <p className={css.overflowWrap}>{title}</p>
                    </Typography>
                    <Typography variant="body2"
                                color="text.secondary"
                    >
                        <Rating name="read-only"
                                value={vote_average / 2}
                                readOnly
                                precision={0.5}
                                size="small"
                        />
                    </Typography>
                </CardContent>
            </Card>
        </li>
    );
};

export {MovieItem};
