import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
const BASE_URL = "http://localhost:9000/cities"
const CitiesContext = createContext();

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [currentCity, SetCurrentCity] = useState({});

    useEffect(() => {

        const fetchCities = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}`);
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

    function getCity(id) {
        const fetchCities = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`${BASE_URL}/${id}`);
                const data = await res.json();
                SetCurrentCity(data)
            } catch {
                alert("error loading the data")
            } finally {
                setIsLoading(false);
                console.log(cities);
                console.log(isloading)
            }
        }
        fetchCities();

    }

    async function createCity(newCity) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            setCities((prev) => [...prev, data])
            console.log(data)
        } catch {
            alert("error uplaofing the data")
        } finally {
            setIsLoading(false);
            console.log(cities);
            console.log(isloading)
        }
    }
    async function deleteCity(id) {
        try {
            setIsLoading(true)
            await fetch(`${BASE_URL}/${id}`, {
                method: 'DELETE',


            });

            setCities((cities) => cities.filter((city) => city.id !== id))

        } catch {
            alert("error deleting the data")
        } finally {
            setIsLoading(false);
            console.log(cities);
            console.log(isloading)
        }
    }

    return (<CitiesContext.Provider value={{

        cities, isloading, currentCity, getCity, createCity, deleteCity
    }

    }>
        {children}
    </CitiesContext.Provider>)
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("you can't use here it is undefined");

    return context;
}

export { CitiesProvider, useCities };