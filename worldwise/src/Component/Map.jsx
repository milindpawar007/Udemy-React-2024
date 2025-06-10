import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import { useState } from "react";
import { useCities } from "../Context/CitiesContext";
import Flag from './Flag';
import { useEffect } from "react";
function Map() {

    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([52.53586782505711, 13.376933665713324])
    const [searchParam] = useSearchParams();
    const maplat = Number(searchParam.get("lat"));
    const maplng = Number(searchParam.get("lng"));


    useEffect(() => {
        if (maplat && maplng) setMapPosition([maplat, maplng])
    }, [maplat, maplng])
    return (
        <div className={styles.mapContainer} >
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
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}


function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position)

    return null;

}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvent({
        click: (e) => {


            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
        }
    })
}
export default Map
