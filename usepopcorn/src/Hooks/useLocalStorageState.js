
import { useState ,useEffect } from "react";

export default function useLocalStorageState(initialState,key) {
    const [value, setvalue] = useState(function(){
        const storedWatched = localStorage.getItem(key)
        return storedWatched ? JSON.parse(storedWatched) :initialState;
      });

      
       useEffect(() => {
          localStorage.setItem("watched", JSON.stringify(value));
        }, [value,key]);
      
      return [value, setvalue];
}