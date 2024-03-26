import {FC} from 'react';
import {useNavigate} from 'react-router-dom';

import {Box, Typography, Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

import css from './Error.module.css';
import {useAppDispatch, useSearchToggle} from '../../hooks';
import {toggleShowSearch} from '../../store/search';

interface IProps {
    message: string;
}

const Error: FC<IProps> = ({message}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const searchToggle = useSearchToggle().searchToggle;

    const handleClick = () => {
        searchToggle && dispatch(toggleShowSearch());
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
