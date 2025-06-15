import React from 'react'
import { Link } from "react-router-dom"
import SearchOrder from '../features/orders/searchOrder'
import Username from '../features/users/Username'
function Header() {
    return (
        <header className='bg-yellow-500 uppercase'>
            <Link to="/" className='tracking-widest'>Fast React Pizz co.</Link>
            <SearchOrder />
            <Username />
        </header>
    )
}

export default Header
