import {FC, PropsWithChildren} from 'react';

interface IProps extends PropsWithChildren {

}

const App: FC<IProps> = () => {
    return (
        <div>
            App
        </div>
    );
};

export {App};