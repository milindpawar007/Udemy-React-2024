import React from 'react';
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./ui/Home"
import Menu, { loader as menuLoader } from "./features/menu/Menu"
import Order from './features/orders/Order';
import CreateOrder from './features/orders/CreateOrder';

import Cart from "./features/carts/Cart"
import Applayout from './ui/Applayout';

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/order/new", element: <CreateOrder /> },
      { path: "/order/:orderId", element: <Order /> },
      { path: "/menu", element: <Menu />, loader: menuLoader },]
  },


])

function App() {
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  )
}

export default App
