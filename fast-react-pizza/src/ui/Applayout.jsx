import React from "react"
import Header from "./Header"
import CartOverview from "../features/carts/CartOverview"
import { Outlet } from "react-router-dom"
function Applayout() {
    return (
        <div>
            <Header />
            <main>
                <h1>Content</h1>
                <Outlet />
            </main>
            <CartOverview />
        </div>
    )
}

export default Applayout
