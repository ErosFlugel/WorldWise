//Tools
import PropTypes from 'prop-types';

//Styles
import styles from './CountryItem.module.css';

//Modules
import flagEmojiToPNG from '../Modules/flagEmojiToPNG';

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{flagEmojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

CountryItem.propTypes = {
  country: PropTypes.object,
};

export default CountryItem;
