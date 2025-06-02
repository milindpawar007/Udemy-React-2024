import { useEffect, useRef, useState } from "react";
import StarRating from "./Component/StarRating";
import { useMVoies } from "./Hooks/useMovies";
import NumResult from "./Component/NumResult";
import ErrorMessage from "./Component/ErrorMessage";
import Navbar from "./Component/Navbar";
import Logo from "./Component/Logo";

const KEY = process.env.REACT_APP_KEY;

const average = (arr) =>
  arr.length === 0 ? 0 : arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  
  const [watched, setWatched] = useState(function(){
    const storedWatched = localStorage.getItem("watched")
    return storedWatched ? JSON.parse(storedWatched) : [];
  });
 
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  
  const {movies, isLoading,error}=useMVoies(query);

  function handleSelectMovie(id) {
    setSelectedID((selectedID) => (selectedID === id ? null : id));
  }
  function handelClosedMovieDetails() { setSelectedID(null); }

  function handelWatchedMovie(movie) 
  {
     setWatched((watched)=>[...watched,movie]);
     localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }
  function handelDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

 useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);



  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} watched={watched} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedID ? <MovieDeatils selectedID={selectedID} onCloseMovie={handelClosedMovieDetails} onAddWatched={handelWatchedMovie} watched={watched} />
              :
              <>
                <WatchedSummary watched={watched} />
                <WatchedMovieList watched={watched} onDeleteWatched={handelDeleteWatched} />
              </>}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}






function Search({ query, setQuery }) {
  const inputElement =useRef(null);

  useEffect(()=>{
    inputElement.current.focus();
    function callBack(e) {
      if ( document.activeElement === inputElement.current) return;
        e.preventDefault();
        if(e.code === "Enter"){
          inputElement.current.focus();
         setQuery("");
        }
        
      
    }
    document.addEventListener("keypress", callBack);

    

    return function cleanup() {
      document.removeEventListener("keypress", callBack);
    }
  },[setQuery])
  return (
    <input
      className="search
      "
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}


function Main({ children }) {
  return <main className="main">{children}</main>;
}

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div className="box">
        <button
          className="btn-toggle"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </button>
        {isOpen && children}
      </div>
    </>
  );
}

function WatchedMovieList({ watched ,onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie, itr) => (
        <WatchedMovie key={itr} movie={movie} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie ,onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <p>
        
        <button className="btn-delete" onClick={()=>onDeleteWatched(movie.imdbID)}>X</button>
      </p>

      </div>
    </li>
  );
}

function MovieDeatils({ selectedID, onCloseMovie ,onAddWatched ,watched }) {

  const [searchedMovie, setSearchedMovie] = useState({});
  const [userRating, setUserRating] = useState(0);

  const isWatched = (watched ?? []).map((movie)=>movie.imdbID).includes(searchedMovie.imdbID);
  const watchedUserRating= watched.find((movie)=>movie.imdbID === searchedMovie.imdbID)?.userRating;
  
  const countRef = useRef(0);

  useEffect(() => {
 
     if(userRating) {
      
      countRef.current = countRef.current + 1;
    }
  }
  , [userRating]);

  function Handeladd(){
    const newMovie={
      imdbID: searchedMovie.imdbID,
      Title: searchedMovie.Title,
      Poster: searchedMovie.Poster,
      imdbRating: searchedMovie.imdbRating,
      userRating: userRating, // Default value, can be updated later
      runtime: parseInt(searchedMovie.Runtime),
      countRatinfdescison: countRef.current
    }
    
    onAddWatched(newMovie);
    onCloseMovie();
   
  }
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onCloseMovie();
        
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCloseMovie]);
  useEffect(() => {
    let isMounted = true;
    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?&apikey=${KEY}&i=${selectedID}`
        );
        if (!response.ok) throw new Error("Something went wrong");

        const data = await response.json();
       
        if (data.Response === "False") throw new Error("Movie Not found");

        if (isMounted) {
          setSearchedMovie(data);
          if (data.Title) {
            document.title = `MOVIE | ${data.Title}`;
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    if (selectedID) {
      fetchMovieDetails();
    } else {
      setSearchedMovie(null);
    }
    return function cleanup() {
      isMounted = false;
      document.title = "usePopcorn";
    };
  }, [selectedID]);

  // const movie = movies.find((movie) => movie.imdbID === selectedID);
  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>

        <img src={searchedMovie.Poster} alt={`${searchedMovie.Title} poster`} />
        <div className="details-overview">

          <h2>{searchedMovie.Title}</h2>
          <p>
            Released: {searchedMovie.Released} &bull; {searchedMovie.Runtime}
          </p>
          <p>
          {searchedMovie.Genre}
          </p>
          <p>
            <span>⭐</span>
            {searchedMovie.imdbRating} IMDB Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
        {!isWatched ? (
        <>
          <StarRating maxRating={10} size={24} onSetRating={(rating) => setUserRating(rating)}/>
            {userRating>0 &&(<button className="btn-add" onClick={Handeladd }>
             + Add to List
            </button>
            )}
        </>):<p> You rated this movie {watchedUserRating} ⭐</p>}
        </div>
        <p><em>{searchedMovie.Plot}</em></p>
        <p>
          Starring: {searchedMovie.Actors}
        </p>
        <p>
          Directed By: {searchedMovie.Director}
        </p>
      </section>
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
       
      </div>
    </div>
  );
}
