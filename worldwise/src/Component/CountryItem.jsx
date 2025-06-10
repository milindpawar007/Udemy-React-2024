import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";
import Flag from './Flag';
function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>

      <h3><Flag emoji={country.emoji} />{'     '}{country.country}</h3>
    </li>
  );
}

CountryItem.propTypes = {
  country: PropTypes.shape({
    country: PropTypes.string.isRequired,
    // emoji: PropTypes.string, // Uncomment if you use emoji
  }).isRequired,
};

export default CountryItem;
