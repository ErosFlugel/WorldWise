//Tools
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Contexts
import { CitiesProvider } from './contexts/CitiesContexts';
import { AuthProvider } from './contexts/FakeAuthContext';

//Components
import HomePage from './pages/HomePage';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';
import PageNotFound from './pages/PageNotFound';
import CityList from './components/CityList';
import CountryList from './components/CountryList';
import City from './components/City';
import Form from './components/Form';
import ProtectedRoute from './pages/ProtectedRoute';

//Current Component
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        {/* Here we define the possible routes for the SPA and later on within the <Link /> elements we can move to the defined routes */}
        <BrowserRouter>
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
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
