import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

import App from './App';
import './index.css';
import {Provider} from 'react-redux';
import {store, persistor} from './store';
import {PersistGate} from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter basename={'okten-movies-project'}>
                <App/>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
);
