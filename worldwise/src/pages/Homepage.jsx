import { Link } from "react-router-dom"
import PageNav from "../Component/PageNav"
import AppNav from "../Component/AppNav"

function Homepage() {
    return (
        <div>
            <PageNav />
            <AppNav />
            <h1>Worldwise</h1>
            <Link to="/app">Go the APP</Link>

        </div>
    )
}

export default Homepage
