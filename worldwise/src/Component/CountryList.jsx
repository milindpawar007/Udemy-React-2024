

import styles from './CountryList.module.css'
import Spinner from './Spinner'

import Message from './Message'
import CountryItem from './CountryItem'

import { useCities } from '../Context/CitiesContext'


function CountryList() {
    const { cities, isloading } = useCities();
    console.log(cities, isloading);
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



export default CountryList;
