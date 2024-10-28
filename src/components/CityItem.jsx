//Tools
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//Styles
import styles from './CityItem.module.css';

//Modules
import flagEmojiToPNG from '../Modules/flagEmojiToPNG';
import { useCities } from '../contexts/CitiesContexts';

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));

function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;

  const { currentCity, deleteCity } = useCities();

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        //If we set the path with a starting / then we would have to write the entire route whereas if we set the path some value without a / upfront it will just add the current value into the current url
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${id === currentCity.id && styles['cityItem--active']}`}
      >
        <span className={styles.emoji}>{flagEmojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => handleDelete(e)}
        >
          &times;
        </button>
      </Link>
    </li>
  );
}

CityItem.propTypes = {
  city: PropTypes.object,
};

export default CityItem;
