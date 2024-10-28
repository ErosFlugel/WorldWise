//Tools
import PropTypes from 'prop-types';

//Components
import CityItem from './CityItem';
import Message from './Message';
import Spinner from './Spinner';

//Contexts
import { useCities } from '../contexts/CitiesContexts';

//Styles
import styles from './CityList.module.css';

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length) return <Message message={'Add your first city by clicking on a city on the map'} />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem
          city={city}
          key={city.id}
        />
      ))}
    </ul>
  );
}

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default CityList;
