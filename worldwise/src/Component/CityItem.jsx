/* eslint-disable */
import styles from './CityItem.module.css';

const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));

function CityItem({ city }) {

    return (
        <li className={styles.cityItem}>

            <h3 className={styles.name}>{city.cityName}</h3>
            <time className={styles.date}>{formatDate(city.date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    );
}

export default CityItem;
