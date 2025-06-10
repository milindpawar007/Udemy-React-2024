import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useState } from "react";
function Map() {
    const navigate = useNavigate();
    const [mapPosition] = useState([32.7767, -96.7970])
    //  const [serchParam, setSerchParam] = useSearchParams();
    //  const lat = serchParam.get("lat")

    return (
        <div className={styles.mapContainer} onClick={() => { navigate("form") }}>
            <MapContainer className={styles.map} center={mapPosition} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map
