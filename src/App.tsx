import {Suspense, lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';

import {Loading} from './components';

const Layout = lazy(() => import('./layout/MainLayout'));
const MoviePages = lazy(() => import('./pages/MoviePages'));
const GenrePages = lazy(() => import('./pages/GenrePages'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const DetailsPages = lazy(() => import('./pages/DetailsPages'));
const ErrorPages = lazy(() => import('./pages/ErrorPages'));

const App = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path={'/'}
                       element={<Navigate to={'/movies'}/>}
                />
                <Route
                    path="/movies"
                    element={<Layout/>}
                >
                    <Route
                        index
                        element={<MoviePages/>}
                    />
                    <Route path={'genre/:name/:id'}
                           element={<GenrePages/>}
                    />
                    <Route path={'search/:searchName'}
                           element={<SearchPage/>}
                    />
                    <Route path={'details/:id'}
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
