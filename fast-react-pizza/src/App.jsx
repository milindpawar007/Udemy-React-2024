import React from 'react';
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./ui/Home"
import Menu from "./features/menu/Menu"
import Order from './features/orders/Order';
import CreateOrder from './features/orders/CreateOrder';

import Cart from "./features/carts/Cart"

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/cart", element: <Cart /> },
  { path: "/order/new", element: <CreateOrder /> },
  { path: "/order/:orderId", element: <Order /> },
  { path: "/menu", element: <Menu /> },

])

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
