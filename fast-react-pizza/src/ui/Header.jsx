import React from 'react'
import { Link } from "react-router-dom"
import SearchOrder from '../features/orders/searchOrder'
function Header() {
    return (
        <header>
            <Link to="/">Fast React Pizz co.</Link>
            <SearchOrder />
            <p>Milind Pawar</p>
        </header>
    )
}

export default Header
