import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
    const navigate = useNavigate()
    const [serchParam, setSerchParam] = useSearchParams();
    const lat = serchParam.get("lat")
    return (
        <div className={styles.mapContainer} onClick={() => { navigate("form") }}>
            <h1>MAP</h1>
            <h1>{lat}</h1>
            <button onClick={() => { setSerchParam({ lat: 23, lng: 50 }) }}>chnage POS</button>
        </div>
    )
}

export default Map
