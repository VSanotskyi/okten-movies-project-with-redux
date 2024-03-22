import {Suspense, lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {Loading} from './components';

const Layout = lazy(() => import('./layout/Layout'));
const MoviePages = lazy(() => import('./pages/MoviePages'));
const GenrePages = lazy(() => import('./pages/GenrePages'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const DetailsPages = lazy(() => import('./pages/DetailsPages'));
const ErrorPages = lazy(() => import('./pages/ErrorPages'));

const App = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route
                    path="/"
                    element={<Layout/>}
                >
                    <Route index
                           element={<Navigate to={'/movies'}/>}
                    />
                    <Route
                        path={'/movies'}
                        element={<MoviePages/>}
                    />
                    <Route path={'/movies/genre/:name/:id'}
                           element={<GenrePages/>}
                    />
                    <Route path={'/movies/search/:searchName'}
                           element={<SearchPage/>}
                    />
                    <Route path={'/movies/details/:id'}
                           element={<DetailsPages/>}
                    />
                </Route>
                <Route path={'*'}
                       element={<ErrorPages/>}
                />
            </Routes>
        </Suspense>
    );
};

export default App;
