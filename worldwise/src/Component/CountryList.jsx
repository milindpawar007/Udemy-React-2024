

import styles from './CountryList.module.css'
import Spinner from './Spinner'

import Message from './Message'
import CountryItem from './CountryItem'
import PropTypes from 'prop-types';
import { useCities } from '../Context/CitiesContext'


function CountryList() {
    const { cities, isloading } = useCities();

    if (isloading) return <Spinner />
    if (!cities.length) return <Message message={'Add your City by Clicking on City on the Map'} />
    const countries = Array.from(
        new Map(cities.map(city => [city.country, { country: city.country, emoji: city.emoji }])).values()
    );

    return (
        <ul className={styles.countryList}>
            {
                countries.map(country => <CountryItem country={country} key={country.country} />)
            }
        </ul>
    )
}

CountryList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            country: PropTypes.string.isRequired,
            emoji: PropTypes.string,
        })
    ).isRequired,
    isloading: PropTypes.bool.isRequired,
};

export default CountryList;
