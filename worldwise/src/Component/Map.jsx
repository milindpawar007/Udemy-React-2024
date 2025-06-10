import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
//import { useState } from "react";
import { useCities } from "../Context/CitiesContext";
import Flag from './Flag';
function Map() {
    const navigate = useNavigate();
    const { cities } = useCities();
    // const [mapPosition] = useState([52.53586782505711, 13.376933665713324])
    const [searchParam] = useSearchParams();
    const maplat = Number(searchParam.get("lat")) || 52.53586782505711;
    const maplng = Number(searchParam.get("lng")) || 13.376933665713324;

    return (
        <div className={styles.mapContainer} onClick={() => { navigate("form") }}>
            <MapContainer className={styles.map} center={[maplat, maplng]} zoom={6} scrollWheelZoom={true}>
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
                        </Marker >))
                }
                <ChangeCenter position={[maplat, maplng]} />
            </MapContainer>
        </div>
    )
}


function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position)

    return null;

}
export default Map
