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
import defaultImage from '../../defaultImage/default-image.jpg';
import {defaultUrlImage} from '../../constants';
import css from './MovieItem.module.css';

interface IProps {
    item: IMovie;
}

const MovieItem: FC<IProps> = ({item}) => {
    const navigate = useNavigate();

    const {title, poster_path, vote_average, id} = item;

    const urlImg = defaultUrlImage + poster_path;

    const checkUrl = urlImg.split('/').slice(-1).toString() === 'null';

    const handleClick = () => {
        navigate(`/movies/details/${id}`);
    };

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
                <CardContent>
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
