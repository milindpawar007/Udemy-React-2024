import { useEffect, useRef, useState } from "react";
const KEY = process.env.REACT_APP_KEY;
export function useMVoies(query) {
  const [isLoading, SetisLoading] = useState(false);
  const [error, SetError] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        SetisLoading(true);
        SetError("");
        let response = await fetch(
          `https://www.omdbapi.com/?&apikey=${KEY}&s=${query}`, { signal: controller.signal }
        );
        if (!response.ok) throw new Error("something went wrong");

        let data = await response.json();

        if (data.Response === "False") throw new Error("Movie Not found");

        setMovies(data.Search);
        SetisLoading(false);
        SetError("");
      } catch (error) {
        console.log(error.message);
        if (error.name !== "AbortError") {
          SetError(error.message);
          return;
        }
      } finally {
        SetisLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      SetError("");
      return;
    }
    fetchMovies();
    return () => {
      controller.abort();
      SetisLoading(false);
      SetError("");
    };
  }, [query]);
  return { isLoading, error, movies };
}