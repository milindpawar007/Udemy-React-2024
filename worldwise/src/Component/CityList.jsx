/* eslint-disable */
import styles from './CityList.module.css'
import Spinner from './Spinner'
import CityItem from './CityItem'
import Message from './Message'
import { useCities } from '../Context/CitiesContext'


function CityList() {
    const { cities, isloading } = useCities();
    if (isloading) return <Spinner />
    if (!cities.length) return <Message message={'Add your City by Clicking on City on the Map'} />
    return (
        <ul className={styles.cityList}>
            {
                cities.map(city => <CityItem city={city} key={city.id} />)
            }
        </ul>
    )
}



export default CityList;


