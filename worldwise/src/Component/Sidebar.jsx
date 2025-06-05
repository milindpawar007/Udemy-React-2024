import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
function Sidebar() {
    return (
        <div className={styles.Sidebar}>
            <Logo />
            <AppNav />
            <p>List of cities</p>

        </div>
    )
}

export default Sidebar
