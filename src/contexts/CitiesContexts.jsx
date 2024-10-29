//Tools
import { createContext, useEffect, useContext, useReducer, useCallback } from 'react';
import PropTypes from 'prop-types';

//Variables
const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };

    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };

    case 'city/created':
      //We should not do this, we later on fix this problem
      return { ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.slice().filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Action Type Unknown');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(reducer, initialState);

  //Fetch
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        // setIsLoading(true);

        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({ type: 'rejected', payload: 'There was an error loading cities...' });
        console.log(err.message);
      }
    }
    fetchCities();
  }, []);

  //As we use the getCity function in another place inside an useEffect and we have to add it to the dependency array it will be re-rendered each time the getCity function is re-created as a result of the function get city itself that updates the state in the context, it renders again all this component so it creates an infinite loop with that effect, therefore we make this function stable with the useCallback storing it in the cache so whenever it is re-rendered will not be re-created if the result is the same
  //Used by City APP to get the current marked city
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === Number(currentCity.id)) return;
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities?id=${id}`);
        const data = await res.json();
        dispatch({ type: 'city/loaded', payload: data[0] });
      } catch (err) {
        dispatch({ type: 'rejected', payload: 'There was an error loading city...' });
        console.log(err.message);
      }
    },
    [currentCity.id]
  );

  //Adding city data to the Fake-API
  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      dispatch({ type: 'city/created', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: 'There was an error creating city...' });
      console.log(err.message);
    }
  }

  //Deleting city data from the Fake-API
  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      dispatch({ type: 'city/deleted', payload: id });
    } catch (err) {
      dispatch({ type: 'rejected', payload: 'There was an error deleting city...' });
      console.log(err.message);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, error, currentCity, getCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

//Proptypes validation
CitiesProvider.propTypes = {
  children: PropTypes.node,
};

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
