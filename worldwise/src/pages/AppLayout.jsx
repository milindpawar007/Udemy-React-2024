
import Sidebar from "../Component/Sidebar"
import styles from './AppLayout.module.css'
import Map from "../Component/Map"
function AppLayout() {
    return (
        <div className={styles.app} >
            <Sidebar />
            <Map />
        </div>
    )
}

export default AppLayout
