import { createContext, useState, useEffect } from "react";
const BASE_URL = "http://localhost:9000"
const CitiesContext = createContext();

function CitiesProvider({ children }) {
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
    }, []);


    return (<CitiesContext.Provider value={{

        cities, isloading
    }

    }>
        {children}
    </CitiesContext.Provider>)
}


export { CitiesProvider };