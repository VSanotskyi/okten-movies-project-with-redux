import {FC} from 'react';

import {
    CardMedia,
    CardContent,
    Typography,
    Card,
    Rating,
} from '@mui/material';

import {useTheme} from '../../hooks';
import {IDetails, IGenre} from '../../interfaces';
import {List, GenreItem} from '../../components';
import {defaultUrlImage} from '../../constants';
import defaultImage from '../../defaultImage/default-image.jpg';
import css from './DetailsItem.module.css';

interface IProps {
    item: IDetails;
}

const DetailsItem: FC<IProps> = ({item}) => {
    const urlImg = defaultUrlImage + item?.poster_path;
    const checkUrl = urlImg.split('/').slice(-1).toString() === 'null';

    const theme = useTheme().theme;
    const currentTheme = theme ? 'dark-theme' : 'light-theme';

    return (
        <div className={css.wrapper}>
            <Card sx={{width: 500, height: 'auto'}}>
                <div className={css.badgeContainer}>
                    <CardMedia
                        component="img"
                        alt={item?.title}
                        // height="500"
                        image={!checkUrl ? urlImg : defaultImage}
                    />
                    <div className={css.badgeWrapper}>
                        {item?.genres && <List items={item?.genres}
                                               renderItem={(item: IGenre) =>
                                                   <div className={css.badgeItem}
                                                        key={item.id}
                                                   >
                                                       <GenreItem
                                                           genre={item}
                                                       />
                                                   </div>}
                        />}
                    </div>
                </div>
                <CardContent className={css[currentTheme]}>
                    <Typography variant="body2"
                                color="inherit"
                    >
                        <Rating name="read-only"
                                value={item?.vote_average ? item?.vote_average / 2 : 0}
                                readOnly
                                precision={0.5}
                                size="small"
                        />
                    </Typography>
                    <Typography gutterBottom
                                variant="h6"
                                component="div"
                    >
                        <p>{item?.title}</p>
                    </Typography>
                    <Typography gutterBottom
                                variant="h6"
                                component="div"
                    >
                        <p>{item?.release_date}</p>
                    </Typography>
                    <Typography gutterBottom
                                variant="h6"
                                component="div"
                    >
                        <p>{item?.overview}</p>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export {DetailsItem};
