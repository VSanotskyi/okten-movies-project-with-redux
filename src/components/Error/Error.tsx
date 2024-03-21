import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Typography, Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import css from './Error.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';

// import {selectResPage, togglePage} from '../../store/movies';

interface IProps {
    message: string;
}

const Error: FC<IProps> = ({message}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        // dispatch(resPage(true));
        navigate('/');
    };

    return (
        <Box className={css.box}>
            <Typography variant="h6"
                        gutterBottom
            >

                {message}
            </Typography>
            <Button variant="contained"
                    endIcon={<HomeIcon/>}
                    onClick={handleClick}
            >
                Go home
            </Button>
        </Box>
    );
};

export {Error};
