import React from "react"
import Header from "./Header"
import CartOverview from "../features/carts/CartOverview"
import { Outlet, useNavigation } from "react-router-dom"
import Laoder from "./Laoder";
function Applayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading"
    return (
        <div className="layout">
            {isLoading && <Laoder />}
            <Header />
            <main>

                <Outlet />
            </main>
            <CartOverview />
        </div>
    )
}

export default Applayout
