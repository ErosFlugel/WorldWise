//Tools
import PropTypes from 'prop-types';

//Components
import CountryItem from './CountryItem';
import Message from './Message';
import Spinner from './Spinner';

//Contexts
import { useCities } from '../contexts/CitiesContexts';

//Styles
import styles from './CountryList.module.css';

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  //Getting unique countries to display
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, city];
    } else return arr;
  }, []);

  if (!countries.length) return <Message message={'Add your first city by clicking on a city on the map'} />;

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem
          country={country}
          key={country.id + 'ee'}
        />
      ))}
    </ul>
  );
}

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CountryList;
