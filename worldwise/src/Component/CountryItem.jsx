import styles from "./CountryItem.module.css";

import Flag from './Flag';
function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>

      <h3><Flag emoji={country.emoji} />{'     '}{country.country.split('(')[0].trim()}</h3>
    </li>
  );
}



export default CountryItem;
