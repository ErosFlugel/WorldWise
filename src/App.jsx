//Tools
import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Contexts
import { CitiesProvider } from './contexts/CitiesContexts';
import { AuthProvider } from './contexts/FakeAuthContext';

//Manual Middleware
import ProtectedRoute from './pages/ProtectedRoute';

//Components
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import SpinnerFullPage from './components/SpinnerFullPage';

// import HomePage from './pages/HomePage';
// import Pricing from './pages/Pricing';
// import Product from './pages/Product';
// import Login from './pages/Login';
// import AppLayout from './pages/AppLayout';
// import PageNotFound from './pages/PageNotFound';

//Components splited for bundling (to lazy load each page for better performance)
//In this case using the lazy function will suspend the components automatically
const HomePage = lazy(() => import('./pages/HomePage'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Product = lazy(() => import('./pages/Product'));
const Login = lazy(() => import('./pages/Login'));
const AppLayout = lazy(() => import('./pages/AppLayout'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));

//Current Component
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        {/* Here we define the possible routes for the SPA and later on within the <Link /> elements we can move to the defined routes */}
        <BrowserRouter>
          {/* Suspense component from react is used to return the fallback while the other pages are suspended */}
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              {/* We can use either index property or path='/' */}
              <Route
                index
                element={<HomePage />}
              />
              <Route
                path='pricing'
                element={<Pricing />}
              />
              <Route
                path='product'
                element={<Product />}
              />
              <Route
                path='login'
                element={<Login />}
              />

              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* this one wll have the default behavior of the normal /app route that doesn't match any of the other routes*/}
                {/* Add a replace keyword in order to make that Navigate redirecting work getting backwards elsewhere it will not handle the same browser history*/}
                <Route
                  index
                  element={
                    <Navigate
                      to='cities'
                      replace
                    />
                  }
                />

                {/* Nested routes of /app route*/}
                <Route
                  path='cities'
                  element={<CityList />}
                />
                <Route
                  path='cities/:id'
                  element={<City />}
                />
                <Route
                  path='countries'
                  element={<CountryList />}
                />
                <Route
                  path='form'
                  element={<Form />}
                />
              </Route>
              <Route
                path='*'
                element={<PageNotFound />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
