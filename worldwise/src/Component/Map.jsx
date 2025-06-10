import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from "react";
import { useCities } from "../Context/CitiesContext";
import Flag from './Flag';
function Map() {
    const navigate = useNavigate();
    const { cities } = useCities();
    const [mapPosition] = useState([52.53586782505711, 13.376933665713324])
    //  const [serchParam, setSerchParam] = useSearchParams();
    //  const lat = serchParam.get("lat")

    return (
        <div className={styles.mapContainer} onClick={() => { navigate("form") }}>
            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {
                    cities.map((city) => (
                        <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                            <Popup>
                                <span>  <Flag emoji={city.emoji} /> </span>
                                <span>{city.cityName}</span>
                            </Popup>
                        </Marker>))
                }

            </MapContainer>
        </div>
    )
}

export default Map
