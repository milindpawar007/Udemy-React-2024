import { BrowserRouter, Route, Routes } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./Component/CityList"
import CountryList from "./Component/CountryList"
import { useEffect, useState } from "react"

const BASE_URL = "http://localhost:9000"

function App() {

  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(() => {

    const fetchCities = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data)
      } catch {
        alert("error loading the data")
      } finally {
        setIsLoading(false);
        console.log(cities);
        console.log(isloading)
      }
    }
    fetchCities();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="product" element={<Product />}></Route>
        <Route path="pricing" element={<Pricing />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isloading={isloading} />} />
          <Route path="cities" element={<CityList cities={cities} isloading={isloading} />} />
          <Route path="countries" element={<CountryList cities={cities} isloading={isloading} />} />
          <Route path="form" element={<p>Map data</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
