/* eslint-disable */
import { useCities } from '../Context/CitiesContext';
import styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import Flag from './Flag';
const formatDate = (date) =>
    new Intl.DateTimeFormat('en', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(date));

function CityItem({ city }) {

    const { currentCity, deleteCity } = useCities();
    const { cityName, date, id, position, emoji } = city;
    function handelDeleteCity(e) {
        e.preventDefault();
        deleteCity(id)
    }
    return (
        <li >
            <Link
                className={`${styles.cityItem}
             ${id === currentCity.id ? styles['cityItem--active'] : ''}`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
                <h3>
                    <Flag emoji={emoji} />
                </h3>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn} onClick={handelDeleteCity}>&times;</button>
            </Link>
        </li >
    );
}

export default CityItem;
